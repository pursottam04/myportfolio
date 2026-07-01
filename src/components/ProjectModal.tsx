/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Project } from "../types";
import { X, Cpu, Settings, PenTool, Shield, CheckCircle2, ChevronRight, LayoutGrid, Video, FileText, Camera } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import LabVideoPlayer from "./LabVideoPlayer";
import GripperTechnicalDrawing from "./GripperTechnicalDrawing";
import GripperPhysicalPhoto from "./GripperPhysicalPhoto";
import ChristmasWindowPhysical from "./ChristmasWindowPhysical";
import ChristmasWindowSimulation from "./ChristmasWindowSimulation";
import PickAndPlaceCellPhoto from "./PickAndPlaceCellPhoto";
import WeldingRobotPhoto from "./WeldingRobotPhoto";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mediaTab, setMediaTab] = useState<string>("video");

  // Lock body scroll when modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      if (project.id === "christmas-window") {
        setMediaTab("scene1");
      } else {
        setMediaTab("video"); // Reset to default video feed on new project
      }
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
          className={`relative w-full ${
            project.id === "custom-gripper" && mediaTab === "drawing"
              ? "max-w-6xl"
              : "max-w-5xl"
          } bg-white border border-industrial-silver/40 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row my-8`}
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

          {/* Left Column: Media & Specifications Grid */}
          <div className={`${
            project.id === "custom-gripper" && mediaTab === "drawing"
              ? "w-full md:w-full"
              : "w-full md:w-5/12"
          } bg-deep-charcoal border-b md:border-b-0 md:border-r border-industrial-silver/20 flex flex-col relative`}>
            <div className="absolute inset-0 grid-blueprint-dark opacity-10 pointer-events-none" />
            
            {/* Project Sub-tabs selector for the Custom Gripper project */}
            {project.id === "custom-gripper" && (
              <div className="flex border-b border-white/10 bg-black/40 text-[9px] font-mono tracking-widest relative z-20">
                <button
                  onClick={() => setMediaTab("video")}
                  className={`flex-1 py-3 text-center uppercase border-r border-white/10 transition-colors ${
                    mediaTab === "video" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  🎥 LAB FEED
                </button>
                <button
                  onClick={() => setMediaTab("drawing")}
                  className={`flex-1 py-3 text-center uppercase border-r border-white/10 transition-colors ${
                    mediaTab === "drawing" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  📐 SOLIDWORKS CAD
                </button>
                <button
                  onClick={() => setMediaTab("photo")}
                  className={`flex-1 py-3 text-center uppercase transition-colors ${
                    mediaTab === "photo" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  📸 PHYSICAL RECO
                </button>
              </div>
            )}

            {/* Project Sub-tabs selector for the Automated Packing project */}
            {project.id === "automated-packing" && (
              <div className="flex border-b border-white/10 bg-black/40 text-[9px] font-mono tracking-widest relative z-20">
                <button
                  onClick={() => setMediaTab("video")}
                  className={`flex-1 py-3 text-center uppercase border-r border-white/10 transition-colors ${
                    mediaTab === "video" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  🎥 LAB FEED
                </button>
                <button
                  onClick={() => setMediaTab("photo")}
                  className={`flex-1 py-3 text-center uppercase transition-colors ${
                    mediaTab === "photo" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  📸 SYSTEM PHOTO
                </button>
              </div>
            )}

            {/* Project Sub-tabs selector for the Automated Pick-and-Place project */}
            {project.id === "pick-and-place" && (
              <div className="flex border-b border-white/10 bg-black/40 text-[9px] font-mono tracking-widest relative z-20">
                <button
                  onClick={() => setMediaTab("video")}
                  className={`flex-1 py-3 text-center uppercase border-r border-white/10 transition-colors ${
                    mediaTab === "video" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  🎥 LAB FEED
                </button>
                <button
                  onClick={() => setMediaTab("photo")}
                  className={`flex-1 py-3 text-center uppercase transition-colors ${
                    mediaTab === "photo" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  📸 CELL PHOTO
                </button>
              </div>
            )}

            {/* Project Sub-tabs selector for the Welding Robot project */}
            {project.id === "welding-robot" && (
              <div className="flex border-b border-white/10 bg-black/40 text-[9px] font-mono tracking-widest relative z-20">
                <button
                  onClick={() => setMediaTab("video")}
                  className={`flex-1 py-3 text-center uppercase border-r border-white/10 transition-colors ${
                    mediaTab === "video" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  🎥 WELDING VIDEO
                </button>
                <button
                  onClick={() => setMediaTab("photo")}
                  className={`flex-1 py-3 text-center uppercase transition-colors ${
                    mediaTab === "photo" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  📸 WELDING PHOTO
                </button>
              </div>
            )}

            {/* Project Sub-tabs selector for the Christmas Window Automation project */}
            {project.id === "christmas-window" && (
              <div className="flex border-b border-white/10 bg-black/40 text-[9px] font-mono tracking-widest relative z-20">
                <button
                  onClick={() => setMediaTab("scene1")}
                  className={`flex-1 py-3 text-center uppercase border-r border-white/10 transition-colors ${
                    mediaTab === "scene1" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  🎅 SLEIGH WINDOW
                </button>
                <button
                  onClick={() => setMediaTab("scene2")}
                  className={`flex-1 py-3 text-center uppercase border-r border-white/10 transition-colors ${
                    mediaTab === "scene2" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  📺 SIMULATION CELL
                </button>
                <button
                  onClick={() => setMediaTab("video")}
                  className={`flex-1 py-3 text-center uppercase transition-colors ${
                    mediaTab === "video" ? "bg-safety-orange text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  🎥 LAB FEED
                </button>
              </div>
            )}

            {/* Primary Project Image/Media container */}
            <div className="relative w-full overflow-hidden">
              {project.id === "custom-gripper" ? (
                <div className="w-full">
                  {mediaTab === "video" && <LabVideoPlayer projectId="custom-gripper" />}
                  {mediaTab === "drawing" && <GripperTechnicalDrawing />}
                  {mediaTab === "photo" && <GripperPhysicalPhoto />}
                </div>
              ) : project.id === "christmas-window" ? (
                <div className="w-full">
                  {mediaTab === "scene1" && <ChristmasWindowPhysical />}
                  {mediaTab === "scene2" && <ChristmasWindowSimulation />}
                  {mediaTab === "video" && <LabVideoPlayer projectId="christmas-window" />}
                </div>
              ) : project.id === "automated-packing" ? (
                <div className="w-full">
                  {mediaTab === "video" && <LabVideoPlayer projectId="automated-packing" />}
                  {mediaTab === "photo" && (
                    <div className="relative w-full aspect-video md:h-[280px] overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-transparent to-transparent opacity-85" />
                    </div>
                  )}
                </div>
              ) : project.id === "pick-and-place" ? (
                <div className="w-full">
                  {mediaTab === "video" && <LabVideoPlayer projectId="pick-and-place" />}
                  {mediaTab === "photo" && <PickAndPlaceCellPhoto />}
                </div>
              ) : project.id === "welding-robot" ? (
                <div className="w-full">
                  {mediaTab === "video" && <LabVideoPlayer projectId="welding-robot" />}
                  {mediaTab === "photo" && <WeldingRobotPhoto />}
                </div>
              ) : (
                <div className="relative w-full aspect-video md:h-[280px] overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-transparent to-transparent opacity-85" />
                </div>
              )}
            </div>

            {/* Specifications Matrix */}
            {!(project.id === "custom-gripper" && mediaTab === "drawing") && (
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-xs font-bold text-white tracking-[0.2em] uppercase mb-4 pb-2 border-b border-white/15">
                    SYSTEM PARAMETERS
                  </h4>
                  <div className="space-y-4">
                    {project.specifications.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-center text-xs">
                        <span className="font-mono text-white/50 uppercase tracking-wider">{spec.label}</span>
                        <span className="font-mono text-white text-right font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 hidden md:flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-safety-orange" />
                  <span className="font-mono text-[9px] text-white/40 tracking-widest">PKS // SYS_VER_1.0_APPROVED</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Detailed System Reports */}
          {!(project.id === "custom-gripper" && mediaTab === "drawing") && (
            <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-[600px]">
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
                <div className="mb-8">
                  <h4 className="font-display text-sm font-bold text-jet-black tracking-widest uppercase flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-green-500" />
                    THE MECHATRONICS SOLUTION
                  </h4>
                  <p className="text-xs sm:text-sm text-dark-slate font-sans leading-relaxed font-light">
                    {project.solution}
                  </p>
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
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
