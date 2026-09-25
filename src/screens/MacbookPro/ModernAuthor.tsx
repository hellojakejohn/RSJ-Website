import React, { useState } from "react";
import { ModernLayout } from "../../components/layout/ModernLayout";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { usePageMeta } from "../../lib/usePageMeta";
import { Calendar, BookOpen, ShoppingCart, Award, Mail } from "lucide-react";

export const ModernAuthor = () => {
  usePageMeta({
    title: "Author",
    description: "Books by Stevie Johnson: How To Survive Speech 101, a public speaking workbook, and Convertible Chocolate, a memoir.",
    image: "/stevie_headshot_287.jpg",
  });
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  
  const books = [
    {
      title: "How To Survive Speech 101",
      cover: "/Speech_101_Bookcover.png",
      price: 49.99,
      description: "Essential public speaking techniques",
      longDescription: "Comprehensive guide to conquering public speaking anxiety. Packed with exercises, real-world examples, and Stevie's proven techniques from 30+ years of teaching.",
      amazonUrl: "https://www.amazon.com/How-Survive-Speech-101-Workbook/dp/1500874523",
      publishDate: "August 2014",
      pages: 192,
      genre: "Education",
      color: "from-primary-500 to-primary-600"
    },
    {
      title: "Convertible Chocolate",
      cover: "/Convertible_Chocolate_Cover.png",
      price: 15.99,
      description: "One man's journey to finding true love",
      longDescription: "A heartfelt memoir exploring love, identity, and self-discovery through chocolate-making. Chronicles Stevie's personal journey with humor and vulnerability.",
      amazonUrl: "https://www.amazon.com/Convertible-Chocolate-R-Steven-Johnson/dp/0989372502",
      publishDate: "June 2013",
      pages: 218,
      genre: "Memoir",
      color: "from-accent-500 to-accent-600"
    }
  ];

  return (
    <ModernLayout activeNavItem="author">
      {/* COMPACT HEADER SECTION */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-6xl font-black leading-none tracking-tight mb-4">
            <span className="text-holographic">AUTHOR • STEVIE JOHNSON</span>
          </h1>
          <p className="text-lg text-white/80 font-body max-w-2xl mx-auto mb-2">
            Published works exploring memoir, education, and creative arts
          </p>
          <p className="text-sm text-white/60 font-body">
            2 new books in development for 2025
          </p>
        </div>

        {/* COMPACT STATS ROW */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { value: "2", label: "Books", icon: BookOpen },
            { value: "2", label: "Genres", icon: Award },
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

      {/* PUBLISHED WORKS - CENTERED LAYOUT */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 mb-4">
              PUBLISHED WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            {books.map((book, index) => (
              <Card 
                key={book.title} 
                className="glass rounded-3xl p-5 hover-lift group overflow-hidden relative max-w-md mx-auto"
              >
                {/* Book Cover with 3D Flip Effect */}
                <div className="perspective-1000 mb-5">
                  <div 
                    className="relative w-full aspect-[2/3] transition-transform duration-700 preserve-3d cursor-pointer max-w-xs mx-auto"
                    style={{
                      transform: selectedBook === index ? "rotateY(180deg)" : "rotateY(0deg)"
                    }}
                    onClick={() => setSelectedBook(selectedBook === index ? null : index)}
                  >
                    {/* Front Side */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="relative rounded-2xl overflow-hidden h-full group-hover:shadow-2xl transition-all duration-500">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${book.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      </div>
                    </div>
                    
                    {/* Back Side */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${book.color} p-4 flex flex-col justify-between text-white`}>
                        <div>
                          <h3 className="font-heading font-bold text-lg mb-3">{book.title}</h3>
                          <p className="text-sm opacity-90 leading-relaxed">{book.longDescription}</p>
                        </div>
                        <div className="space-y-2 text-xs opacity-80">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {book.publishDate}
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3 h-3" />
                            {book.pages} pages
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${book.color} text-white`}>
                      {book.genre}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-accent-400 transition-colors duration-300 text-center">
                    {book.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed text-center">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between pt-4">
                    <div className="font-heading text-2xl font-bold text-accent-400">
                      ${book.price}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="px-4 py-2 rounded-xl bg-primary-500/20 text-primary-400 hover:bg-primary-500 hover:text-white transition-all duration-300 text-xs font-medium"
                        onClick={() => setSelectedBook(selectedBook === index ? null : index)}
                      >
                        Details
                      </Button>
                      <Button 
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent-500 to-primary-500 text-white hover:scale-105 transition-all duration-300 text-xs font-medium group"
                        asChild
                      >
                        <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Buy
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${book.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none`} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE AUTHOR SECTION - PROMINENT BOTTOM */}
      <section className="py-20">
        <Card className="glass rounded-3xl p-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 mb-4">
                About the Author
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2 space-y-6">
                <p className="text-xl text-white/90 font-body leading-relaxed">
                  Stevie Johnson brings decades of experience in performance, education, and creative writing 
                  to his published works. As both a practicing artist and dedicated educator, his books offer 
                  unique insights that bridge theoretical knowledge with real-world application.
                </p>
                
                <p className="text-lg text-white/80 font-body leading-relaxed">
                  From intimate memoirs to comprehensive educational guides, each publication reflects 
                  Stevie's commitment to authentic storytelling and practical wisdom gained through 
                  30+ years in the entertainment and education industries.
                </p>

                <p className="text-lg text-white/80 font-body leading-relaxed">
                  His writing philosophy centers on accessibility and genuine connection with readers, 
                  whether sharing personal journey insights in memoir form or providing practical tools 
                  for overcoming public speaking challenges.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center glass rounded-2xl p-4">
                    <div className="font-heading text-3xl font-bold text-accent-400">2</div>
                    <div className="text-white/60 text-sm">Books Published</div>
                  </div>
                  <div className="text-center glass rounded-2xl p-4">
                    <div className="font-heading text-3xl font-bold text-accent-400">30+</div>
                    <div className="text-white/60 text-sm">Years Experience</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 rounded-2xl overflow-hidden neon-glow">
                    <img
                      src="/stevie_headshot_287.webp"
                      alt="Stevie Johnson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <Button className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-heading font-semibold hover:scale-105 transition-all duration-300" asChild>
                      <a href="mailto:steviejohnson101@gmail.com?subject=Literary%20Inquiry">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Author
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </ModernLayout>
  );
};