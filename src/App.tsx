/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';
import { ArrowUpRight, ArrowRight, Dribbble, Github, Linkedin, Twitter, X } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Utils ---
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// --- Assets ---
const ASSETS = {
  projects: {
    wireframe: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
    building: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1000&auto=format&fit=crop",
    person: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    branding: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1000&auto=format&fit=crop",
  },
  explorations: {
    planet: "https://images.unsplash.com/photo-1614730341194-75c60740a070?q=80&w=1000&auto=format&fit=crop",
    ascii: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    smoke: "https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=1000&auto=format&fit=crop",
    cylinder: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    wave: "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1000&auto=format&fit=crop",
    cubes: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1000&auto=format&fit=crop",
  }
};

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Design", "Create", "Inspire"];

  useEffect(() => {
    const duration = 2700;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-12">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-end">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none">
          {String(count).padStart(3, "0")}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div 
          className="h-full accent-gradient origin-left"
          style={{ 
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)'
          }}
        />
      </div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div className={cn(
        "inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300",
        scrolled && "shadow-md shadow-black/10"
      )}>
        <div className="group relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer overflow-hidden">
          <div className="absolute inset-0 rounded-full p-[1px] accent-gradient group-hover:animate-spin" />
          <div className="absolute inset-[1px] bg-bg rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <span className="font-display italic text-[13px] text-text-primary">KP</span>
          </div>
        </div>

        <div className="hidden md:block w-px h-5 bg-stroke mx-3" />

        <div className="flex items-center gap-1">
          {["Home", "Work", "Resume"].map((item, i) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-300",
                i === 0 ? "text-text-primary bg-stroke/50" : "text-muted hover:text-text-primary hover:bg-stroke/50"
              )}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="w-px h-5 bg-stroke mx-3" />

        <button className="group relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 overflow-hidden">
          <span className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute inset-[1px] bg-surface rounded-full backdrop-blur-md" />
          <span className="relative z-10 flex items-center gap-1 text-muted group-hover:text-text-primary transition-colors">
            Say hi <ArrowUpRight className="w-3 h-3" />
          </span>
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Creative", "Fullstack", "Founder", "Scholar"];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.to(".name-reveal", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.1
      })
      .to(".blur-in", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.1
      }, "-=0.8");
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-bg z-0">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <div className="blur-in opacity-0 translate-y-5 filter blur-[10px] text-xs text-muted uppercase tracking-[0.3em] mb-8">
          COLLECTION '26
        </div>
        
        <h1 className="name-reveal opacity-0 translate-y-[50px] text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Kavya Patel
        </h1>

        <div className="blur-in opacity-0 translate-y-5 filter blur-[10px] text-xl md:text-2xl text-text-primary/90 mb-6 font-light">
          A <span key={roleIndex} className="font-display italic text-text-primary animate-role-fade-in inline-block min-w-[100px] text-left">{roles[roleIndex]}</span> lives in Ahmedabad.
        </div>

        <p className="blur-in opacity-0 translate-y-5 filter blur-[10px] text-sm md:text-base text-muted max-w-md mx-auto mb-12 leading-relaxed">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        <div className="blur-in opacity-0 translate-y-5 filter blur-[10px] flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative rounded-full text-sm px-7 py-3.5 overflow-hidden transition-transform hover:scale-105 bg-text-primary text-bg hover:bg-bg hover:text-text-primary">
            <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-white/20" />
            <span className="relative z-10">See Works</span>
            <div className="absolute inset-0 rounded-full p-[1px] accent-gradient opacity-0 group-hover:opacity-100 -z-10" />
          </button>
          
          <button className="group relative rounded-full text-sm px-7 py-3.5 overflow-hidden transition-transform hover:scale-105 border-2 border-stroke bg-bg text-text-primary hover:border-transparent">
            <span className="relative z-10">Reach out...</span>
            <div className="absolute inset-0 rounded-full p-[2px] accent-gradient opacity-0 group-hover:opacity-100 -z-10" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

