/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Project } from "../types";
import { ArrowRight, Maximize2 } from "lucide-react";
import { motion } from "motion/react";
import GripperCoverPreview from "./GripperCoverPreview";
import ChristmasWindowCover from "./ChristmasWindowCover";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <div
      onClick={() => onOpen(project)}
      className="group cursor-pointer border border-industrial-silver/30 bg-white overflow-hidden relative flex flex-col justify-between h-[380px] hover:border-jet-black transition-all duration-500 shadow-sm"
    >
      {/* Visual background image container */}
      <div className="relative w-full h-[60%] overflow-hidden bg-deep-charcoal border-b border-industrial-silver/20">
        {project.id === "custom-gripper" ? (
          <div className="w-full h-full grayscale contrast-110 saturate-0 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:saturate-100 group-hover:scale-105">
            <GripperCoverPreview />
          </div>
        ) : project.id === "christmas-window" ? (
          <div className="w-full h-full grayscale contrast-110 saturate-0 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:saturate-100 group-hover:scale-105">
            <ChristmasWindowCover />
          </div>
        ) : (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-110 saturate-0 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:saturate-100 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
        {/* Hover technical overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-jet-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-45 transition-opacity duration-500" />
        
        {/* Dynamic focus overlay */}
        <div className="absolute inset-0 grid-blueprint opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

        {/* Hover technical spec line */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-white/60 tracking-wider bg-black/50 px-2 py-0.5 border border-white/10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-1.5 h-1.5 bg-safety-orange animate-ping rounded-full" />
          <span>ACTIVE // SYS_ENG</span>
        </div>

        {/* Floating maximize indicator */}
        <div className="absolute bottom-4 right-4 p-2 bg-white/10 border border-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Maximize2 className="w-4 h-4" />
        </div>
      </div>

      {/* Text Info Area */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Category Tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-safety-orange rounded-full" />
            <span className="font-mono text-[10px] text-safety-orange font-bold tracking-[0.2em] uppercase">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display font-extrabold text-2xl text-jet-black leading-tight tracking-wide group-hover:text-safety-orange transition-colors duration-300">
            {project.title.toUpperCase()}
          </h3>

          {/* Brief Summary */}
          <p className="text-xs text-dark-slate font-sans mt-2 line-clamp-2 leading-relaxed font-light">
            {project.summary}
          </p>
        </div>

        {/* Interaction trigger row */}
        <div className="mt-4 pt-4 border-t border-industrial-silver/10 flex items-center justify-between">
          <span className="font-mono text-[9px] text-dark-slate/40 tracking-widest">{project.period}</span>
          <div className="flex items-center gap-1 font-display font-bold text-xs tracking-widest text-jet-black group-hover:text-safety-orange transition-colors">
            <span>VIEW SYSTEM DATA</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
