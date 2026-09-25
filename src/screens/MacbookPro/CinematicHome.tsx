import React, { useState, useEffect, useRef, useCallback } from "react";
import { ModernLayout } from "../../components/layout/ModernLayout";
import { Button } from "../../components/ui/button";
import { YouTubeEmbed } from "../../components/YouTubeEmbed";
import { usePageMeta } from "../../lib/usePageMeta";
import { ChevronLeft, ChevronRight, Play, Instagram, Youtube, Star, Award, Film } from "lucide-react";
import { SiTiktok, SiImdb } from "react-icons/si";

export const CinematicHome = () => {
  usePageMeta({
    description: "Stevie Johnson is an actor, author, professor, and director with 30+ years of stage and screen experience. Reels, credits, books, and courses.",
  });
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allowAnimations, setAllowAnimations] = useState(false);

  // Data collections
  const videoReels = [
    { id: "_p5b5KJrIT4", title: "Theatrical Reel (2025)", description: "Latest performance showcase", year: "2025", genre: "Drama/Performance" },
    { id: "i1S82a1Ag1Q", title: "History of Breakfast", description: "Commercial work", year: "2024", genre: "Commercial" },
    { id: "G8KOUnPRwJE", title: "Real Spit! Trailer", description: "Independent film", year: "2023", genre: "Independent Drama" },
    { id: "enrZJWfOL6s", title: "Blueberry - Short Film", description: "Full feature", year: "2023", genre: "Short Film" },
  ];

  const galleryImages = [
    { id: 1, src: "/stevie_headshot_008.webp", alt: "Professional Headshot 1", title: "Studio Portrait" },
    { id: 2, src: "/stevie_headshot_207.webp", alt: "Professional Headshot 2", title: "Character Study" },
    { id: 3, src: "/stevie_headshot_287.webp", alt: "Professional Headshot 3", title: "Dramatic Portrait" },
    { id: 4, src: "/stevie_lovepotion.webp", alt: "Character Portrait", title: "On Set" },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/holisticactor", color: "from-primary-600 to-primary-700" },
    { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@steviesumj", color: "from-accent-500 to-accent-600" },
    { icon: SiImdb, label: "IMDb", href: "https://www.imdb.com/name/nm0426281/", color: "from-primary-400 to-accent-500" },
    { icon: SiTiktok, label: "TikTok", href: "https://www.tiktok.com/@holisticactor", color: "from-primary-500 to-accent-400" },
  ];

  const roles = ["Director", "Actor", "Professor", "Author"];
  const [currentRole, setCurrentRole] = useState(0);

  // Optimized Effects
  useEffect(() => {
    // Set content as loaded immediately to prevent layout shifts
    setIsLoaded(true);
    
    // Delay animations slightly to prevent layout shifts
    const animationTimer = setTimeout(() => {
      setAllowAnimations(true);
      // Enable transitions after initial load
      document.body.classList.add('transitions-enabled');
    }, 100);
    
    // Role cycling
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3500);

    // Gallery auto-rotation
    const galleryInterval = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 7000);

    // Optimized mouse tracking with throttling
    let mouseTimeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        const x = e.clientX;
        const y = e.clientY;
        // Only update if movement is significant (> 10px)
        setMousePos(prev => {
          const deltaX = Math.abs(prev.x - x);
          const deltaY = Math.abs(prev.y - y);
          if (deltaX > 10 || deltaY > 10) {
            return { x, y };
          }
          return prev;
        });
      }, 16); // ~60fps throttling
    };

    // Optimized scroll tracking with throttling
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollY(window.scrollY);
      }, 16);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(roleInterval);
      clearInterval(galleryInterval);
      clearTimeout(mouseTimeout);
      clearTimeout(scrollTimeout);
      clearTimeout(animationTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Optimized visual calculations with reduced complexity
  const parallaxOffset = scrollY * 0.3;
  const mouseParallaxX = (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.005;
  const mouseParallaxY = (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.005;

  return (
    <ModernLayout 
      activeNavItem="home"
    >
      {/* PARTICLE FIELD DISABLED TO PREVENT JUMPINESS */}

      {/* MATRIX OVERLAY DISABLED TO PREVENT JUMPINESS */}

      {/* 🎭 CINEMATIC HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative min-h-screen overflow-hidden mb-24"
        style={{
          transform: scrollY > 0 ? `translateY(${parallaxOffset}px)` : 'translateY(0)',
        }}
      >
        {/* LIGHTING & ATMOSPHERE */}
        <div className="lighting-overlay" />
        
        {/* ATMOSPHERIC PARTICLES DISABLED TO PREVENT JUMPINESS */}

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-screen items-center px-6 max-w-7xl mx-auto">
          
          {/* 🎪 LEFT SIDE - ACTOR INTRODUCTION */}
          <div 
            className="space-y-8 depth-layer-3"
            style={{
              transform: `translate(${mouseParallaxX}px, ${mouseParallaxY}px)`
            }}
          >
            {/* KINETIC TITLE */}
            <div className="space-y-4">
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
                <span className="block text-holographic">STEVIE JOHNSON</span>
              </h1>
              
              {/* ANIMATED ROLE DISPLAY */}
              <div className="h-16 flex items-center relative overflow-hidden">
                <div className="font-heading text-3xl md:text-4xl font-bold tracking-wide relative">
                  {roles.map((role, index) => (
                    <span
                      key={role}
                      className={`absolute inset-0 flex items-center transition-all duration-700 text-holographic ${
                        index === currentRole
                          ? 'opacity-100 transform translate-y-0 scale-100 z-10'
                          : 'opacity-0 transform translate-y-8 scale-90 z-0'
                      }`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* BIO WITH CINEMATIC REVEAL */}
              <div className="space-y-4">
                <p className="text-xl text-white/90 font-body leading-relaxed max-w-lg">
                  <strong className="text-holographic">30+ years of stage and screen experience.</strong>
                  <br />Member of SAG-AFTRA.
                </p>
                <p className="text-lg text-white/70 font-body max-w-lg">
                  A father, artist, and visionary bringing passion and authenticity to every project.
                </p>
              </div>
            </div>

            {/* CINEMATIC STATS */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "30+", label: "Years Experience", icon: Award },
                { value: "100+", label: "Film/Theatre/TV Credits", icon: Film },
                { value: "2", label: "Books Published", icon: Star }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="holographic-border rounded-3xl p-6 text-center cinematic-theater"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-accent-400" />
                  <div className="font-heading text-3xl font-bold text-holographic">{stat.value}</div>
                  <div className="text-white/60 text-sm font-body">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* PREMIUM CALL TO ACTION */}
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Button 
                className="group px-10 py-5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-heading font-semibold text-lg hover:scale-105 transition-all duration-500"
                asChild
              >
                <a href="/actor">
                  <Play className="w-6 h-6 mr-3" />
                  Enter the Theater
                </a>
              </Button>
              <Button className="px-10 py-5 rounded-full glass-strong text-white font-heading font-medium text-lg hover-lift cinematic-theater" asChild>
                <a href="/author">Literary Works</a>
              </Button>
            </div>

            {/* SOCIAL LINKS WITH GLOW EFFECTS */}
            <div className="flex items-center gap-6 pt-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={social.label}
                  className={`w-14 h-14 rounded-full bg-gradient-to-r ${social.color} p-0 hover:scale-110 transition-transform duration-300`}
                  aria-label={social.label}
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-6 h-6 text-white" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* 🎬 RIGHT SIDE - CINEMATIC THEATER EXPERIENCE */}
          <div 
            className="space-y-8 depth-layer-2"
            style={{
              transform: `translate(${-mouseParallaxX}px, ${-mouseParallaxY}px)`
            }}
          >
            {/* PREMIUM SCREENING ROOM */}
            <div className="cinematic-theater cinematic-theater-main rounded-3xl p-8 holographic-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-holographic mb-2">
                    {videoReels[activeVideoIndex].title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="bg-primary-500/20 px-3 py-1 rounded-full">{videoReels[activeVideoIndex].year}</span>
                    <span className="bg-accent-500/20 px-3 py-1 rounded-full">{videoReels[activeVideoIndex].genre}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="w-10 h-10 rounded-full cinematic-theater"
                    onClick={() => setActiveVideoIndex((prev) => prev === 0 ? videoReels.length - 1 : prev - 1)}
                    aria-label="Previous reel"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </Button>
                  <Button
                    className="w-10 h-10 rounded-full cinematic-theater"
                    onClick={() => setActiveVideoIndex((prev) => (prev + 1) % videoReels.length)}
                    aria-label="Next reel"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </Button>
                </div>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden screen-glow mb-6">
                <YouTubeEmbed
                  id={videoReels[activeVideoIndex].id}
                  title={videoReels[activeVideoIndex].title}
                />
              </div>

              {/* CINEMATIC NAVIGATION */}
              <div className="flex justify-center gap-3">
                {videoReels.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 rounded-full transition-all duration-500 ${
                      index === activeVideoIndex
                        ? 'w-12 bg-gradient-to-r from-accent-400 to-primary-400'
                        : 'w-3 bg-white/30 hover:bg-white/50'
                    }`}
                    onClick={() => setActiveVideoIndex(index)}
                    aria-label={`Show reel ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 3D HEADSHOT GALLERY */}
            <div className="cinematic-theater rounded-3xl p-6 holographic-border">
              <h3 className="font-heading text-xl font-bold text-holographic mb-4">Professional Gallery</h3>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden screen-glow mb-4 group cinematic-depth">
                <img
                  src={galleryImages[activeGalleryIndex].src}
                  alt={galleryImages[activeGalleryIndex].alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 depth-layer-4"
                  width="400"
                  height="500"
                  loading="eager"
                  style={{
                    transform: `rotateY(${mouseParallaxX * 2}deg) rotateX(${-mouseParallaxY}deg)`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-white font-heading font-bold">{galleryImages[activeGalleryIndex].title}</div>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === activeGalleryIndex
                        ? 'w-8 bg-gradient-to-r from-primary-400 to-accent-400'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    onClick={() => setActiveGalleryIndex(index)}
                    aria-label={`Show photo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

    </ModernLayout>
  );
};