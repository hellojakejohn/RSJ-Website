import React, { useState } from "react";
import { ModernLayout } from "../../components/layout/ModernLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { usePageMeta } from "../../lib/usePageMeta";
import { BookOpen, Users, Clock, Award, Film, Sparkles, GraduationCap, Calendar, MapPin, Mail } from "lucide-react";

export const Courses = () => {
  usePageMeta({
    title: "Courses",
    description: "Acting, speech, voice, and directing courses taught by Stevie Johnson at USC and online.",
  });
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courseCategories = [
    { id: "all", label: "All Courses", count: 11 },
    { id: "communication", label: "Communication", count: 3 },
    { id: "acting", label: "Acting & Performance", count: 7 },
    { id: "directing", label: "Directing", count: 1 }
  ];

  const courses = [
    {
      code: "COMM 101",
      title: "Speech 101",
      description: "Essential techniques for confident public speaking in academic and professional settings.",
      category: "communication",
      term: "Fall 2024",
      credits: 3,
      level: "Beginner",
      duration: "12 weeks",
      icon: Sparkles,
      color: "primary"
    },
    {
      code: "COMM 134",
      title: "Voice and Diction 134",
      description: "Improve vocal clarity, projection, and articulation for professional and performance applications.",
      category: "communication",
      term: "Spring 2024",
      credits: 3,
      level: "Beginner",
      duration: "12 weeks",
      icon: Users,
      color: "accent"
    },
    {
      code: "THTR 270",
      title: "Beginning Acting 270",
      description: "Basic acting techniques including scene study, character development, and stage presence for beginners.",
      category: "acting",
      term: "Fall 2024",
      credits: 3,
      level: "Beginner",
      duration: "12 weeks",
      icon: Film,
      color: "primary"
    },
    {
      code: "THTR 272",
      title: "Intermediate Acting 272",
      description: "Advanced scene work focusing on emotional truth, subtext, and character development techniques.",
      category: "acting",
      term: "Winter 2024",
      credits: 4,
      level: "Intermediate",
      duration: "16 weeks",
      icon: Film,
      color: "accent"
    },
    {
      code: "THTR 100",
      title: "Introduction to Theatre 100",
      description: "Comprehensive overview of theatre history, theory, and practice from ancient to contemporary.",
      category: "acting",
      term: "Spring 2024",
      credits: 3,
      level: "Beginner",
      duration: "12 weeks",
      icon: BookOpen,
      color: "primary"
    },
    {
      code: "THTR 570",
      title: "Acting for Camera 570",
      description: "Specialized techniques for on-camera performance including film, television, and digital media.",
      category: "acting",
      term: "Summer 2024",
      credits: 4,
      level: "Advanced",
      duration: "10 weeks",
      icon: Film,
      color: "accent"
    },
    {
      code: "THTR 101",
      title: "Directing 101",
      description: "Fundamentals of theatrical directing including script analysis, staging, and working with actors.",
      category: "directing",
      term: "Fall 2024",
      credits: 3,
      level: "Beginner",
      duration: "12 weeks",
      icon: Award,
      color: "primary"
    },
    {
      code: "THTR 380",
      title: "Character Acting",
      description: "Intensive character development workshop exploring physical, vocal, and psychological transformation.",
      category: "acting",
      term: "Winter 2024",
      credits: 3,
      level: "Advanced",
      duration: "12 weeks",
      icon: Film,
      color: "accent"
    },
    {
      code: "THTR 150",
      title: "Fundamentals of Acting",
      description: "Core acting principles including objective, obstacle, and action-based performance techniques.",
      category: "acting",
      term: "Spring 2024",
      credits: 3,
      level: "Beginner",
      duration: "12 weeks",
      icon: Film,
      color: "primary"
    },
    {
      code: "THTR 110",
      title: "Introduction to Acting",
      description: "Explore the basics of acting through improvisation, scene work, and performance exercises.",
      category: "acting",
      term: "Summer 2024",
      credits: 3,
      level: "Beginner",
      duration: "10 weeks",
      icon: Film,
      color: "accent"
    },
    {
      code: "COMM 285",
      title: "Acting through Speech",
      description: "Integration of voice, speech, and acting techniques for powerful dramatic performance.",
      category: "communication",
      term: "Fall 2024",
      credits: 4,
      level: "Intermediate",
      duration: "12 weeks",
      icon: Sparkles,
      color: "primary"
    }
  ];

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <ModernLayout activeNavItem="courses">
      {/* COMPACT HEADER SECTION */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-6xl font-black leading-none tracking-tight mb-4">
            <span className="text-holographic">COURSES • STEVIE JOHNSON</span>
          </h1>
          <p className="text-lg text-white/80 font-body max-w-2xl mx-auto mb-2">
            Professional development courses designed to elevate your craft and career
          </p>
          <p className="text-sm text-white/60 font-body">
            Small class sizes • Expert instruction • Proven results
          </p>
        </div>

        {/* COMPACT STATS ROW */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { value: "11", label: "Active Courses", icon: BookOpen, color: "text-blue-400" },
            { value: "30+", label: "Years Teaching", icon: Clock, color: "text-yellow-400" }
          ].map((stat) => (
            <div 
              key={stat.label}
              className="cinematic-theater holographic-border rounded-xl px-6 py-3 flex items-center gap-3"
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div className="text-center">
                <div className="font-heading text-xl font-bold text-holographic">{stat.value}</div>
                <div className="text-white/60 text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COURSE CATEGORIES */}
      <section className="pb-6">
        <div className="flex justify-center mb-6">
          <div className="flex gap-2 p-1 rounded-xl glass">
            {courseCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {category.label} <span className="text-xs opacity-60">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* COMPACT COURSE GRID */}
      <section className="pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course, index) => (
            <Card 
              key={course.code}
              className="glass rounded-2xl p-4 hover-lift group transition-all duration-300"
            >
              {/* Course Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${course.color === 'primary' ? 'bg-primary-500/20' : 'bg-accent-500/20'}`}>
                    <course.icon className={`w-4 h-4 ${course.color === 'primary' ? 'text-primary-400' : 'text-accent-400'}`} />
                  </div>
                  <div>
                    <span className="text-accent-400 font-mono font-bold text-sm">{course.code}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        course.level === 'Beginner' || course.level === 'Introductory' ? 'bg-green-500/30 text-green-300' :
                        course.level === 'Intermediate' ? 'bg-yellow-500/30 text-yellow-300' :
                        'bg-red-500/30 text-red-300'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white/40 text-xs">{course.duration}</div>
                </div>
              </div>
              
              {/* Course Title & Description */}
              <h3 className="font-heading text-base font-bold text-white group-hover:text-primary-400 transition-colors mb-2">
                {course.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-3 line-clamp-2">
                {course.description}
              </p>
              
              {/* Course Details */}
              <div className="grid grid-cols-2 gap-3 text-xs text-white/50">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{course.term}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  <span>{course.credits} credits</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CONTACT & ENROLLMENT SECTION */}
      <section className="pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Quick Enrollment */}
          <Card className="glass rounded-2xl p-6 border-l-4 border-primary-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-holographic">Ready to Enroll?</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              Join our community of learners and take your skills to the next level. Classes fill up quickly, 
              so secure your spot today.
            </p>
            <div className="space-y-3">
              <Button className="w-full px-4 py-3 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-all" asChild>
                <a href="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact for Enrollment
                </a>
              </Button>
            </div>
          </Card>

          {/* Course Information */}
          <Card className="glass rounded-2xl p-6 border-l-4 border-accent-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-accent-500 to-primary-500">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-holographic">Course Information</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4 text-accent-400" />
                <span>University of Southern California & Online</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-4 h-4 text-accent-400" />
                <span>Flexible scheduling available</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-4 h-4 text-accent-400" />
                <span>Small class sizes (12-30 students)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Award className="w-4 h-4 text-accent-400" />
                <span>Certificate of completion provided</span>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </ModernLayout>
  );
};
