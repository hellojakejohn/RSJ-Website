import React, { useRef, useState } from "react";
import { ModernLayout } from "../../components/layout/ModernLayout";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  Star, 
  Users, 
  Instagram, 
  Youtube, 
  Facebook,
  Globe,
  Clock,
  CheckCircle,
  Building,
  BookOpen,
  Film,
  GraduationCap,
  Calendar,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { SiTiktok, SiImdb } from "react-icons/si";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "general",
    subject: "",
    message: "",
    company: "" // honeypot, real users never see or fill this
  });
  // Spam timing check: when the form was first shown
  const startedAt = useRef(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null, message: string}>({type: null, message: ''});

  const contactPurposes = [
    {
      id: "acting",
      title: "Acting & Performance",
      description: "Film, TV, theater, commercials",
      icon: Film,
      color: "primary",
      contact: "Agent: BiCoastal Talent",
      details: "For casting inquiries and bookings"
    },
    {
      id: "writing",
      title: "Writing & Publishing",
      description: "Book collaborations, ghostwriting",
      icon: BookOpen,
      color: "accent", 
      contact: "Direct: steviejohnson101@gmail.com",
      details: "Literary projects and partnerships"
    },
    {
      id: "teaching",
      title: "Teaching & Workshops",
      description: "Speaking, courses, coaching",
      icon: GraduationCap,
      color: "primary",
      contact: "University: USC Department",
      details: "Educational and training inquiries"
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Primary Email",
      value: "stevie@steviejohnson.com",
      description: "Best for: General inquiries, collaborations",
      response: "24-48 hours",
      color: "primary"
    },
    {
      icon: Phone,
      title: "Direct Phone",
      value: "(213) 944-6059",
      description: "Best for: Urgent bookings, immediate needs",
      response: "Same day",
      color: "accent"
    },
    {
      icon: Building,
      title: "Professional Representation",
      value: "BiCoastal Talent Agency",
      description: "Best for: Acting roles, commercial work",
      response: "Within hours",
      color: "primary"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Los Angeles, CA",
      description: "Available for: Local & remote projects",
      response: "Flexible",
      color: "accent"
    }
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/holisticactor", handle: "@holisticactor" },
    { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@steviesumj", handle: "@steviesumj" },
    { icon: SiImdb, label: "IMDB", href: "https://www.imdb.com/name/nm0426281/", handle: "nm0426281" },
    { icon: SiTiktok, label: "TikTok", href: "https://www.tiktok.com/@holisticactor", handle: "@holisticactor" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // Tab left open for hours: restart the clock so the server doesn't treat it as stale
    if (Date.now() - startedAt.current > 90 * 60 * 1000) {
      startedAt.current = Date.now();
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({type: null, message: ''});

    try {
      // Send to actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, startedAt: startedAt.current }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you for your message! I\'ll get back to you within 24-48 hours.'
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          inquiryType: 'general',
          subject: '',
          message: '',
          company: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Sorry, there was an error sending your message. Please try again or contact me directly.'
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or contact me directly at stevie@steviejohnson.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModernLayout activeNavItem="contact">
      {/* COMPACT HEADER SECTION */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-6xl font-black leading-none tracking-tight mb-4">
            <span className="text-holographic">CONTACT • STEVIE JOHNSON</span>
          </h1>
          <p className="text-lg text-white/80 font-body max-w-2xl mx-auto mb-2">
            Ready to collaborate? Multiple ways to connect for different professional needs
          </p>
          <p className="text-sm text-white/60 font-body">
            Fast response times • Professional service • Global availability
          </p>
        </div>

        {/* COMPACT STATS ROW */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { value: "<24hr", label: "Response Time", icon: Clock, color: "text-green-400" },
            { value: "Global", label: "Availability", icon: Globe, color: "text-blue-400" },
            { value: "100%", label: "Professional", icon: CheckCircle, color: "text-yellow-400" },
            { value: "Multi", label: "Platforms", icon: MessageCircle, color: "text-accent-400" }
          ].map((stat) => (
            <div 
              key={stat.label}
              className="cinematic-theater holographic-border rounded-xl px-6 py-3 flex items-center gap-3 group hover:scale-105 transition-all duration-300"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} group-hover:animate-pulse`} />
              <div className="text-center">
                <div className="font-heading text-xl font-bold text-holographic">{stat.value}</div>
                <div className="text-white/60 text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* MAIN CONTACT LAYOUT */}
      <section className="pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: CONTACT METHODS (1/3) */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-holographic mb-4">Direct Contact</h3>
            {contactMethods.map((method) => (
              <Card 
                key={method.title}
                className="glass rounded-xl p-4 hover-lift group transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${method.color === 'primary' ? 'bg-primary-500/20' : 'bg-accent-500/20'} flex-shrink-0`}>
                    <method.icon className={`w-4 h-4 ${method.color === 'primary' ? 'text-primary-400' : 'text-accent-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-heading text-sm font-bold text-white">{method.title}</h4>
                      <span className="text-xs text-green-400">{method.response}</span>
                    </div>
                    <p className="text-accent-400 text-sm font-semibold mb-1 truncate">{method.value}</p>
                    <p className="text-white/60 text-xs leading-relaxed mb-2">{method.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            {/* SOCIAL MEDIA COMPACT */}
            <Card className="glass rounded-xl p-4">
              <h4 className="font-heading text-sm font-bold text-holographic mb-3">Follow & Connect</h4>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg glass text-white/70 hover:text-white hover:bg-white/10 transition-all group"
                  >
                    <social.icon className="w-4 h-4" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium truncate">{social.label}</div>
                    </div>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </Card>
          </div>

          {/* CENTER: CONTACT FORM (2/3) */}
          <div className="lg:col-span-2">
            <Card className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-holographic">Send a Message</h3>
              </div>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Honeypot: hidden from people and screen readers, bots fill it in */}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                >
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-white mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="acting">Acting/Performance</option>
                    <option value="writing">Writing/Publishing</option>
                    <option value="teaching">Teaching/Speaking</option>
                    <option value="collaboration">Collaboration</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief subject line"
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell me about your project or inquiry..."
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all resize-none"
                    required
                  ></textarea>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                  <Button
                    type="button"
                    className="px-6 py-3 rounded-xl glass text-white hover:bg-white/10 transition-all"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>
              </form>
              
              {/* Success/Error Messages */}
              {submitStatus.type && (
                <div className={`mt-4 p-4 rounded-xl ${submitStatus.type === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-5 h-5 ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`} />
                    <p className={`text-sm ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT & INFO */}
      <section className="pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* URGENT CONTACT */}
          <Card className="glass rounded-2xl p-6 border-l-4 border-accent-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-accent-500 to-primary-500">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-holographic">Urgent Inquiries</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              For time-sensitive bookings, casting calls, or immediate assistance, use these priority channels.
            </p>
            <div className="space-y-3">
              <Button className="w-full px-4 py-3 rounded-xl bg-accent-500 text-white hover:bg-accent-600 transition-all">
                <Phone className="w-4 h-4 mr-2" />
                Call (213) 944-6059
              </Button>
              <Button className="w-full px-4 py-3 rounded-xl glass text-white hover:bg-white/10 transition-all">
                <Building className="w-4 h-4 mr-2" />
                Contact Agent
              </Button>
            </div>
          </Card>

          {/* RESPONSE EXPECTATIONS */}
          <Card className="glass rounded-2xl p-6 border-l-4 border-primary-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-holographic">Response Times</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Email inquiries:</span>
                <span className="text-green-400 font-medium">24-48 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Phone calls:</span>
                <span className="text-green-400 font-medium">Same day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Urgent bookings:</span>
                <span className="text-green-400 font-medium">Within hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">General availability:</span>
                <span className="text-blue-400 font-medium">7 days/week</span>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </ModernLayout>
  );
};