const SelectedWorks = () => {
  const projects = [
    { slug: "automotive-motion", title: "Automotive Motion", image: ASSETS.projects.wireframe, gradient: "from-violet-500 via-fuchsia-400/60 via-indigo-500/60 to-transparent" },
    { slug: "urban-architecture", title: "Urban Architecture", image: ASSETS.projects.building, gradient: "from-sky-500 via-blue-400/60 to-transparent" },
    { slug: "human-perspective", title: "Human Perspective", image: ASSETS.projects.person, gradient: "from-emerald-500 via-emerald-300/60 via-teal-500/60 to-transparent" },
    { slug: "brand-identity", title: "Brand Identity", image: ASSETS.projects.branding, gradient: "from-amber-500 via-amber-300/60 via-orange-500/60 to-transparent" },
  ];

  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-text-primary mb-4">
              Featured <span className="font-display italic">projects</span>
            </h2>
            <p className="text-muted max-w-md">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>
          
          <button className="hidden md:inline-flex items-center gap-2 text-sm border border-stroke rounded-full px-5 py-2.5 hover:bg-surface transition-colors group">
            View all work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-stroke bg-surface cursor-pointer",
                i % 4 === 0 || i % 4 === 3 ? "md:col-span-7 aspect-[4/3]" : "md:col-span-5 aspect-[4/3] md:aspect-auto md:h-full"
              )}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-bg/40 transition-colors duration-500" />
              <div 
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                <div className="relative px-6 py-3 bg-white rounded-full overflow-hidden">
                  <div className="absolute inset-0 p-[1px] accent-gradient animate-gradient-shift" />
                  <div className="relative z-10 flex items-center gap-2 text-bg font-medium">
                    <span>View — <span className="font-display italic">{project.title}</span></span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Journal = () => {
  const entries = [
    { title: "The Future of Generative Art in 2026", image: ASSETS.explorations.planet, readTime: "6 min read", date: "Feb 13, 2026" },
    { title: "Designing for the Next Billion Users", image: ASSETS.explorations.cubes, readTime: "5 min read", date: "Feb 06, 2026" },
    { title: "The Psychology of Minimalist Motion", image: ASSETS.explorations.ascii, readTime: "6 min read", date: "Feb 03, 2026" },
    { title: "The Importance of Mobile-First Design", image: ASSETS.explorations.smoke, readTime: "5 min read", date: "Jan 31, 2026" },
  ];

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-text-primary mb-4">
            Recent <span className="font-display italic">thoughts</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {entries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors duration-300 cursor-pointer"
            >
              <div className="relative w-24 h-24 shrink-0 rounded-full overflow-hidden border border-stroke group-hover:border-white/20 transition-colors">
                <img src={entry.image} alt={entry.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              
              <h3 className="text-lg md:text-2xl font-medium text-text-primary transition-transform duration-300 group-hover:translate-x-2">
                {entry.title}
              </h3>

              <div className="hidden md:block flex-grow h-px bg-stroke/30 mx-4" />

              <div className="flex items-center justify-between md:justify-end gap-6 md:min-w-[200px]">
                <div className="text-sm text-muted">
                  <span>{entry.readTime}</span>
                  <span className="mx-2">•</span>
                  <span>{entry.date}</span>
                </div>
                
                <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center transition-all duration-300 group-hover:bg-text-primary group-hover:text-bg group-hover:border-transparent">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Explorations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const items = [
    { id: 1, title: "Celestial Planets", category: "3D Visualization", image: ASSETS.explorations.planet },
    { id: 2, title: "ASCII Art Study", category: "Generative Art", image: ASSETS.explorations.ascii },
    { id: 3, title: "Atmospheric Smoke", category: "Visual Effects", image: ASSETS.explorations.smoke },
    { id: 4, title: "Abstract Cylinder", category: "3D Rendering", image: ASSETS.explorations.cylinder },
    { id: 5, title: "Organic Waves", category: "Motion Design", image: ASSETS.explorations.wave },
    { id: 6, title: "Geometric Cubes", category: "3D Composition", image: ASSETS.explorations.cubes },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      gsap.fromTo(leftColRef.current, 
        { y: "10vh" },
        {
          y: "-120vh",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(rightColRef.current, 
        { y: "40vh" },
        {
          y: "-100vh",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-bg overflow-hidden">
      <div ref={contentRef} className="absolute inset-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-center pointer-events-auto bg-bg/80 backdrop-blur-sm p-8 rounded-3xl border border-white/5">
          <span className="text-xs text-muted uppercase tracking-[0.3em] mb-4 block">Explorations</span>
          <h2 className="text-5xl md:text-7xl font-medium text-text-primary mb-4">
            Visual <span className="font-display italic">playground</span>
          </h2>
          <p className="text-muted max-w-md mx-auto mb-8">
            A space for creative experiments, motion studies, and visual explorations.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stroke bg-surface hover:bg-bg transition-all group relative overflow-hidden">
            <div className="absolute inset-0 rounded-full p-[1px] accent-gradient opacity-0 group-hover:opacity-100 -z-10" />
            <Dribbble className="w-4 h-4 text-[#ea4c89]" />
            <span className="text-sm">View on Dribbble</span>
            <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-text-primary" />
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative z-0 h-full">
        <div className="grid grid-cols-2 gap-12 md:gap-40 h-full">
          <div ref={leftColRef} className="flex flex-col gap-20 pt-[20vh]">
            {items.filter((_, i) => i % 2 === 0).map((item) => (
              <ExplorationCard key={item.id} item={item} onClick={() => setLightboxImage(item.image)} />
            ))}
          </div>
          <div ref={rightColRef} className="flex flex-col gap-20 pt-[40vh]">
            {items.filter((_, i) => i % 2 !== 0).map((item) => (
              <ExplorationCard key={item.id} item={item} onClick={() => setLightboxImage(item.image)} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img 
              src={lightboxImage} 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-full max-h-[90vh] aspect-[16/10] object-contain rounded-lg"
            />
            <button className="absolute top-8 right-8 text-white/50 hover:text-white">
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface ExplorationCardProps {
  item: {
    id: number;
    title: string;
    category: string;
    image: string;
  };
  onClick: () => void;
}

const ExplorationCard: React.FC<ExplorationCardProps> = ({ item, onClick }) => {
  const rotation = (item.id % 2 === 0 ? 1 : -1) * (1.5 + item.id % 3);
  
  return (
    <div 
      onClick={onClick}
      className="group relative aspect-square max-w-[320px] w-full mx-auto cursor-zoom-in"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="absolute -inset-4 rounded-[40px] border border-stroke bg-surface/50 backdrop-blur-sm -z-10 transition-transform duration-500 group-hover:scale-105" />
      
      <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
        <div 
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <span className="text-xs text-white/60 uppercase tracking-wider mb-1">{item.category}</span>
          <h3 className="text-xl font-display italic text-white">{item.title}</h3>
        </div>
      </div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { number: "20+", label: "Years Experience", sublabel: "In the web design industry field." },
    { number: "95+", label: "Projects Done", sublabel: "Around worldwide in last five years." },
    { number: "200%", label: "Satisfied Clients", sublabel: "With a great experience and results." },
  ];

  return (
    <section className="bg-bg py-16 md:py-24 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Stats & Facts</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-text-primary mb-4">
            Making an <span className="font-display italic">impact</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex flex-col gap-6",
                i === 2 && "sm:col-span-2 lg:col-span-1"
              )}
            >
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-text-primary/90">
                {stat.number}
              </div>
              <div className="h-px w-full bg-stroke" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2">{stat.label}</h3>
                <p className="text-sm text-muted">{stat.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }
  }, []);

  useEffect(() => {
    gsap.to(".marquee-text", {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1
    });
  }, []);

  return (
    <footer className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background Video Flipped */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-bg/60" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden whitespace-nowrap mb-20 flex">
          <div className="marquee-text flex gap-8">
            {Array(10).fill("BUILDING THE FUTURE • ").map((text, i) => (
              <span key={i} className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/10">
                {text}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center mb-24">
          <p className="text-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Have a project in mind? I'm always open to new ideas and collaborations.
          </p>
          <a 
            href="mailto:hello@kavyapatel.com"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-bg border-2 border-stroke rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 text-text-primary font-medium flex items-center gap-2">
              Start a conversation <ArrowUpRight className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 rounded-full p-[2px] accent-gradient opacity-0 group-hover:opacity-100 -z-10" />
          </a>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 border-t border-stroke pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {[
              { icon: Twitter, label: "Twitter" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Dribbble, label: "Dribbble" },
              { icon: Github, label: "GitHub" }
            ].map((social) => (
              <a 
                key={social.label} 
                href="#" 
                className="text-sm text-muted hover:text-text-primary hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <social.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{social.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm text-text-primary/80">Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-bg min-h-screen text-text-primary font-sans selection:bg-white/20">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
          
          <Navbar />
          <Hero />
          <SelectedWorks />
          <Journal />
          <Explorations />
          <Stats />
          <Footer />
        </motion.main>
      )}
    </div>
  );
}
