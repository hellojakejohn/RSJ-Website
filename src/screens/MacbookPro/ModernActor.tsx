import React, { useState } from "react";
import { ModernLayout } from "../../components/layout/ModernLayout";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { YouTubeEmbed } from "../../components/YouTubeEmbed";
import { usePageMeta } from "../../lib/usePageMeta";
import { PageHeader } from "../../components/PageHeader";
import { Play, Award, MapPin, Mail, ExternalLink, Instagram, Youtube, Film, Building2, Users, Megaphone } from "lucide-react";
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

  // Acting credits from IMDb (nm0426281). Words! links to the name page
  // because its title ID couldn't be verified.
  const credits = [
    { title: "House Hunters (HGTV)", role: "Himself", type: "TV Series", year: "2026", url: "https://www.imdb.com/title/tt0369117/" },
    { title: "Buffalo Daze", role: "Joseph Blackburn Bass", type: "Feature Film", year: "2025", url: "https://www.imdb.com/title/tt27137484/" },
    { title: "Black Silk", role: "Otis", type: "Short Film", year: "2024", url: "https://www.imdb.com/title/tt15731868/" },
    { title: "Words!", role: "Raymond Jones", type: "Short Film", year: "2022", url: "https://www.imdb.com/name/nm0426281/" },
    { title: "Animal Kingdom", role: "Bob", type: "TV Series", year: "2021", url: "https://www.imdb.com/title/tt5574490/" },
    { title: "A Piece of Cake", role: "Dad #2", type: "Short Film", year: "2020", url: "https://www.imdb.com/title/tt10525124/" },
    { title: "Triple O.G.", role: "Silk", type: "Short Film", year: "2018", url: "https://www.imdb.com/title/tt15731714/" },
    { title: "Deadly Runway", role: "Principal Wilson", type: "TV Movie", year: "2018", url: "https://www.imdb.com/title/tt7922834/" },
    { title: "Blueberry", role: "Lyric Hayes", type: "Video", year: "2018", url: "https://www.imdb.com/title/tt8651952/" },
    { title: "This Is How I Want to Remember H.E.R.", role: "Geoff", type: "Short Film", year: "2018", url: "https://www.imdb.com/title/tt4447358/" },
    { title: "Manipura", role: "Terrance", type: "Short Film", year: "2015", url: "https://www.imdb.com/title/tt3905798/" },
    { title: "Swadhisthana", role: "Terrance Ferguson", type: "Short Film", year: "2014", url: "https://www.imdb.com/title/tt3507678/" },
    { title: "The Eric Andre Show", role: "", type: "TV Series", year: "2012", url: "https://www.imdb.com/title/tt2244495/" },
    { title: "Out the Gate", role: "Skootah", type: "Feature Film", year: "2011", url: "https://www.imdb.com/title/tt1792122/" },
    { title: "The Real Deal", role: "Curtis Murray", type: "Video", year: "2009", url: "https://www.imdb.com/title/tt1477860/" },
    { title: "How to Be a Loan Shark", role: "Harvey", type: "Short Film", year: "2008", url: "https://www.imdb.com/title/tt1396478/" },
    { title: "Pants on Fire", role: "Ralph", type: "Feature Film", year: "2008", url: "https://www.imdb.com/title/tt1049407/" },
    { title: "Cold Case", role: "Newark Resident", type: "TV Series", year: "2008", url: "https://www.imdb.com/title/tt0368479/" },
    { title: "Urban Genesis", role: "Shareef", type: "Short Film", year: "2008", url: "https://www.imdb.com/title/tt1176139/" },
    { title: "The Shield", role: "Hewell", type: "TV Series", year: "2006", url: "https://www.imdb.com/title/tt0286486/" },
    { title: "CSI: Miami", role: "Radiation Man #2", type: "TV Series", year: "2003", url: "https://www.imdb.com/title/tt0313043/" },
    { title: "Con Express", role: "Jensen", type: "Video", year: "2002", url: "https://www.imdb.com/title/tt0310907/" },
    { title: "For da Love of Money", role: "Detective Lewis", type: "Feature Film", year: "2002", url: "https://www.imdb.com/title/tt0317521/" },
    { title: "The Tomorrow Man", role: "Griffin", type: "Video", year: "2002", url: "https://www.imdb.com/title/tt0153098/" },
    { title: "The Beast", role: "Security Guard", type: "TV Series", year: "2001", url: "https://www.imdb.com/title/tt0268175/" },
    { title: "JAG", role: "Robert Johnson", type: "TV Series", year: "2001", url: "https://www.imdb.com/title/tt0112022/" },
    { title: "Titans", role: "Male Nurse", type: "TV Series", year: "2000", url: "https://www.imdb.com/title/tt0243732/" },
    { title: "The X-Files", role: "EMT", type: "TV Series", year: "2000", url: "https://www.imdb.com/title/tt0106179/" },
    { title: "Desert Thunder", role: "Johnny Jones", type: "Feature Film", year: "1999", url: "https://www.imdb.com/title/tt0164016/" },
    { title: "Kinfolks", role: "James", type: "Feature Film", year: "1998", url: "https://www.imdb.com/title/tt0270457/" },
    { title: "The Young and the Restless", role: "Police Officer / Detective", type: "TV Series", year: "1997", url: "https://www.imdb.com/title/tt0069658/" },
    { title: "Beverly Hills, 90210", role: "Jailer / Booking Agent", type: "TV Series", year: "1996", url: "https://www.imdb.com/title/tt0098749/" },
  ];

  const typeColors: Record<string, string> = {
    "Feature Film": "from-amber-500 to-orange-500",
    "Short Film": "from-purple-500 to-indigo-500",
    "TV Series": "from-blue-500 to-cyan-500",
    "TV Movie": "from-accent-400 to-accent-500",
    "Video": "from-green-500 to-teal-500",
  };

  const representation = {
    agent: "True Artists Agency",
    manager: "BiCoastal Talent Agency", 
    publicist: "Jenni Sacks Agency",
    location: "Los Angeles, CA"
  };

  return (
    <ModernLayout activeNavItem="actor">
      <PageHeader
        title="ACTOR • STEVIE JOHNSON"
        subtitle={"30+ years bringing stories to life • SAG-AFTRA Member"}
        stats={[
          { value: "30+", label: "Years", icon: Award },
          { value: "100+", label: "Credits", icon: Play },
          { value: "SAG", label: "Union", icon: Film },
        ]}
      />

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
            <div className="flex flex-wrap gap-4">
              <Button className="flex-1 min-w-[200px] h-12 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-heading font-semibold hover:scale-105 transition-all duration-300" asChild>
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
            <h2 className="font-heading text-2xl font-bold text-holographic">Credits & Projects</h2>

            {/* COMPACT CREDIT CARDS */}
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 bg-primary-400/30"></div>
                <span className="text-primary-400 font-heading font-semibold text-sm uppercase tracking-wider">Film &amp; Television</span>
                <div className="h-px flex-1 bg-primary-400/30"></div>
              </div>
              {credits.map((credit) => (
                <a
                  key={credit.title}
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-3"
                  aria-label={`${credit.title} on IMDb (opens in a new tab)`}
                >
                  <Card className="glass rounded-xl px-4 py-3 hover-lift group transition-all duration-300">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                          <h3 className="font-heading text-base lg:text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                            {credit.title}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${typeColors[credit.type]} text-white`}>
                            {credit.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          {credit.role && <span className="text-primary-400 font-medium">{credit.role}</span>}
                          <span className="text-white/50">{credit.year}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 flex-shrink-0 text-white/30 group-hover:text-primary-400 transition-colors" />
                    </div>
                  </Card>
                </a>
              ))}
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