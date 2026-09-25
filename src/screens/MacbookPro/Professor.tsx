import React from "react";
import { ModernLayout } from "../../components/layout/ModernLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { usePageMeta } from "../../lib/usePageMeta";
import { PageHeader } from "../../components/PageHeader";
import { GraduationCap, BookOpen, Award, Users, Zap } from "lucide-react";

export const Professor = () => {
  usePageMeta({
    title: "Professor",
    description: "Stevie Johnson, Assistant Professor of Theatre Practice at the USC School of Dramatic Arts, with 30+ years of teaching.",
  });

  const professorData = {
    courses: [
      {
        code: "THTR 101",
        title: "Introduction to Theatre",
        description: "Foundational course exploring theatre history, dramatic literature, and performance techniques.",
        credits: 4,
        level: "Beginner"
      },
      {
        code: "THTR 152", 
        title: "Acting Fundamentals",
        description: "Basic acting techniques including scene study, character development, and stage presence.",
        credits: 3,
        level: "Beginner"
      },
      {
        code: "THTR 252B",
        title: "Advanced Acting Workshop",
        description: "Intensive workshop focusing on advanced performance techniques and professional skills.",
        credits: 3,
        level: "Intermediate"
      },
      {
        code: "COMM 401",
        title: "Advanced Public Speaking",
        description: "Masterclass in professional presentation skills and audience engagement techniques.",
        credits: 3,
        level: "Advanced"
      }
    ],
    education: [
      { degree: "MFA", institution: "USC School of Dramatic Arts", year: "1995" },
      { degree: "BA (Triple Major)", institution: "Theatre, Speech & Rhetoric", year: "1993" },
      { degree: "IBP Certification", institution: "Integrative Body Psychotherapy", year: "2010" },
      { degree: "30+ Years Teaching", institution: "USC School of Dramatic Arts", year: "2017-Present" }
    ],
    rateMyProfessors: {
      rating: 4.8,
      totalReviews: 17,
      wouldTakeAgain: 95,
      difficulty: 2.1,
      tags: ["Participation matters", "Gives good feedback", "Inspirational", "Caring", "Amazing lectures"],
      reviews: [
        {
          text: "HE LITERALLY CHANGED MY LIFE. Prof Johnson is like a father to all his students. His energy is infectious and he makes every class enjoyable.",
          course: "THTR 101",
          rating: 5,
          semester: "Fall 2023"
        },
        {
          text: "Best Professor ever! Very enthusiastic and had a lot of energy. Even if you're not an actor, you'll love his class. Highly recommend for GE!",
          course: "THTR 152",
          rating: 5,
          semester: "Spring 2023"
        },
        {
          text: "Always engaging and truly cares about his students' growth. His feedback is constructive and inspiring. Would definitely take again!",
          course: "THTR 252B",
          rating: 5,
          semester: "Fall 2022"
        }
      ]
    }
  };

  return (
    <ModernLayout activeNavItem="professor">
      <PageHeader
        title="PROFESSOR • STEVIE JOHNSON"
        subtitle={"Assistant Professor of Theatre Practice • USC School of Dramatic Arts"}
        note={"MFA USC '95 • 30+ Years Teaching Excellence"}
        stats={[
          { value: "MFA", label: "USC '95", icon: GraduationCap, color: "text-accent-400" },
          { value: "BA", label: "Theatre Arts", icon: BookOpen, color: "text-blue-400" },
          { value: "30+", label: "Years Teaching", icon: Users, color: "text-green-400" },
          { value: "IBP", label: "Certified", icon: Award, color: "text-yellow-400" },
        ]}
      />

      {/* OPTIMIZED LAYOUT - BETTER SPACE UTILIZATION */}
      <section className="pb-8">
        {/* TOP SECTION - COURSE CATALOG WITH BETTER PROPORTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          
          {/* LEFT SECTION - ENHANCED COURSE GRID - Now full width since right section is commented */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-holographic">Course Catalog</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {professorData.courses.map((course) => (
                <Card
                  key={course.code}
                  className="glass rounded-xl px-4 py-3 hover-lift group transition-all duration-500 min-w-0"
                  title={course.description}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-heading text-sm font-bold text-white group-hover:text-primary-400 transition-colors truncate">
                      {course.title}
                    </h3>
                    <span className="text-accent-400 font-mono font-bold text-xs flex-shrink-0">{course.code}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-1 truncate">{course.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION - STUDENT FEEDBACK COMPACT (2/5 width) */}
          {/* <div className="lg:col-span-2 space-y-5">
            {/* RATEMYPROFESSORS SHOWCASE - COMPACT */}
            {/* <Card className="glass rounded-2xl p-5 border border-yellow-400/30 bg-yellow-400/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-yellow-400/20">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-white">Student Reviews</h3>
                    <p className="text-yellow-400 text-xs">RateMyProfessors.com</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{professorData.rateMyProfessors.rating}</div>
                  <div className="text-white/50 text-xs">{professorData.rateMyProfessors.totalReviews} reviews</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="text-center p-2 rounded-lg glass">
                  <div className="text-green-400 font-bold text-base">{professorData.rateMyProfessors.wouldTakeAgain}%</div>
                  <div className="text-white/60 text-xs">Would Take Again</div>
                </div>
                <div className="text-center p-2 rounded-lg glass">
                  <div className="text-blue-400 font-bold text-base">{professorData.rateMyProfessors.difficulty}/5</div>
                  <div className="text-white/60 text-xs">Difficulty</div>
                </div>
              </div>

              <Button className="w-full px-4 py-2 rounded-xl bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30 transition-all text-sm" asChild>
                <a href="https://www.ratemyprofessors.com/professor/2482775" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View All Reviews
                </a>
              </Button>
            </Card> */}

            {/* COMPACT STUDENT TESTIMONIALS */}
            {/* <div>
              <h3 className="font-heading text-base font-bold text-holographic mb-3">What Students Say</h3>
              <div className="space-y-3">
                {professorData.rateMyProfessors.reviews.slice(0, 2).map((review, index) => (
                  <Card key={index} className="glass rounded-xl p-3 group hover-lift transition-all duration-300">
                    <div className="flex items-start gap-2">
                      <Quote className="w-3 h-3 text-accent-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-white/80 text-xs leading-relaxed mb-2">
                          "{review.text.length > 100 ? review.text.substring(0, 100) + '...' : review.text}"
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-primary-400 text-xs font-medium">{review.course}</span>
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-2 h-2 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* FULL-WIDTH SECTIONS - BETTER SPACE USAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* TEACHING PHILOSOPHY - EXPANDED */}
          <Card className="glass rounded-2xl p-6 border-l-4 border-accent-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-accent-500 to-primary-500">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-holographic">Teaching Philosophy</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              <span className="text-accent-400 font-semibold">"Education should be transformative."</span> I believe in creating 
              inclusive spaces where students develop both technical skills and creative confidence through practical, 
              hands-on learning experiences combined with personalized feedback and mentorship.
            </p>
            {/* <div className="flex flex-wrap gap-2">
              {professorData.rateMyProfessors.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs">
                  {tag}
                </span>
              ))}
            </div> */}
          </Card>

          {/* PROFESSIONAL DEVELOPMENT - PROMINENTLY DISPLAYED */}
          <Card className="glass rounded-2xl p-6 border-l-4 border-primary-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-holographic">Professional Excellence</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <GraduationCap className="w-4 h-4 text-accent-400" />
                <span>Assistant Professor of Theatre Practice, USC</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-4 h-4 text-accent-400" />
                <span>30+ Years Teaching Experience</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <BookOpen className="w-4 h-4 text-accent-400" />
                <span>Integrative Body Psychotherapy Certified</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Award className="w-4 h-4 text-accent-400" />
                <span>RateMyProfessor Top 21 Ranked (2009-2010)</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

    </ModernLayout>
  );
};