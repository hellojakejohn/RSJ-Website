import { ModernLayout } from "../../components/layout/ModernLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { usePageMeta } from "../../lib/usePageMeta";
import { PageHeader } from "../../components/PageHeader";
import { Mail, Sparkles } from "lucide-react";

export const Courses = () => {
  usePageMeta({
    title: "Courses",
    description: "Courses from Stevie Johnson are coming soon. Get in touch to hear when they open.",
  });

  return (
    <ModernLayout activeNavItem="courses">
      <PageHeader title="COURSES • STEVIE JOHNSON" />

      <section className="pb-12">
        <Card className="glass rounded-3xl p-8 lg:p-12 max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-holographic mb-4">Coming Soon</h2>
          <p className="text-lg text-white/80 font-body leading-relaxed mb-8">
            New courses in acting, speech, and performance are on the way. Reach out to hear when they open.
          </p>
          <Button
            className="px-8 py-5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-heading font-semibold text-lg hover:scale-105 transition-all duration-300"
            asChild
          >
            <a href="/contact">
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </a>
          </Button>
        </Card>
      </section>
    </ModernLayout>
  );
};
