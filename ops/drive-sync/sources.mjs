import { ROOT_FOLDER_ID, DEPARTMENTS, PUBLISHING_FOLDER, PUBLISHING_DEPARTMENTS } from "./config.mjs";
import { listChildren, isFolder } from "./drive.mjs";

function folder(files, name) {
  return files.find((file) => isFolder(file) && file.name.toLowerCase() === name.toLowerCase());
}

// Read both layouts during migration so moving a file does not unpublish it.
export async function publicationSources(drive, cat) {
  const roots = await listChildren(drive, ROOT_FOLDER_ID);
  const legacy = folder(roots, cat.folderName);
  if (!cat.byDepartment) {
    if (!legacy) throw new Error(`Required Drive folder missing: ${cat.folderName}`);
    return [{ folderId: legacy.id, dept: null, label: cat.folderName }];
  }

  const sources = [];
  const publishing = folder(roots, PUBLISHING_FOLDER);
  if (publishing) {
    const departments = await listChildren(drive, publishing.id);
    for (const department of PUBLISHING_DEPARTMENTS) {
      const parent = folder(departments, department.name);
      if (!parent) throw new Error(`Required publishing folder missing: ${department.name}`);
      const children = await listChildren(drive, parent.id);
      const source = folder(children, cat.departmentFolderName);
      if (!source) throw new Error(`Required publishing folder missing: ${department.name}/${cat.departmentFolderName}`);
      sources.push({
        folderId: source.id, dept: department.id,
        label: `${PUBLISHING_FOLDER}/${department.name}/${cat.departmentFolderName}`,
        departmentFolderId: parent.id,
      });
    }
  }
  if (legacy) {
    const children = await listChildren(drive, legacy.id);
    for (const [name, dept] of Object.entries(DEPARTMENTS)) {
      const source = folder(children, name);
      if (!source && !publishing) throw new Error(`Required Drive folder missing: ${cat.folderName}/${name}`);
      if (source) sources.push({ folderId: source.id, dept, label: `${cat.folderName}/${name}` });
    }
  }
  if (!sources.length) throw new Error(`No publishing folders found for ${cat.key}`);
  return sources;
}
