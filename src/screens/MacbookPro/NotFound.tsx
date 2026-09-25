import { ModernLayout } from "../../components/layout/ModernLayout";
import { Button } from "../../components/ui/button";
import { usePageMeta } from "../../lib/usePageMeta";

export const NotFound = () => {
  usePageMeta({ title: "Page Not Found", description: "The page you were looking for doesn't exist." });

  return (
    <ModernLayout activeNavItem="">
      <section className="py-24 text-center">
        <h1 className="font-display text-6xl md:text-8xl font-black leading-none tracking-tight mb-4">
          <span className="text-holographic">404</span>
        </h1>
        <p className="text-lg text-white/80 font-body max-w-xl mx-auto mb-10">
          The page you were looking for doesn't exist or has moved.
        </p>
        <Button
          className="px-10 py-5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-heading font-semibold text-lg"
          asChild
        >
          <a href="/">Back to Home</a>
        </Button>
      </section>
    </ModernLayout>
  );
};
