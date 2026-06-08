import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code2, 
  Database, 
  Terminal, 
  Layers, 
  Cpu, 
  ArrowUpRight, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Linkedin, 
  Github, 
  Send, 
  Check, 
  Loader2,
  Menu,
  X,
  Compass,
  FileText,
  ArrowLeft,
  Search,
  Star,
  Shield,
  Scale
} from "lucide-react";
import { profileDetails, skillsCategories, recentProjects, labNotes, caseStudies, fiverrGigs } from "./data";
import { ContactFormData } from "./types";

export default function App() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formFeedback, setFormFeedback] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGridPaper, setIsGridPaper] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isLabNotesOpen, setIsLabNotesOpen] = useState(false);

  // Router Engine state
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'case-study' | 'privacy' | 'terms' | 'fiverr-gig'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Fiverr marketplace state
  const [gigSearchQuery, setGigSearchQuery] = useState("");
  const [selectedGigPackageTier, setSelectedGigPackageTier] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [gigMessageStatus, setGigMessageStatus] = useState("");

  // Portfolio page filters
  const [projectTagFilter, setProjectTagFilter] = useState("ALL");
  const [projectSearchQuery, setProjectSearchQuery] = useState("");

  // Handle URL Hash scrolling / routing back-ups
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, selectedProjectId]);

  // Custom icon mapper matching the JSON categories
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers": return <Layers className="w-8 h-8 text-white shrink-0" />;
      case "Database": return <Database className="w-8 h-8 text-zinc-400 shrink-0" />;
      case "Cpu": return <Cpu className="w-8 h-8 text-zinc-300 shrink-0" />;
      case "Terminal": return <Terminal className="w-8 h-8 text-zinc-500 shrink-0" />;
      default: return <Code2 className="w-8 h-8 text-white shrink-0" />;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      setFormFeedback("All fields are required before logic code can compile.");
      return;
    }

    setFormStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setFormStatus("success");
        setFormFeedback(result.simulated 
          ? "Blueprint Mode: Message cached successfully!" 
          : "Your message has been successfully routed to Rizwan's blueprint node."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.error || "System transaction failed. Please retry.");
      }
    } catch (err: any) {
      setFormStatus("error");
      setFormFeedback(err.message || "Failed to establish contact transit tunnel.");
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profileDetails.emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className={`min-h-screen text-zinc-300 transition-all duration-300 ${
      isGridPaper ? "matrix-grid-bg" : "carbon-clean-bg"
    }`}
    >
      {/* Top Navigation Bar */}
      <header className="bg-transparent border-0 z-50 relative">
        <nav className="flex justify-between items-center w-full px-6 md:px-12 py-6 max-w-7xl mx-auto">
          {/* Logo Handle */}
          <button 
            onClick={() => setCurrentView('home')}
            className="text-xl md:text-2xl font-hand font-extrabold border border-zinc-700 px-4 py-1.5 text-white bg-black hover:bg-white hover:text-black transition-all tracking-tight uppercase italic duration-300 cursor-pointer"
          >
            {profileDetails.handle}
          </button>
 
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center font-mono">
    
      
            <button 
              onClick={() => {
                setCurrentView('home');
                setTimeout(() => document.getElementById('bio')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              // About
            </button>
            <button 
              onClick={() => {
                setCurrentView('home');
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              // Contact
            </button>
            <button 
              onClick={() => setCurrentView('projects')}
              className={`text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer px-2 py-0.5 border ${
                currentView === 'projects' ? 'border-white text-white bg-zinc-900' : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              // Projects
            </button>
            <button 
              onClick={() => setCurrentView('fiverr-gig')}
              className={`text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer px-3 py-1 bg-emerald-950/50 border ${
                currentView === 'fiverr-gig' ? 'border-emerald-400 text-white' : 'border-emerald-900/60 text-emerald-400 hover:bg-emerald-900/50 hover:text-emerald-300'
              }`}
            >
              Fiverr Gig
            </button>
          </div>

          {/* Grid Paper Style Toggles and Mobile Trigger */}
          <div className="flex gap-3 items-center">
            <button 
              onClick={() => setIsGridPaper(!isGridPaper)}
              className="px-3 py-1.5 text-xs font-mono font-bold bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-none hover:bg-zinc-855 transition-all flex items-center gap-1.5 active:translate-y-0.5 cursor-pointer"
              title="Toggle Matrix Mesh Mode"
            >
              <Compass className="w-3.5 h-3.5 text-zinc-300" />
              <span className="hidden sm:inline">{isGridPaper ? "Matrix Grid" : "Carbon Clean"}</span>
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 bg-zinc-900 border border-zinc-800 rounded-none text-white hover:bg-zinc-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#0D0D0D] border-t border-zinc-800 px-6 py-6 space-y-4 font-mono text-xs"
            >
              <button 
                onClick={() => {
                  setCurrentView('home');
                  setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setIsMobileMenuOpen(false);
                }}
                className="block uppercase tracking-widest font-bold text-zinc-400 hover:text-white text-left w-full cursor-pointer"
              >
                // Work
              </button>
              <button 
                onClick={() => {
                  setCurrentView('home');
                  setTimeout(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setIsMobileMenuOpen(false);
                }}
                className="block uppercase tracking-widest font-bold text-zinc-400 hover:text-white text-left w-full cursor-pointer"
              >
                // Skills
              </button>
              <button 
                onClick={() => {
                  setCurrentView('home');
                  setTimeout(() => document.getElementById('bio')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setIsMobileMenuOpen(false);
                }}
                className="block uppercase tracking-widest font-bold text-zinc-400 hover:text-white text-left w-full cursor-pointer"
              >
                // About
              </button>
              <button 
                onClick={() => {
                  setCurrentView('home');
                  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setIsMobileMenuOpen(false);
                }}
                className="block uppercase tracking-widest font-bold text-zinc-400 hover:text-white text-left w-full cursor-pointer"
              >
                // Contact
              </button>
              <button 
                onClick={() => {
                  setCurrentView('projects');
                  setIsMobileMenuOpen(false);
                }}
                className="block uppercase tracking-widest font-bold text-white text-left w-full cursor-pointer"
              >
                // All Projects
              </button>
              <button 
                onClick={() => {
                  setCurrentView('fiverr-gig');
                  setIsMobileMenuOpen(false);
                }}
                className="block uppercase tracking-widest font-black text-emerald-400 hover:text-white text-left w-full cursor-pointer"
              >
                Fiverr Gig App
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-20">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-36"
            >
              {/* HERO SECTION */}
              <section id="hero" className="relative py-12 flex flex-col items-center text-center">
          <div className="absolute top-0 opacity-5 pointer-events-none transform -translate-y-6">
            <Compass className="w-52 h-52 text-white" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 mb-6 flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-zinc-700"></span> SENIOR CODER ARCHITECTURE
            </div>

            <h1 className="font-hand text-6xl md:text-[112px] font-black leading-[0.8] tracking-tighter italic uppercase select-none mb-6">
              Rizwan <br />
              <span className="text-outline">FULLSTACK DEVELOPER</span>
            </h1>

            <div className="font-mono text-xs max-w-2xl text-zinc-450 mb-8 uppercase tracking-[0.2em] py-3.5 px-6 mx-auto bg-zinc-950/80 border border-zinc-900 rounded-none flex items-center justify-center gap-x-6 gap-y-3 flex-wrap relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              {/* Artistic Flair custom corner ticks with glowing pulse transformations */}
              <motion.div 
                animate={{ scale: [1, 1.25, 1], borderColor: ["#3f3f46", "#ffffff", "#3f3f46"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l"
              />
              <motion.div 
                animate={{ scale: [1, 1.25, 1], borderColor: ["#3f3f46", "#ffffff", "#3f3f46"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r"
              />
              <motion.div 
                animate={{ scale: [1, 1.25, 1], borderColor: ["#3f3f46", "#ffffff", "#3f3f46"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l"
              />
              <motion.div 
                animate={{ scale: [1, 1.25, 1], borderColor: ["#3f3f46", "#ffffff", "#3f3f46"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r"
              />

              <div className="flex items-center gap-2 text-white font-medium">
                <MapPin className="w-4 h-4 text-[#157145] shrink-0" />
                <span className="tracking-widest">Lahore, Pakistan</span>
              </div>
              <span className="text-zinc-800 select-none hidden sm:inline">//</span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-zinc-300 font-bold tracking-widest text-[10px] sm:text-xs">
                  Available to Work Remote &amp; Worldwide
                </span>
              </div>
            </div>

            <p className="font-mono text-xs md:text-sm max-w-2xl text-zinc-400 mb-8 leading-relaxed mx-auto uppercase tracking-tighter italic">
              "{profileDetails.bioHeadline}"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#projects"
                className="w-full sm:w-auto text-center font-mono text-[10px] font-bold uppercase tracking-widest border border-zinc-700 rounded-full px-8 py-4 bg-white text-black hover-invert transition-all"
              >
                VIEW PROJECTS
              </a>
              <a 
                href="https://cal.com/rizwandev/30min"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center font-mono text-[10px] font-bold uppercase tracking-widest border border-zinc-700 rounded-full px-8 py-4 bg-zinc-900 text-white hover:bg-zinc-800 transition-all inline-flex items-center justify-center gap-1.5"
              >
                BOOK MEETING <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* MISSION & ABOUT HERO SECTION */}
        <section id="bio" className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border-t border-zinc-800 pt-16">
          {/* Card Block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-10 border border-zinc-800 bg-[#121212] overflow-hidden"
          >
            <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-widest mb-2">01 STATEMENT</span>
            <h2 className="font-hand text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-6 pb-2 border-b border-dashed border-zinc-800 text-white">
              The Mission
            </h2>
            <p className="font-mono text-sm text-zinc-400 mb-6 leading-relaxed">
              {profileDetails.missionPara1}
            </p>
            <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-10">
              {profileDetails.missionPara2}
            </p>

            {/* Current Status Anchor */}
            <div className="flex gap-4 items-center bg-black p-4 border border-zinc-800">
              <div className="w-12 h-12 rounded-none border border-zinc-700 overflow-hidden bg-zinc-900 shrink-0">
                <img 
                  alt="Rizwan Avatar" 
                  className="w-full h-full object-cover filter grayscale" 
                  referrerPolicy="no-referrer"
                  src={profileDetails.avatarUrl} 
                />
              </div>
              <div>
                <span className="font-mono text-[9px] font-bold block text-zinc-500 uppercase tracking-widest">
                  CURRENT AVAILABILITY
                </span>
                <span className="font-mono text-xs font-semibold text-white tracking-widest uppercase">
                  {profileDetails.status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Decorative Sketching Image Stack */}
          <div className="relative hidden lg:block h-[420px]">
            <div className="absolute inset-0 border border-zinc-800 bg-[#0d0d0d]"></div>
            <div className="absolute inset-4 border border-zinc-850 overflow-hidden bg-zinc-950">
              <img 
                alt="Code Workspace notebook" 
                className="w-full h-full object-cover grayscale contrast-125 brightness-75"
                referrerPolicy="no-referrer"
                src={profileDetails.deskImgUrl} 
              />
            </div>
            <div className="absolute bottom-6 -left-4 bg-white text-black px-6 py-2.5 font-hand text-lg font-black uppercase tracking-wider hover-invert cursor-pointer transition-all">
              Sketching Logic...
            </div>
          </div>
        </section>

        {/* TECHNICAL EXPERTISE STACK */}
        <section id="skills" className="space-y-12 border-t border-zinc-800 pt-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="font-mono text-[10px] tracking-[0.25em] font-bold text-zinc-500 px-4 py-1.5 border border-zinc-800 uppercase">
              THE CONTEXT MATRIX
            </span>
            <h2 className="font-hand text-4xl md:text-6xl text-white italic tracking-tighter uppercase font-black">
              Technical Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsCategories.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-zinc-800 bg-[#121212] hover:bg-zinc-900 transition-colors flex flex-col justify-between min-h-[250px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    {getCategoryIcon(cat.iconName)}
                    {cat.isCore && (
                      <span className="font-mono text-[9px] font-bold bg-white text-black px-2 mt-1 uppercase tracking-widest">
                        CORE
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[9px] text-zinc-600 block uppercase tracking-widest mb-1">MODULE {(idx + 1).toString().padStart(2, "0")}</span>
                  <h3 className="font-hand text-2xl mb-2 text-white font-black italic uppercase">{cat.title}</h3>
                  <p className="font-mono text-xs text-zinc-400 leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-dashed border-zinc-800">
                  {cat.skills.map((skill, sIdx) => {
                    return (
                      <span 
                        key={sIdx} 
                        className="font-mono text-[10px] font-semibold bg-zinc-900 text-zinc-450 border border-zinc-800 px-2 py-0.5 inline-block uppercase"
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Philosophy Full-Width Ribbon */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover="hoverStyle"
            className="p-8 border border-zinc-800 bg-white text-black hover-invert transition-all flex flex-col md:flex-row items-center gap-6 cursor-pointer group"
          >
            <div className="flex-1">
              <h3 className="font-hand text-3xl mb-3 text-black font-black uppercase italic tracking-tighter">
                The Philosophy
              </h3>
              <p className="font-mono text-xs md:text-sm leading-relaxed italic uppercase">
                "{profileDetails.philosophy}"
              </p>
            </div>
            <div className="flex flex-col items-center shrink-0">
              <motion.div
                variants={{
                  hoverStyle: { rotate: 360 }
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <Compass className="w-12 h-12 text-black" />
              </motion.div>
              <span className="font-mono text-[9px] font-black tracking-widest uppercase mt-2">
                SCALE FIRST
              </span>
            </div>
          </motion.div>
        </section>

        {/* SELECTED PROJECTS GRID */}
        <section id="projects" className="space-y-12 border-t border-zinc-800 pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-zinc-800 pb-6">
            <div>
              <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-1">SELECTED BUILD SYSTEMS</span>
              <h2 className="font-hand text-4xl md:text-6xl text-white italic tracking-tighter uppercase font-black">Recent Projects</h2>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentView('projects')}
                className="font-mono text-[10px] uppercase tracking-widest font-bold bg-white text-black hover-invert transition-all flex items-center gap-1.5 px-4 py-2 cursor-pointer shadow-sm"
              >
                BROWSE ALL SCHEMES <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setIsLabNotesOpen(true)}
                className="font-mono text-[10px] uppercase tracking-widest font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5 px-4 py-2 cursor-pointer shadow-sm"
              >
                ALL NOTES <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {recentProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setCurrentView('case-study');
                }}
                className="group flex flex-col rounded-none bg-zinc-950/45 border border-zinc-900 overflow-hidden shadow-2xl cursor-pointer hover:border-zinc-500 transition-all duration-300 relative"
              >
                {/* Image Wrap */}
                <div className="aspect-video border-b border-zinc-900 overflow-hidden relative bg-zinc-900">
                  <img 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-125 brightness-90"
                    referrerPolicy="no-referrer"
                    src={project.imageUrl} 
                  />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="absolute top-3 right-3 font-mono text-[9px] font-bold text-white uppercase bg-black/95 border border-zinc-900 px-2 py-0.5 tracking-wider">
                    MODULE: PROJECT 0{idx + 1}
                  </div>
                </div>
 
                <div className="space-y-4 p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, tIdx) => (
                        <span key={tIdx} className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-900/60 px-2.5 py-1 border border-zinc-850">
                          {t}
                        </span>
                      ))}
                    </div>
 
                    <h3 className="font-hand text-2xl md:text-3xl text-white font-black italic uppercase group-hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5 pt-1.5 leading-snug">
                      {project.title}
                    </h3>
                    
                    <p className="font-mono text-xs text-zinc-400 leading-relaxed mb-6 mt-2 uppercase tracking-wide">
                      {project.description}
                    </p>
                  </div>
 
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-900 mt-auto">
                    {project.codeUrl && (
                      <a 
                        href={project.codeUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono text-[10px] uppercase tracking-widest font-bold text-zinc-450 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Github className="w-4 h-4" /> [ Source ]
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono text-[10px] uppercase tracking-widest font-bold text-zinc-450 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" /> [ Live ]
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProjectId(project.id);
                        setCurrentView('case-study');
                      }}
                      className="font-mono text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-white flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      READ CASE STUDY ➜
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WORK CO-LAB & CALL TO ACTION BANNER */}
        <section className="py-8">
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center space-y-8 py-16 px-8 border border-zinc-800 bg-[#121212] relative overflow-hidden shadow-2xl"
          >
            <div className="absolute -top-10 -right-10 opacity-5 rotate-12">
              <Compass className="w-[180px] h-[180px] text-white" />
            </div>

            <h2 className="font-hand text-4xl md:text-6xl text-white font-black italic uppercase tracking-tighter">Let's Work Together</h2>
            <p className="font-mono text-xs md:text-sm max-w-xl text-zinc-400 leading-relaxed uppercase tracking-wide">
              I'm currently available for full-stack opportunities, code review, and interesting architecture proposals. If you have a blueprint in mind, let's wire it up with clean logic.
            </p>

            <a 
              href="#contact"
              className="relative px-12 py-5 font-hand text-2xl bg-white text-black font-bold uppercase tracking-wider hover-invert transition-all block rounded-none"
            >
              Hire Me
              <div className="absolute -top-3 -right-3 bg-zinc-850 text-white font-mono text-[9px] font-bold px-2.5 py-1 rotate-12 uppercase border border-zinc-700 whitespace-nowrap">
                NOW LIVE
              </div>
            </a>
          </motion.div>
        </section>

        {/* CONCISE GET IN TOUCH FORM SECTION */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start border-t border-zinc-800 pt-16">
          <div className="space-y-6">
            <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">CONN CHANNELS</span>
            <h2 className="font-hand text-4xl md:text-6xl text-white font-black italic uppercase tracking-tighter">Get In Touch</h2>
            <p className="font-mono text-xs md:text-sm text-zinc-400 leading-relaxed uppercase tracking-tighter">
              Have a question or want to discuss a backend scheme/frontend layout? Drop me a line right inside this terminal block and I'll receive it immediately. I usually reply within 24 hours.
            </p>

            <div className="flex flex-col gap-4 font-mono text-xs pt-4">
              <button 
                onClick={copyEmailToClipboard}
                className="flex items-center gap-3 text-white font-bold hover:text-black hover:bg-white transition-all duration-200 cursor-pointer text-left self-start group bg-zinc-950 border border-zinc-800 px-4 py-3 hover:border-white w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{profileDetails.emailAddress}</span>
                {copiedEmail ? (
                  <span className="text-[9px] bg-emerald-950 text-emerald-405 border border-emerald-800 px-2 py-0.5 rounded-none uppercase">Copied!</span>
                ) : (
                  <span className="text-[9px] text-zinc-550 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-auto">(Click to Copy)</span>
                )}
              </button>

              <div className="flex items-center gap-3 text-zinc-300 font-bold bg-zinc-950 border border-zinc-800 px-4 py-3 self-start uppercase tracking-widest text-[11px] w-full sm:w-auto">
                <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>{profileDetails.location}</span>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <motion.form 
            onSubmit={handleFormSubmit}
            className="p-8 bg-[#121212] border border-zinc-800 space-y-6 shadow-2xl"
          >
            <div className="space-y-2">
              <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase block text-zinc-550">
                01 CLIENT NAME
              </label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-[#0D0D0D] border border-zinc-800 px-4 py-3.5 font-mono text-xs text-white uppercase focus:outline-none focus:border-white transition-colors"
                placeholder="PROTAGONIST NAME"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase block text-zinc-550">
                02 RETURN ADDRESS
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-[#0D0D0D] border border-zinc-800 px-4 py-3.5 font-mono text-xs text-white uppercase focus:outline-none focus:border-white transition-colors"
                placeholder="ENTER_EMAIL@DOMAIN.COM"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase block text-zinc-550">
                03 WORK SCOPE CANVAS
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full bg-[#0D0D0D] border border-zinc-800 px-4 py-3.5 font-mono text-xs text-white uppercase focus:outline-none focus:border-white transition-colors"
                placeholder="DESCRIBE BLUEPRINT OBJECTIVES..."
              />
            </div>

            {/* Submission Triggers and Feedback Messages */}
            {formStatus !== "idle" && formFeedback && (
              <div className={`p-4 font-mono text-[11px] border ${
                formStatus === "success" 
                  ? "bg-emerald-950/40 border-emerald-800 text-emerald-400"
                  : formStatus === "error"
                  ? "bg-rose-950/40 border-rose-800 text-rose-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400"
              }`}>
                {formFeedback}
              </div>
            )}

            <button 
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest py-4 hover-invert transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {formStatus === "submitting" ? (
                <>
                  TRANSMITTING BLUEPRINT... <Loader2 className="w-4 h-4 animate-spin text-black" />
                </>
              ) : formStatus === "success" ? (
                <>
                  MESSAGE DISPATCHED! <Check className="w-4 h-4 text-emerald-600 font-bold" />
                </>
              ) : (
                <>
                  SEND CORE DIRECTIVE <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </motion.form>
        </section>
      </motion.div>
    )}

          {/* DEDICATED PROJECTS BOARD SUB-PAGE */}
          {currentView === 'projects' && (
            <motion.div
              key="projects-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-8 space-y-12"
            >
              {/* Header */}
              <div className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <button 
                    onClick={() => setCurrentView('home')}
                    className="font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-1.5 mb-3 group cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
                  </button>
                  <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">// FULL RECONSTRUCTION SCHEMES</span>
                  <h1 className="font-hand text-5xl md:text-7xl text-white font-black italic uppercase tracking-tighter">All Projects</h1>
                </div>
                
                {/* Search / Filters on Desktop */}
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3.5 text-zinc-500 pointer-events-none" />
                    <input 
                      type="text" 
                      placeholder="Search systems..."
                      value={projectSearchQuery}
                      onChange={(e) => setProjectSearchQuery(e.target.value)}
                      className="w-full sm:w-64 pl-9 pr-4 py-3 bg-zinc-950 border border-zinc-900 rounded-none text-xs font-mono text-white placeholder-zinc-650 focus:border-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Tag filters */}
              <div className="flex flex-wrap gap-2">
                {["ALL", "REACT", "NEXT.JS", "TYPESCRIPT", "POSTGRESQL", "REDIS"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setProjectTagFilter(tag)}
                    className={`font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 transition-all border cursor-pointer ${
                      projectTagFilter === tag 
                        ? "bg-white text-black border-white" 
                        : "bg-zinc-950 border-zinc-900 text-zinc-455 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Grid Layout filtered */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentProjects
                  .filter((p) => {
                    const matchQuery = p.title.toLowerCase().includes(projectSearchQuery.toLowerCase()) || 
                                       p.description.toLowerCase().includes(projectSearchQuery.toLowerCase());
                    const matchTag = projectTagFilter === "ALL" || p.tech.some(t => t.toUpperCase() === projectTagFilter);
                    return matchQuery && matchTag;
                  })
                  .map((project) => (
                    <motion.div
                      layout
                      key={project.id}
                      className="group flex flex-col bg-zinc-950/45 border border-zinc-900 overflow-hidden shadow-2xl relative"
                    >
                      <div className="absolute top-0 right-0 font-mono text-[9px] font-semibold text-zinc-500 border-l border-b border-zinc-900 bg-zinc-950/90 px-2 py-0.5 uppercase z-10">
                        {project.tech[0]}
                      </div>
                      
                      {/* Project graphic / image slot */}
                      <div className="aspect-video w-full bg-zinc-900/60 relative overflow-hidden flex items-center justify-center border-b border-zinc-900 group-hover:bg-zinc-850 transition-colors">
                        <Code2 className="w-12 h-12 text-zinc-800 group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block mb-1">STABLE VERSION ROUTE</span>
                          <h3 className="font-hand text-2xl text-white font-black italic uppercase leading-tight tracking-tight">{project.title}</h3>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1 space-y-4">
                        <p className="font-mono text-xs text-zinc-400 leading-relaxed flex-1">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.tech.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="font-mono text-[9px] bg-[#121212] border border-zinc-900 hover:border-zinc-700 hover:text-white px-2 py-0.5 inline-block uppercase text-zinc-455 rounded-none"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-dashed border-zinc-800">
                          <button 
                            onClick={() => {
                              setSelectedProjectId(project.id);
                              setCurrentView('case-study');
                            }}
                            className="font-mono text-[10px] uppercase tracking-widest font-bold text-white hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                          
                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-900"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* DEDICATED CASE STUDY VIEW SUB-PAGE */}
          {currentView === 'case-study' && (
            <motion.div
              key="case-study-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-8 space-y-12"
            >
              {/* Back breadcrumb */}
              <div>
                <button 
                  onClick={() => setCurrentView('projects')}
                  className="font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-1.5 mb-6 group cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Projects View
                </button>
              </div>

              {/* Case study metadata headers */}
              {(() => {
                const projectObj = recentProjects.find(p => p.id === selectedProjectId) || recentProjects[0];
                const activeStudy = caseStudies[selectedProjectId || ""] || caseStudies["project-1"];
                
                return (
                  <div className="space-y-12">
                    {/* Hero area */}
                    <div className="border border-zinc-800 p-8 bg-[#0D0D0D] relative overflow-hidden">
                      <div className="absolute top-0 right-0 font-mono text-[10px] font-semibold border-l border-b border-zinc-800 bg-zinc-950 px-3 py-1 text-zinc-500 uppercase tracking-widest">
                        System Module: {selectedProjectId || "project-1"}
                      </div>
                      
                      <span className="font-mono text-xs text-zinc-550 uppercase tracking-widest block mb-1">DEVOLVED MULTI-NODE CASE SYSTEM REGISTERED ON SITE</span>
                      <h1 className="font-hand text-4xl md:text-6xl text-white font-black italic uppercase leading-none mt-2 select-none">
                        {projectObj?.title}
                      </h1>
                      <p className="font-mono text-xs md:text-sm text-emerald-400 mt-4 leading-relaxed uppercase tracking-wide">
                        // {activeStudy.subtitle}
                      </p>
                    </div>

                    {/* Challenge & Solution Bento Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="p-8 bg-zinc-950 border border-zinc-900 space-y-4">
                        <span className="font-mono text-[10px] bg-red-950 text-red-400 border border-red-900 px-2 py-0.5 inline-block uppercase font-bold">The Challenge Statement</span>
                        <h3 className="font-hand text-3xl text-white font-black italic uppercase">Critical Node Squeeze</h3>
                        <p className="font-mono text-xs md:text-sm text-zinc-400 leading-relaxed uppercase tracking-tight">
                          {activeStudy.challenge}
                        </p>
                      </div>

                      <div className="p-8 bg-zinc-950 border border-zinc-900 space-y-4">
                        <span className="font-mono text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 inline-block uppercase font-bold">The Core Solution Setup</span>
                        <h3 className="font-hand text-3xl text-white font-black italic uppercase">Transactional Framing</h3>
                        <p className="font-mono text-xs md:text-sm text-zinc-400 leading-relaxed uppercase tracking-tight">
                          {activeStudy.solution}
                        </p>
                      </div>
                    </div>

                    {/* Telemetry performance metrics values */}
                    <div className="space-y-4">
                      <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest block">// DYNAMIC TELEMETRY INJECTS (PERFORMANCE METRICS)</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {activeStudy.performanceMetrics.map((stat, sIdx) => (
                          <div key={sIdx} className="p-6 bg-[#121212] border border-zinc-900 flex flex-col justify-between">
                            <span className="font-mono text-[10px] text-zinc-550 uppercase tracking-widest">{stat.label}</span>
                            <div className="font-mono text-3xl font-black text-white my-3 tracking-tighter">{stat.value}</div>
                            <p className="font-mono text-[9px] text-zinc-500 leading-relaxed uppercase">{stat.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schematic Visualization Architecture graph diagram */}
                    <div className="space-y-6">
                      <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest block">// UNDERLYING CORE SYSTEM ARCHITECTURE SCHEMATIC</span>
                      <div className="p-8 bg-[#0B0B0B] border border-zinc-900 rounded-none relative">
                        {/* Connecting background grid paper lines */}
                        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                        
                        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                          {activeStudy.architectureNodes.map((node, nIdx) => (
                            <React.Fragment key={nIdx}>
                              <div className="p-5 bg-black border border-zinc-800 z-10 hover:border-zinc-400 transition-colors">
                                <div className="font-mono text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-1.5 py-0.5 inline-block mb-3.5 uppercase font-bold">
                                  Node 0{nIdx + 1}
                                </div>
                                <h4 className="font-mono text-[11px] font-black text-white uppercase tracking-wider mb-2">{node.label}</h4>
                                <p className="font-mono text-[9px] text-zinc-500 leading-normal uppercase">{node.description}</p>
                              </div>
                              {nIdx < 3 && (
                                <div className="hidden md:flex justify-center items-center pointer-events-none">
                                  <motion.div 
                                    animate={{ x: [-8, 8, -8] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                    className="text-zinc-700 font-mono text-xs uppercase font-black tracking-widest"
                                  >
                                    ====&gt;
                                  </motion.div>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA for blueprints */}
                    <div className="p-8 border border-zinc-850 flex flex-col sm:flex-row justify-between items-center bg-[#151515] gap-4">
                      <div>
                        <h4 className="font-hand text-2xl text-white font-black italic uppercase tracking-tight">Need a setup like this deployed?</h4>
                        <p className="font-mono text-[10px] text-zinc-500 leading-relaxed uppercase mt-1">Get custom infrastructure blueprints compiled for your product container.</p>
                      </div>
                      <button 
                        onClick={() => {
                          setFormData({
                            name: "Guest Architect",
                            email: "",
                            message: `Hi Rizwan, I am very interested in replicating your case study framework: "${projectObj?.title}" system layout on my setup. Please share the pricing or custom blueprint instructions.`
                          });
                          setCurrentView('home');
                          setTimeout(() => {
                            const contactEl = document.getElementById('contact');
                            if (contactEl) {
                              contactEl.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 150);
                        }}
                        className="font-mono text-xs font-bold uppercase tracking-widest bg-white text-black hover-invert px-6 py-3.5 border border-zinc-800 cursor-pointer"
                      >
                        Request Blueprint Replication
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* DEDICATED FIVERR GIG MARKETPLACE SEARCH SUB-PAGE */}
          {currentView === 'fiverr-gig' && (
            <motion.div
              key="fiverr-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-8 space-y-8"
            >
              {/* Fake Fiverr search container */}
              <div className="bg-[#0b0b0b] border border-zinc-900 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 font-mono text-[9px] bg-emerald-950 text-emerald-400 border-l border-b border-emerald-900 px-3 py-1 font-semibold uppercase tracking-widest">
                  SIMULATED MARKETPLACE LOOKUP
                </div>
                
                <h2 className="font-hand text-3xl md:text-5xl text-white font-black italic uppercase tracking-tighter">Fiverr Marketplace Broker</h2>
                <p className="font-mono text-xs text-zinc-550 max-w-2xl mt-2 leading-relaxed uppercase">
                  Fiverr search results index simulator for Pakistani Fullstack Web Developers. In compliance with directives, search terms or suggestions showcase Rizwan's Top Gig packages directly.
                </p>

                {/* Simulated search searchboard */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-3.5 text-zinc-550 pointer-events-none" />
                    <input 
                      type="text"
                      className="w-full bg-zinc-950 border border-zinc-850 px-9 py-3 text-xs font-mono text-white placeholder-zinc-550 focus:border-emerald-600 focus:outline-none"
                      placeholder="Type search terms like 'fivver web devloper' or 'pakistan web developer'..."
                      value={gigSearchQuery}
                      onChange={(e) => {
                        setGigSearchQuery(e.target.value);
                      }}
                    />
                  </div>
                  <button 
                    onClick={() => {
                      if (gigSearchQuery.trim()) {
                        setGigMessageStatus(`Search matched 1 Certified Architect: "${gigSearchQuery}"`);
                      }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-widest px-6 py-3.5 cursor-pointer"
                  >
                    Search Marketplace
                  </button>
                </div>

                {/* Popular chips */}
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <span className="font-mono text-[9px] text-zinc-600 uppercase font-black">Suggested query chips:</span>
                  {["fivver web devloper", "web developer", "system architect", "pakistan dev"].map((chip) => (
                    <button 
                      key={chip}
                      onClick={() => {
                        setGigSearchQuery(chip);
                        setGigMessageStatus(`Matched top queries for "${chip}"`);
                      }}
                      className="font-mono text-[9px] bg-zinc-950 border border-zinc-850 hover:border-emerald-700 hover:text-emerald-400 font-bold uppercase px-2 py-1 text-zinc-450 cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status report */}
              {gigSearchQuery && (
                <div className="p-3 bg-zinc-950 border border-dashed border-zinc-850 text-center font-mono text-[10px] text-emerald-400 uppercase font-bold">
                  ● Search System Matched: Rizwan's Top Certified Level-2 Gig listed below!
                </div>
              )}

              {/* Gig Card detail list */}
              {fiverrGigs.map((gig) => (
                <div key={gig.id} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Left Column: Gig summary and imagery */}
                  <div className="lg:col-span-2 space-y-6 bg-[#0E0E0E] p-8 border border-zinc-900">
                    <div className="flex gap-3 items-center mb-1">
                      <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center font-bold text-white uppercase tracking-tight text-sm border border-zinc-700">RD</div>
                      <div>
                        <h4 className="font-mono text-xs font-black text-white uppercase">{gig.sellerName}</h4>
                        <div className="flex items-center gap-1.5 text-zinc-550 font-mono text-[10px] uppercase">
                          <span className="text-emerald-400 font-bold">{gig.sellerLevel}</span>
                          <span>|</span>
                          <span className="flex items-center gap-0.5 text-amber-400"><Star className="w-3 h-3 fill-amber-400" /> {gig.averageRating} ({gig.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <h1 className="font-hand text-3xl md:text-4xl text-white font-black italic uppercase leading-tight">
                      {gig.title}
                    </h1>

                    {/* Simple mockup showcase */}
                    <div className="aspect-video w-full bg-zinc-950 border border-zinc-900 flex items-center justify-center relative">
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
                      <div className="p-8 text-center space-y-4 max-w-sm relative pointer-events-none">
                        <Terminal className="w-12 h-12 text-emerald-550 mx-auto" strokeWidth={1} />
                        <h5 className="font-hand text-2xl text-white font-black italic uppercase">React &amp; NextJS Enterprise Systems</h5>
                        <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest leading-relaxed">Clean architecture layouts built beautifully with absolute data normalization.</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] text-zinc-550 uppercase font-black block">// GIG RETRIEVAL INDEX TAGS</span>
                      <div className="flex flex-wrap gap-2">
                        {gig.tags.map((tag) => (
                          <span key={tag} className="font-mono text-[9px] font-bold bg-zinc-900 border border-zinc-850 px-2 py-0.5 text-zinc-400 uppercase block">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing Package boards */}
                  <div className="bg-zinc-950 border border-zinc-900 flex flex-col">
                    {/* Package Tab controls */}
                    <div className="grid grid-cols-3 border-b border-zinc-900 font-mono text-[9px] font-black text-center uppercase tracking-widest">
                      {["basic", "standard", "premium"].map((tier) => (
                        <button
                          key={tier}
                          onClick={() => setSelectedGigPackageTier(tier as any)}
                          className={`py-4 border-r border-zinc-900 last:border-r-0 transition-colors cursor-pointer ${
                            selectedGigPackageTier === tier 
                              ? "bg-white text-black font-black" 
                              : "bg-zinc-900/60 text-zinc-450 hover:bg-zinc-900 hover:text-white"
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>

                    {/* Active package contents */}
                    {(() => {
                      const pack = gig.packages[selectedGigPackageTier];
                      return (
                        <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                              <h3 className="font-hand text-3xl text-white font-semibold italic uppercase">{pack.name}</h3>
                              <span className="font-mono text-2xl font-black text-emerald-400">${pack.price}</span>
                            </div>

                            <p className="font-mono text-[10px] text-zinc-400 leading-relaxed uppercase">
                              {pack.description}
                            </p>

                            <div className="font-mono text-[10px] text-zinc-500 border-b border-zinc-900 pb-2 flex items-center gap-2 uppercase tracking-wide">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {pack.deliveryTime}
                            </div>

                            <div className="space-y-2">
                              <span className="font-mono text-[9px] text-zinc-550 uppercase font-black block">Tier Features:</span>
                              <div className="space-y-1.5 font-mono text-[10px] uppercase text-zinc-400">
                                {pack.features.map((feat, fId) => (
                                  <div key={fId} className="flex items-center gap-2">
                                    <span className="text-emerald-500 font-bold">•</span>
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="pt-6">
                            <button
                              onClick={() => {
                                setFormData({
                                  name: "Fiverr Client",
                                  email: "",
                                  message: `Dear Rizwan, I would like to order your custom Fiverr package: "${pack.name}" ($${pack.price}) for my web developer project.`
                                });
                                setCurrentView('home');
                                setTimeout(() => {
                                  const contactEl = document.getElementById('contact');
                                  if (contactEl) {
                                    contactEl.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }, 150);
                              }}
                              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-widest py-3.5 hover-invert transition-all text-center cursor-pointer"
                            >
                              Order Package [${pack.price}]
                            </button>
                            <p className="text-[8px] text-zinc-550 font-mono text-center mt-2.5 uppercase tracking-tighter leading-snug">
                              PRESSING BUTTON TRANSPORTS YOU TO THE CONNECT CHANNELS ROUTER AT THE BOTTOM WITH AUTOFILLED FORM DATA.
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* DEDICATED PRIVACY POLICY SUB-PAGE */}
          {currentView === 'privacy' && (
            <motion.div
              key="privacy-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-12 max-w-3xl mx-auto space-y-8"
            >
              <button 
                onClick={() => setCurrentView('home')}
                className="font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-1.5 mb-6 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
              </button>
              
              <div className="border-b border-zinc-900 pb-4">
                <span className="font-mono text-[9px] bg-zinc-950 border border-zinc-900 px-2.5 py-1 text-zinc-450 uppercase tracking-widest">LEGAL SCHEMA</span>
                <h1 className="font-hand text-4xl md:text-5xl text-white font-black italic uppercase tracking-tight mt-3">Privacy Policy</h1>
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-1">LAST COMPILE STATE: JUNE 8, 2026</p>
              </div>

              <div className="space-y-6 text-zinc-400 text-xs md:text-sm leading-relaxed uppercase tracking-tighter font-mono">
                <h3 className="text-white text-lg font-bold border-l-2 border-white pl-3">// 1. Information We Sync</h3>
                <p>
                  No personal telemetry details or database tables are stored or leaked when visiting Rizwan's blueprint terminal. Any client data specified in the "Directives Block" or contract contact portal remains sandboxed in transient memory and is routed explicitly via standard TLS transport protocols.
                </p>

                <h3 className="text-white text-lg font-bold border-l-2 border-white pl-3">// 2. Cryptographic Storage</h3>
                <p>
                  We compile application codes utilizing safe environment setups. Real client identifiers, API tokens, or server-side parameters are insulated using double RSA checking nodes and cached safely in isolated Redis instances.
                </p>

                <h3 className="text-white text-lg font-bold border-l-2 border-white pl-3">// 3. Telemetry Log Retention</h3>
                <p>
                  We compile systemic operations up to 30 days. No persistent user tracking cookies, tracking coordinate vectors, or metadata loops are collected. Your browser belongs entirely to you.
                </p>

                <h3 className="text-white text-lg font-bold border-l-2 border-white pl-3">// 4. Client Node Inquiries</h3>
                <p>
                  To review or erase message transits cached in the blueprint channel, establish a contact directive request to hey@rizwan.one at any moment.
                </p>
              </div>
            </motion.div>
          )}

          {/* DEDICATED TERMS & CONDITIONS SUB-PAGE */}
          {currentView === 'terms' && (
            <motion.div
              key="terms-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-12 max-w-3xl mx-auto space-y-8"
            >
              <button 
                onClick={() => setCurrentView('home')}
                className="font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-1.5 mb-6 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
              </button>
              
              <div className="border-b border-zinc-900 pb-4">
                <span className="font-mono text-[9px] bg-zinc-950 border border-zinc-900 px-2.5 py-1 text-zinc-455 uppercase tracking-widest">TERMS BLUEPRINT</span>
                <h1 className="font-hand text-4xl md:text-5xl text-white font-black italic uppercase tracking-tight mt-3">Terms &amp; Conditions</h1>
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-1">LAST COMPILE STATE: JUNE 8, 2026</p>
              </div>

              <div className="space-y-6 text-zinc-400 text-xs md:text-sm leading-relaxed uppercase tracking-tighter font-mono">
                <h3 className="text-white text-lg font-bold border-l-2 border-white pl-3">// 1. Agreement of Logic</h3>
                <p>
                  By accessing Rizwan's portfolio codes, you contractually assert that clean scalable architecture is a core standard. Overengineered workflows, unindexed query lines, or messy files are forbidden on this network domain.
                </p>

                <h3 className="text-white text-lg font-bold border-l-2 border-white pl-3">// 2. System Replication Permissions</h3>
                <p>
                  Unless specified otherwise, structural code snippets, UI designs, and bento layouts displayed in these Case Studies are licensed under permissive sandbox configurations. Commercial use is permitted, subject to citation of the central node.
                </p>

                <h3 className="text-white text-lg font-bold border-l-2 border-white pl-3">// 3. Disclaimer of Transit</h3>
                <p>
                  This system operates under "As-Is" and "As-Available" development protocols. Real email processing is simulated using Resend or fallback sandboxes depending on environment client keys available.
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER AREA */}
      <footer className="bg-transparent border-t border-zinc-900 mt-20 w-full animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-10 max-w-7xl mx-auto">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="font-hand text-2xl text-white font-black italic uppercase tracking-tighter">
              {profileDetails.handle}
            </div>
            <p className="font-mono text-[10px] text-zinc-500 mt-2.5 uppercase tracking-tighter">
              © 2026 {profileDetails.handle} • Handcrafted with TypeScript, Tailwind v4, &amp; Artistic Flair Canvas.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-widest font-bold text-zinc-455 items-center justify-center md:justify-end">
            <button 
              onClick={() => setCurrentView('privacy')} 
              className="hover:text-white transition-colors cursor-pointer text-zinc-500"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setCurrentView('terms')} 
              className="hover:text-white transition-colors cursor-pointer text-zinc-500"
            >
              Terms &amp; Conditions
            </button>
            <button 
              onClick={() => setCurrentView('fiverr-gig')} 
              className="hover:text-emerald-300 text-emerald-400 transition-colors cursor-pointer font-black"
            >
              Fiverr Gig
            </button>
            <span className="text-zinc-800 hidden sm:inline">|</span>
            <a href="https://github.com/rizwanwebdev" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/rizwan" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <button 
              onClick={() => setIsLabNotesOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Lab Notes
            </button>
          </div>
        </div>
      </footer>

      {/* LAB NOTES DRAWER WINDOW */}
      <AnimatePresence>
        {isLabNotesOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0D0D0D] border border-zinc-800 max-w-lg w-full p-8 shadow-2xl"
            >
              <div className="flex justify-between items-start border-b border-dashed border-zinc-800 pb-5 mb-6">
                <div>
                  <span className="font-mono text-[9px] font-bold text-zinc-550 uppercase bg-zinc-900 border border-zinc-850 px-2 py-1">
                    SYSTEM R&amp;D REGISTRY
                  </span>
                  <h3 className="font-hand text-3xl mt-3 select-none text-white font-black italic uppercase">All Lab Notes</h3>
                </div>
                <button 
                  onClick={() => setIsLabNotesOpen(false)}
                  className="p-1 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white rounded-none cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {labNotes.map((note, index) => (
                  <div 
                    key={index} 
                    className="p-5 bg-[#121212] border border-zinc-900 rounded-none hover:bg-zinc-900/60 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center font-mono text-[9px] text-zinc-500 font-semibold mb-1 uppercase tracking-widest">
                      <span>{note.date}</span>
                      <span className="text-white border border-zinc-800 px-1.5 bg-black">{note.tech}</span>
                    </div>
                    <h4 className="font-hand text-xl text-white font-black italic uppercase leading-snug hover:underline tracking-tight">
                      {note.title}
                    </h4>
                    <p className="font-mono text-[9px] text-zinc-600 text-right mt-2 uppercase tracking-wide">{note.readTime}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-dashed border-zinc-800 flex justify-between items-center font-mono text-[10px] text-zinc-500 uppercase font-semibold">
                <span>Total 3 blueprint assets published</span>
                <button 
                  onClick={() => setIsLabNotesOpen(false)}
                  className="font-bold text-white hover:underline cursor-pointer"
                >
                  Close Registry [X]
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
