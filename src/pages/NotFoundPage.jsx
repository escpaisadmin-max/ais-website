import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-ais-navy">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-ais-white mb-4">404</h1>
        <p className="text-xl text-ais-silver mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button to="/" variant="primary">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
