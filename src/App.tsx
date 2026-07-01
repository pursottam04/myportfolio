/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import Experience from "./components/Experience";
import ResumeModal from "./components/ResumeModal";
import Footer from "./components/Footer";
import { PROJECTS } from "./data";
import { Project } from "./types";
import { Grid, Layers, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "AUTOMATION", "CAD DESIGN", "ROBOTICS", "EMBEDDED SYSTEMS"];

  const filteredProjects = selectedCategory === "ALL"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white relative text-dark-slate antialiased">
      {/* Structural vertical guides on outer margins for desktop screens */}
      <div className="fixed top-0 bottom-0 left-6 w-[1px] bg-industrial-silver/10 pointer-events-none z-30 hidden lg:block" />
      <div className="fixed top-0 bottom-0 right-6 w-[1px] bg-industrial-silver/10 pointer-events-none z-30 hidden lg:block" />

      {/* Header */}
      <Header onOpenResume={() => setIsResumeOpen(true)} />

      {/* Hero Landing */}
      <Hero onOpenResume={() => setIsResumeOpen(true)} />

      {/* About Section */}
      <About />

      {/* Skills Matrix */}
      <Skills />

      {/* Projects Showcase section */}
      <section id="projects" className="py-24 bg-white border-b border-industrial-silver/20 relative grid-blueprint">
        {/* Absolute Coordinate Marker */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-dark-slate/30 tracking-widest hidden md:block">
          PRJ_GRID // FILTER_INTERFACES // DRAWING_REFS
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[1.5px] w-6 bg-safety-orange" />
              <span className="font-mono text-xs tracking-widest text-safety-orange font-bold uppercase">SEC_03 // PORTFOLIO GRID</span>
              <span className="h-[1.5px] w-6 bg-safety-orange" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-jet-black mb-4">
              ENGINEERED SOLUTIONS
            </h2>
            <p className="max-w-2xl mx-auto text-dark-slate text-sm font-light tracking-wide leading-relaxed">
              A curated selection of academic, laboratory, and theoretical projects showcasing mechatronic systems integration.
            </p>
          </div>

          {/* Filtering Layout Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border-b border-industrial-silver/20 pb-6">
            {/* Left coordinate status info */}
            <div className="flex items-center gap-2 font-mono text-xs text-dark-slate/60">
              <Filter className="w-4 h-4 text-safety-orange" />
              <span className="font-bold text-jet-black uppercase">ACTIVE_FILTERS:</span>
              <span className="bg-industrial-silver/20 px-2 py-0.5 font-semibold text-jet-black uppercase">
                {selectedCategory}
              </span>
            </div>

            {/* Inline Filter Links */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-display font-bold tracking-widest transition-all duration-300 border ${
                    selectedCategory === cat
                      ? "bg-jet-black border-jet-black text-white"
                      : "border-industrial-silver/40 text-dark-slate/70 hover:border-jet-black hover:text-jet-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Projects Grid */}
          <div className="min-h-[400px]">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard
                      project={project}
                      onOpen={(p) => setActiveProject(p)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Pathway Section */}
      <Experience />

      {/* Footer Contact & References Section */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Systems Modals */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
