/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { Project } from "../types";
import { X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-jet-black/85 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-5xl bg-white border border-industrial-silver/40 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row my-8"
        >
          {/* Engineering Borders and crosshairs */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-safety-orange z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-safety-orange z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-safety-orange z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-safety-orange z-20 pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-jet-black hover:bg-safety-orange text-white hover:text-white transition-colors duration-300 z-30"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Media Only (Static Image and HTML5 Video Loop) */}
          <div className="w-full md:w-5/12 bg-deep-charcoal border-b md:border-b-0 md:border-r border-industrial-silver/20 flex flex-col relative overflow-hidden justify-center">
            <div className="absolute inset-0 grid-blueprint-dark opacity-10 pointer-events-none" />
            
            {/* 1. Static Image Item */}
            <div className="relative w-full aspect-video overflow-hidden border-b border-white/10 group">
              <img
                src={project.imageUrl}
                alt={`${project.title} Static View`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-jet-black/85 border border-white/10 px-2.5 py-1 text-[9px] font-mono tracking-widest text-white uppercase rounded-sm">
                STATIC VIEW
              </div>
            </div>

            {/* 2. Video Element Item with controls */}
            <div className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center">
              <video
                src={project.videoUrl}
                controls
                muted
                loop
                playsInline
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-jet-black/85 border border-white/10 px-2.5 py-1 text-[9px] font-mono tracking-widest text-white uppercase pointer-events-none rounded-sm">
                LAB FEED VIDEO
              </div>
            </div>
          </div>

          {/* Right Column: Detailed System Reports */}
          <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[640px]">
            <div>
              {/* Category & Date Header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs text-safety-orange font-bold tracking-widest uppercase bg-safety-orange/10 px-2 py-0.5 border border-safety-orange/20">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-dark-slate/50">|</span>
                <span className="font-mono text-xs text-dark-slate/70 font-semibold">{project.period}</span>
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-jet-black mb-6 tracking-tight">
                {project.title.toUpperCase()}
              </h3>

              {/* Problem Statement Block */}
              <div className="mb-6">
                <h4 className="font-display text-sm font-bold text-jet-black tracking-widest uppercase flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-red-500" />
                  THE PROBLEM
                </h4>
                <p className="text-xs sm:text-sm text-dark-slate font-sans leading-relaxed font-light">
                  {project.problem}
                </p>
              </div>

              {/* Mechatronics Solution Block */}
              <div className="mb-6">
                <h4 className="font-display text-sm font-bold text-jet-black tracking-widest uppercase flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-green-500" />
                  THE MECHATRONICS SOLUTION
                </h4>
                <p className="text-xs sm:text-sm text-dark-slate font-sans leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>

              {/* Specifications Matrix */}
              <div className="mb-6">
                <h4 className="font-display text-xs font-bold text-jet-black tracking-[0.2em] uppercase mb-3 pb-1 border-b border-industrial-silver/20">
                  SYSTEM PARAMETERS
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-slate-50 p-4 border border-industrial-silver/10 rounded-sm font-mono text-xs">
                  {project.specifications.map((spec) => (
                    <div key={spec.label} className="flex justify-between items-center py-1 border-b border-industrial-silver/5 last:border-0 col-span-2 sm:col-span-1">
                      <span className="text-dark-slate/60 uppercase text-[9px] tracking-wider">{spec.label}</span>
                      <span className="text-jet-black font-semibold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Grid */}
              <div className="mb-6">
                <h4 className="font-display text-xs font-bold text-jet-black tracking-[0.2em] uppercase mb-3 pb-1 border-b border-industrial-silver/20">
                  IMPLEMENTED TECHNOLOGIES & CONCEPTS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.technologies.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-safety-orange flex-shrink-0" />
                      <span className="font-mono font-medium text-dark-slate">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions info */}
            <div className="pt-6 border-t border-industrial-silver/15 flex flex-wrap items-center justify-between gap-4 mt-8">
              <div className="font-mono text-[10px] text-dark-slate/40 flex items-center gap-2">
                <span>PROJECT_REF_ID:</span>
                <span className="font-bold text-jet-black">{project.id.toUpperCase()}_04-FI</span>
              </div>
              
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-jet-black text-white hover:bg-safety-orange font-display font-bold text-xs tracking-widest transition-colors duration-300"
              >
                RETURN TO GRID
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
