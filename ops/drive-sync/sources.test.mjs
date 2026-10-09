import test from "node:test";
import assert from "node:assert/strict";
import { publicationSources } from "./sources.mjs";
import { ROOT_FOLDER_ID, FOLDER_MIME, PDF_CATEGORIES, PUBLISHING_DEPARTMENTS } from "./config.mjs";

const folder = (id, name) => ({ id, name, mimeType: FOLDER_MIME });
const client = (tree) => ({ files: { list: async ({ q }) => ({ data: { files: tree[q.split("'")[1]] || [] } }) } });
function publishingTree() {
  const tree = { [ROOT_FOLDER_ID]: [folder("publishing", "Department Publishing")] };
  tree.publishing = PUBLISHING_DEPARTMENTS.map(({ id, name }) => folder(id, name));
  for (const { id } of PUBLISHING_DEPARTMENTS) {
    tree[id] = [folder(`${id}-pub`, "Publications"), folder(`${id}-news`, "Newsletters")];
  }
  return tree;
}

test("all six departments route publications and newsletters independently", async () => {
  const drive = client(publishingTree());
  const publications = await publicationSources(drive, PDF_CATEGORIES[0]);
  const newsletters = await publicationSources(drive, PDF_CATEGORIES[1]);
  assert.deepEqual(publications.map((s) => [s.dept, s.folderId]), [
    ["pe", "pe-pub"], ["vc", "vc-pub"], ["hf", "hf-pub"], ["re", "re-pub"], ["pc", "pc-pub"], ["infra", "infra-pub"],
  ]);
  assert.ok(newsletters.every((s) => s.folderId === `${s.dept}-news`));
});

test("legacy files remain discoverable throughout folder migration", async () => {
  const tree = publishingTree();
  tree[ROOT_FOLDER_ID].push(folder("edus", "EDUs"));
  tree.edus = [folder("old-pe", "PE"), folder("old-hf", "HF")];
  const sources = await publicationSources(client(tree), PDF_CATEGORIES[0]);
  assert.equal(sources.length, 8);
  assert.ok(sources.some((s) => s.dept === "pe" && s.folderId === "old-pe"));
});

test("a renamed or inaccessible department stops publishing instead of deleting its content", async () => {
  const tree = publishingTree();
  tree.publishing = tree.publishing.filter((f) => f.id !== "pe");
  await assert.rejects(publicationSources(client(tree), PDF_CATEGORIES[0]), /Required publishing folder missing: Private Equity/);
});

test("a missing newsletter subfolder fails even if Publications exists", async () => {
  const tree = publishingTree();
  tree.pc = tree.pc.filter((f) => f.name !== "Newsletters");
  await assert.rejects(publicationSources(client(tree), PDF_CATEGORIES[1]), /Private Credit\/Newsletters/);
});

test("legacy-only setup requires all four original department folders", async () => {
  const tree = { [ROOT_FOLDER_ID]: [folder("edus", "EDUs")], edus: ["PE", "VC", "HF", "RE"].map((n) => folder(n, n)) };
  assert.equal((await publicationSources(client(tree), PDF_CATEGORIES[0])).length, 4);
  tree.edus.pop();
  await assert.rejects(publicationSources(client(tree), PDF_CATEGORIES[0]), /EDUs\/RE/);
});

test("founder reports keep their existing root folder", async () => {
  const tree = publishingTree();
  tree[ROOT_FOLDER_ID].push(folder("founders", "Founder Reports"));
  assert.deepEqual(await publicationSources(client(tree), PDF_CATEGORIES[2]), [{ folderId: "founders", dept: null, label: "Founder Reports" }]);
});
