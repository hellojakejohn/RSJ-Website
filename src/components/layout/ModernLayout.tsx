import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

interface ModernLayoutProps {
  children: React.ReactNode;
  activeNavItem?: string;
}

export const ModernLayout = ({ 
  children,
  activeNavItem = "home"
}: ModernLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = ["home", "actor", "author", "professor", "courses", "contact"];

  // Enable transitions after component mount to prevent layout shifts
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add('transitions-enabled');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-body dark flex flex-col">
      {/* Fixed Header with Glass Effect */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass py-2' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo/Brand */}
          <a
            href="/"
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center neon-glow"
            aria-label="Stevie Johnson home"
          >
            <span className="text-white font-display text-xl font-bold">SJ</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex" aria-label="Main">
            <ul className="glass rounded-full px-6 py-2 flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`/${item === "home" ? "" : item}`}
                    aria-current={item === activeNavItem ? "page" : undefined}
                    className={`block px-6 py-2 rounded-full font-heading text-sm font-medium transition-colors duration-200 ${
                      item === activeNavItem
                        ? 'text-accent-400 bg-primary-500/20'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            

            {/* Mobile Menu Button */}
            <Button 
              className="lg:hidden w-10 h-10 rounded-full glass"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen 
                ? <X className="w-5 h-5 text-white" /> 
                : <Menu className="w-5 h-5 text-white" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-strong animate-slide-down">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`/${item === "home" ? "" : item}`}
                  className={`
                    block px-4 py-3 rounded-xl font-heading font-medium transition-colors duration-200
                    ${item === activeNavItem 
                      ? 'text-accent-400 bg-primary-500/20' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 relative pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {children}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="relative bg-black/80 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-white/50 text-sm">
            © {new Date().getFullYear()} Stevie Johnson • All Rights Reserved
          </p>
        </div>
      </footer>

    </div>
  );
};