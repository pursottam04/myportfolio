/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { X, Printer, Download, Mail, Phone, MapPin, Link as LinkIcon, Briefcase, GraduationCap, FileText } from "lucide-react";
import { motion } from "motion/react";
import { REFERENCES, SKILL_CATEGORIES, EXPERIENCE } from "../data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Lock body scroll when resume viewer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-deep-charcoal overflow-y-auto">
      {/* Top action bar - hidden during print */}
      <div className="bg-jet-black border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-10 print:hidden">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-safety-orange" />
          <span className="font-display font-bold text-white tracking-widest text-sm uppercase">
            PKS_RESUME_ENGINE_V2.0.pdf
          </span>
          <span className="text-[10px] font-mono bg-white/10 text-white/60 px-2 py-0.5 uppercase tracking-wider hidden sm:inline">
            SYSTEM_ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-safety-orange text-white text-xs font-display font-bold tracking-widest hover:bg-opacity-95 active:scale-95 transition-all duration-300 shadow"
          >
            <Printer className="w-4 h-4" />
            PRINT / SAVE AS PDF
          </button>
          
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-red-600 text-white transition-colors duration-300"
            aria-label="Close CV viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Document Frame */}
      <div className="flex-grow p-4 md:p-12 flex justify-center items-start print:p-0 print:bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[850px] bg-white border border-industrial-silver/40 shadow-2xl p-6 sm:p-12 text-jet-black font-sans relative print:border-none print:shadow-none print:p-0"
        >
          {/* Engineering blueprint coordinates (visible on screen, hidden on print) */}
          <div className="absolute top-4 right-4 font-mono text-[8px] text-dark-slate/40 tracking-widest print:hidden">
            CV_ENGINE_OUTPUT_PRINTER_READY
          </div>

          {/* PRINT-ONLY HEADER INSTRUCTIONS (hidden on screen, visible on print) */}
          <div className="hidden print:block text-[9px] font-mono text-center text-dark-slate/50 pb-4 border-b border-industrial-silver/20 mb-8">
            PUR_SHA_PORTFOLIO_CV // PORTFOLIO: PURSOTTA.PORTFOLIO.FI // PRINTED ON: 2026
          </div>

          {/* ================= HEADER SECTION ================= */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-jet-black pb-6 mb-8 gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-jet-black leading-none mb-1">
                PURSOTTAM KUMAR SHAH
              </h1>
              <span className="font-mono text-xs text-safety-orange font-bold tracking-widest uppercase">
                MECHATRONICS ENGINEERING STUDENT (3RD YEAR)
              </span>
              <p className="text-xs text-dark-slate mt-2 max-w-lg font-light leading-relaxed">
                Motivated engineering student with practical laboratory experience in mechanical modeling,
                electronic circuitry, and robot automation. Active seeking entry roles or summer positions.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-dark-slate font-mono bg-industrial-silver/10 p-4 border border-industrial-silver/30 w-full md:w-auto md:min-w-[220px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-safety-orange" />
                <span>Pori, Finland</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-safety-orange" />
                <a href="tel:+358453248860" className="hover:underline">+358 45 324 8860</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-safety-orange" />
                <a href="mailto:pursotta@gmail.com" className="hover:underline">pursotta@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <LinkIcon className="w-3.5 h-3.5 text-safety-orange" />
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn Profile</a>
              </div>
            </div>
          </div>

          {/* ================= BIOGRAPHY / PROFILE ================= */}
          <div className="mb-8">
            <h2 className="font-display text-sm font-bold tracking-[0.25em] text-jet-black border-b border-jet-black/20 pb-1 mb-3 uppercase">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-dark-slate font-light leading-relaxed">
              Motivated Mechatronics Engineering student with hands-on experience in mechanical systems, electrical engineering fundamentals, 
              robotics, and machine vision. Demonstrated expertise in designing and simulating complex mechanical components, 
              developing custom pneumatic grippers, and building automated conveyor packaging systems in laboratory environments. 
              Extremely reliable, punctuate, and deeply integrated into Finnish workplace practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* LEFT AREA: Education & Experience */}
            <div className="col-span-1 md:col-span-8 space-y-8">
              
              {/* EDUCATION */}
              <div>
                <h2 className="font-display text-sm font-bold tracking-[0.25em] text-jet-black border-b border-jet-black/20 pb-1 mb-4 uppercase">
                  EDUCATION
                </h2>
                <div className="relative pl-4 border-l border-safety-orange">
                  <div className="absolute top-0.5 left-[-4.5px] w-2.5 h-2.5 bg-safety-orange rounded-full" />
                  <div className="flex justify-between items-start mb-1 text-xs sm:text-sm">
                    <h3 className="font-sans font-bold text-jet-black">
                      Bachelor of Engineering – Mechatronics Engineering (3rd Year)
                    </h3>
                    <span className="font-mono text-[11px] text-dark-slate font-semibold bg-industrial-silver/20 px-2 py-0.5 ml-2">
                      ONGOING
                    </span>
                  </div>
                  <p className="text-xs text-dark-slate font-medium">Satakunta University of Applied Sciences (SAMK), Finland</p>
                  <p className="text-xs text-dark-slate/75 font-mono mt-1">Expected Graduation: December 2026 // Ongoing Studies</p>
                </div>
              </div>

              {/* RELEVANT ACADEMIC PROJECTS */}
              <div>
                <h2 className="font-display text-sm font-bold tracking-[0.25em] text-jet-black border-b border-jet-black/20 pb-1 mb-4 uppercase">
                  ACADEMIC & LABORATORY PROJECTS
                </h2>
                <div className="space-y-4">
                  <div className="pl-4 border-l border-industrial-silver">
                    <h3 className="text-xs sm:text-sm font-bold text-jet-black">Automated Packing Conveyor Integration (Lallin Lammas Oy)</h3>
                    <p className="text-[11px] text-dark-slate font-light leading-relaxed mt-1">
                      Designed and implemented a complete packaging conveyor trigger logic in the SAMK laboratory. Integrated optical sensors, pneumatic pushers, and PLC state sequences for routing meat packages and wool crates.
                    </p>
                  </div>

                  <div className="pl-4 border-l border-industrial-silver">
                    <h3 className="text-xs sm:text-sm font-bold text-jet-black">Custom Industrial Gripper Design (Turin Robot)</h3>
                    <p className="text-[11px] text-dark-slate font-light leading-relaxed mt-1">
                      Modelled a multi-finger structural gripper in SolidWorks for transbox sorting. Conducted Finite Element static stress analysis, and prototyped components via FDM 3D printing.
                    </p>
                  </div>

                  <div className="pl-4 border-l border-industrial-silver">
                    <h3 className="text-xs sm:text-sm font-bold text-jet-black">Automated Pick-and-Place Robot Cell (ABB RobotStudio)</h3>
                    <p className="text-[11px] text-dark-slate font-light leading-relaxed mt-1">
                      Programmed an ABB pick-and-place robot cell offline in RobotStudio. Synced sensor cues on moving conveyors to control gentle vacuum suction cup packaging.
                    </p>
                  </div>

                  <div className="pl-4 border-l border-industrial-silver">
                    <h3 className="text-xs sm:text-sm font-bold text-jet-black">Christmas Window Sleigh Automation ("jouluikkuna")</h3>
                    <p className="text-[11px] text-dark-slate font-light leading-relaxed mt-1">
                      Programmed continuous kinematics pathing for a public Christmas display in Pori, showcasing robotic movements of a flying Santa sleigh.
                    </p>
                  </div>
                </div>
              </div>

              {/* WORK EXPERIENCE */}
              <div>
                <h2 className="font-display text-sm font-bold tracking-[0.25em] text-jet-black border-b border-jet-black/20 pb-1 mb-4 uppercase">
                  WORK EXPERIENCE
                </h2>
                <div className="relative pl-4 border-l border-safety-orange">
                  <div className="absolute top-0.5 left-[-4.5px] w-2.5 h-2.5 bg-safety-orange rounded-full" />
                  <div className="flex justify-between items-start mb-1 text-xs sm:text-sm">
                    <h3 className="font-sans font-bold text-jet-black">
                      Practical Trainee – Cleaning Services
                    </h3>
                    <span className="font-mono text-[10px] text-dark-slate font-semibold bg-industrial-silver/20 px-2 py-0.5 ml-2">
                      NOV 2024 – PRESENT
                    </span>
                  </div>
                  <p className="text-xs text-dark-slate font-medium">RTK Palvelu — Pori, Finland</p>
                  <ul className="text-xs text-dark-slate/80 space-y-1 list-disc pl-4 mt-2 font-light">
                    <li>Demonstrated exceptional reliability, teamwork, and adherence to Finnish quality and safety protocols.</li>
                    <li>Acquired direct experience navigating corporate workplace environments and safety expectations in Finland.</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* RIGHT AREA: Skills, Languages & References */}
            <div className="col-span-1 md:col-span-4 space-y-8">
              
              {/* CORE SKILLS */}
              <div>
                <h2 className="font-display text-sm font-bold tracking-[0.25em] text-jet-black border-b border-jet-black/20 pb-1 mb-4 uppercase">
                  TECHNICAL SKILLS
                </h2>
                <div className="space-y-4 text-xs">
                  <div>
                    <h3 className="font-sans font-bold text-jet-black mb-1">Mechanical</h3>
                    <p className="text-dark-slate/80 font-light leading-tight">SolidWorks, CAD Part Assemblies, FEA Stress Testing, Mechanical Grippers, Manual Welding basics (Kemppi Expert).</p>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-jet-black mb-1">Electrical & PLC</h3>
                    <p className="text-dark-slate/80 font-light leading-tight">PLC Ladder Logic, Siemens TIA Portal Basics, Actuators/Sensor Wiring, Microcontroller systems (Arduino).</p>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-jet-black mb-1">Robotics & Simulation</h3>
                    <p className="text-dark-slate/80 font-light leading-tight">ABB RobotStudio (offline programming), Visual Components, Turin Robot, kinematics pathing.</p>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-jet-black mb-1">Software Systems</h3>
                    <p className="text-dark-slate/80 font-light leading-tight">Python script fundamentals, SQL databases, Git, Excel calculations, Technical Documentations.</p>
                  </div>
                </div>
              </div>

              {/* LANGUAGES */}
              <div>
                <h2 className="font-display text-sm font-bold tracking-[0.25em] text-jet-black border-b border-jet-black/20 pb-1 mb-3 uppercase">
                  LANGUAGES
                </h2>
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between">
                    <span>English:</span>
                    <span className="font-sans font-bold text-jet-black">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nepali:</span>
                    <span className="font-sans font-bold text-jet-black">Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hindi:</span>
                    <span className="font-sans font-bold text-jet-black">Fluent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finnish:</span>
                    <span className="font-sans font-bold text-jet-black">Basic (A1-A2)</span>
                  </div>
                </div>
              </div>

              {/* CERTIFICATIONS */}
              <div>
                <h2 className="font-display text-sm font-bold tracking-[0.25em] text-jet-black border-b border-jet-black/20 pb-1 mb-3 uppercase">
                  CREDENTIALS
                </h2>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-1.5">
                    <span className="text-safety-orange font-bold">✓</span>
                    <span className="text-dark-slate">Finnish Occupational Safety Card</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-safety-orange font-bold">✓</span>
                    <span className="text-dark-slate">Member of PAM Service Union (FI)</span>
                  </div>
                </div>
              </div>

              {/* ACADEMIC REFERENCES */}
              <div>
                <h2 className="font-display text-sm font-bold tracking-[0.25em] text-jet-black border-b border-jet-black/20 pb-1 mb-3 uppercase">
                  REFERENCES
                </h2>
                <div className="space-y-3 text-[11px] leading-snug text-dark-slate">
                  <div>
                    <h4 className="font-bold text-jet-black">Pulkkinen Petteri</h4>
                    <p className="text-[10px]">Lecturer, Mechatronics, SAMK</p>
                    <a href="mailto:petteri.pulkkinen@samk.fi" className="hover:underline text-[10px] block font-mono">petteri.pulkkinen@samk.fi</a>
                    <span className="font-mono text-[10px] block">+358 44 710 3296</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-jet-black">Timo Kerminen</h4>
                    <p className="text-[10px]">Senior Lecturer / Sales Mgr, SAMK</p>
                    <a href="mailto:timo.kerminen@samk.fi" className="hover:underline text-[10px] block font-mono">timo.kerminen@samk.fi</a>
                    <span className="font-mono text-[10px] block">+358 44 984 5704</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
