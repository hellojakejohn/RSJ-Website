import React, { useState } from "react";
import { ModernLayout } from "../../components/layout/ModernLayout";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { YouTubeEmbed } from "../../components/YouTubeEmbed";
import { usePageMeta } from "../../lib/usePageMeta";
import { Play, Award, MapPin, Mail, Instagram, Youtube, Film, Building2, Users, Megaphone } from "lucide-react";
import { SiTiktok, SiImdb } from "react-icons/si";

export const ModernActor = () => {
  usePageMeta({
    title: "Actor",
    description: "Stevie Johnson, SAG-AFTRA actor with 30+ years on stage and screen. Theatrical reel, recent credits, and representation.",
    image: "/stevie_headshot_207.jpg",
  });
  const [activeReel, setActiveReel] = useState(0);

  const reels = [
    { id: "_p5b5KJrIT4", title: "Theatrical Reel (2025)", description: "Latest performance showcase" },
    { id: "G8KOUnPRwJE", title: "Real Spit! Trailer", description: "Independent film" },
    { id: "enrZJWfOL6s", title: "Blueberry", description: "Short film" }
  ];

  const allCredits = [
    {
      title: "Untitled Project",
      role: "TBA",
      type: "Feature Film",
      year: "2025",
      status: "upcoming",
      color: "from-accent-400 to-accent-500"
    },
    {
      title: "House Hunters (HGTV)",
      role: "",
      type: "Television",
      year: "",
      status: "recent",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Buffalo Daze",
      role: "Joseph Blackburn Bass",
      type: "Feature Film",
      year: "2023",
      status: "recent",
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Triple O.G.",
      role: "Robert",
      type: "Short Film", 
      year: "2022",
      status: "recent",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Animal Kingdom",
      role: "Detective",
      type: "Television",
      year: "2021",
      status: "recent",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Blueberry",
      role: "Director/Producer",
      type: "Short Film",
      year: "2023",
      status: "recent",
      color: "from-green-500 to-teal-500"
    }
  ];

  const representation = {
    agent: "True Artists Agency",
    manager: "BiCoastal Talent Agency", 
    publicist: "Jenni Sacks Agency",
    location: "Los Angeles, CA"
  };

  return (
    <ModernLayout activeNavItem="actor">
      {/* COMPACT HEADER SECTION */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-6xl font-black leading-none tracking-tight mb-4">
            <span className="text-holographic">ACTOR • STEVIE JOHNSON</span>
          </h1>
          <p className="text-lg text-white/80 font-body max-w-2xl mx-auto">
            30+ years bringing stories to life • SAG-AFTRA Member
          </p>
        </div>

        {/* COMPACT STATS ROW */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { value: "30+", label: "Years", icon: Award },
            { value: "100+", label: "Credits", icon: Play },
            { value: "SAG", label: "Union", icon: Film }
          ].map((stat) => (
            <div 
              key={stat.label}
              className="cinematic-theater holographic-border rounded-xl px-6 py-3 flex items-center gap-3"
            >
              <stat.icon className="w-5 h-5 text-accent-400" />
              <div className="text-center">
                <div className="font-heading text-xl font-bold text-holographic">{stat.value}</div>
                <div className="text-white/60 text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <section className="pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN - VIDEO REEL */}
          <div className="space-y-6">
            <Card className="cinematic-theater holographic-border rounded-2xl p-6">
              <div className="mb-4">
                <h3 className="font-heading text-xl font-bold text-holographic mb-2">
                  {reels[activeReel].title}
                </h3>
                <p className="text-white/60 text-sm">{reels[activeReel].description}</p>
              </div>
              
              <div className="aspect-video rounded-xl overflow-hidden screen-glow mb-4">
                <YouTubeEmbed id={reels[activeReel].id} title={reels[activeReel].title} />
              </div>

              {/* Reel Navigation */}
              <div className="flex gap-2">
                {reels.map((reel, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveReel(index)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      index === activeReel 
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' 
                        : 'glass text-white/70 hover:text-white'
                    }`}
                  >
                    {reel.title.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </Card>

            {/* CONTACT BUTTONS */}
            <div className="flex gap-4">
              <Button className="flex-1 h-12 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-heading font-semibold hover:scale-105 transition-all duration-300" asChild>
                <a href="mailto:steviejohnson101@gmail.com?subject=Acting%20Inquiry">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Booking
                </a>
              </Button>
              <div className="flex gap-2">
                <Button className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 p-0 hover:scale-110 transition-transform duration-300" asChild>
                  <a href="https://www.instagram.com/holisticactor" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                </Button>
                <Button className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 p-0 hover:scale-110 transition-transform duration-300" asChild>
                  <a href="https://www.youtube.com/@steviesumj" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <Youtube className="w-5 h-5 text-white" />
                  </a>
                </Button>
                <Button className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-400 to-accent-500 p-0 hover:scale-110 transition-transform duration-300" asChild>
                  <a href="https://www.imdb.com/name/nm0426281/" target="_blank" rel="noopener noreferrer" aria-label="IMDb">
                    <SiImdb className="w-5 h-5 text-white" />
                  </a>
                </Button>
                <Button className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-accent-400 p-0 hover:scale-110 transition-transform duration-300" asChild>
                  <a href="https://www.tiktok.com/@holisticactor" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <SiTiktok className="w-5 h-5 text-white" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - CREDITS */}
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="font-heading text-2xl font-bold text-holographic">Credits & Projects</h2>
            </div>

            {/* COMPACT CREDIT CARDS */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
              {/* UPCOMING SECTION */}
              {allCredits.filter(c => c.status === 'upcoming').length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1 bg-accent-400/30"></div>
                    <span className="text-accent-400 font-heading font-semibold text-sm uppercase tracking-wider">Upcoming Projects</span>
                    <div className="h-px flex-1 bg-accent-400/30"></div>
                  </div>
                  {allCredits.filter(c => c.status === 'upcoming').map((credit, index) => (
                    <Card 
                      key={`${credit.title}-${index}`}
                      className="glass rounded-xl p-4 hover-lift group transition-all duration-300 border border-accent-400/30 bg-accent-400/5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-heading text-lg font-bold text-white group-hover:text-accent-400 transition-colors">
                              {credit.title}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${credit.color} text-white`}>
                              {credit.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-accent-400 font-medium">{credit.role}</span>
                            <span className="text-white/50">{credit.year}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              
              {/* RECENT SECTION */}
              {allCredits.filter(c => c.status === 'recent').length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1 bg-primary-400/30"></div>
                    <span className="text-primary-400 font-heading font-semibold text-sm uppercase tracking-wider">Recent Credits</span>
                    <div className="h-px flex-1 bg-primary-400/30"></div>
                  </div>
                  {allCredits.filter(c => c.status === 'recent').map((credit, index) => (
                    <Card 
                      key={`${credit.title}-${index}`}
                      className="glass rounded-xl p-4 mb-3 hover-lift group transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-heading text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                              {credit.title}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${credit.color} text-white`}>
                              {credit.type}
                            </span>
                          </div>
                          {(credit.role || credit.year) && (
                            <div className="flex items-center gap-4 text-sm">
                              {credit.role && <span className="text-primary-400 font-medium">{credit.role}</span>}
                              {credit.year && <span className="text-white/50">{credit.year}</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REPRESENTATION SECTION - COMPACT */}
      <section className="pb-16">
        <Card className="glass rounded-2xl p-8">
          <h2 className="font-heading text-2xl font-bold text-holographic mb-6 text-center">Representation</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="h-12 flex items-center justify-center mb-2">
                <Building2 className="w-10 h-10 text-accent-400/60" />
              </div>
              <h3 className="text-accent-400 text-sm font-bold">Agent</h3>
              <p className="text-white/70 text-sm">{representation.agent}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 flex items-center justify-center mb-2">
                <img 
                  src="https://static.wixstatic.com/media/848896_22bc40ae22114817b6107fc3bd8647eb~mv2.png/v1/fill/w_162,h_65,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/BiCOASTALlogoHDR.png"
                  alt="BiCoastal Talent Agency"
                  className="h-10 w-auto object-contain filter brightness-0 invert opacity-70"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <Users className="w-10 h-10 text-primary-400/60 hidden" />
              </div>
              <h3 className="text-primary-400 text-sm font-bold">Manager</h3>
              <p className="text-white/70 text-sm">{representation.manager}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 flex items-center justify-center mb-2">
                <Megaphone className="w-10 h-10 text-accent-400/60" />
              </div>
              <h3 className="text-accent-400 text-sm font-bold">Publicist</h3>
              <p className="text-white/70 text-sm">{representation.publicist}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 flex items-center justify-center mb-2">
                <MapPin className="w-10 h-10 text-primary-400/60" />
              </div>
              <h3 className="text-primary-400 text-sm font-bold">Location</h3>
              <p className="text-white/70 text-sm">{representation.location}</p>
            </div>
          </div>
        </Card>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </ModernLayout>
  );
};