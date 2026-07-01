/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CheckCircle, Award, Target, MapPin, Calendar, Compass, Layers } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const statistics = [
    { label: "DEGREE STATE", value: "3RD YEAR" },
    { label: "ACADEMIC INST.", value: "SAMK FI" },
    { label: "GRADUATION", value: "DEC 2026" },
    { label: "LANGUAGES", value: "ENGLISH + FINNISH" }
  ];

  return (
    <section id="about" className="py-24 bg-white border-b border-industrial-silver/20 relative grid-blueprint">
      {/* Absolute Coordinate Marker */}
      <div className="absolute top-4 right-4 font-mono text-[9px] text-dark-slate/30 tracking-widest hidden md:block">
        REF_GRID // PORI_CAMPUS // SAMK_MECH
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Side: Architectural/Mechanical Image */}
          <div className="col-span-1 lg:col-span-5 relative group min-h-[350px] lg:min-h-[500px] flex">
            {/* Outer technical border wireframe */}
            <div className="absolute -inset-2 border border-industrial-silver/30 border-dashed pointer-events-none" />
            
            {/* Alignment crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-safety-orange" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-safety-orange" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-safety-orange" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-safety-orange" />
            
            {/* Blueprint Grid Watermark */}
            <div className="absolute inset-4 border border-jet-black/5 flex flex-col justify-between p-4 z-10 pointer-events-none">
              <span className="font-mono text-[9px] text-jet-black/30">SCALE: 1:1 // DWG_NO: 001</span>
              <div className="flex justify-between items-end">
                <span className="font-mono text-[9px] text-jet-black/30">PORTRAIT ASSY</span>
                <span className="font-mono text-[9px] text-jet-black/30">PKS_2026</span>
              </div>
            </div>

            {/* Stylized Architectural/Mechanical Image */}
            <div className="w-full h-full relative z-20">
              <div className="w-full h-full min-h-[350px] lg:min-h-[480px] overflow-hidden border border-jet-black bg-deep-charcoal relative rounded-sm group/image">
                <img
                  src="/profile.jpg"
                  alt="Pursottam Kumar Shah"
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jet-black/60 via-transparent to-transparent opacity-40 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right Side: biography and mission statement */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
            {/* Section ID tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-8 bg-safety-orange" />
              <span className="font-mono text-xs tracking-widest text-safety-orange font-bold uppercase">SEC_01 // SYSTEM OVERVIEW</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-jet-black mb-6 tracking-tight leading-tight">
              BRIDGING MECHANICAL PRECISION, SMART ELECTRONICS & INTELLIGENT SOFTWARE
            </h2>

            {/* Structured bio and current status at SAMK */}
            <div className="text-dark-slate font-sans leading-relaxed text-sm sm:text-base space-y-6">
              <p>
                I am <strong className="text-jet-black font-semibold">Pursottam Kumar Shah</strong>, a final-year 
                Bachelor of Engineering student in <strong className="text-jet-black font-semibold">Mechatronics Engineering</strong> at 
                the <strong className="text-jet-black font-semibold">Satakunta University of Applied Sciences (SAMK)</strong> in Pori, Finland.
                I approach engineering challenges with a structural and precision-oriented mindset, focused on developing reliable, highly integrated systems.
              </p>
              
              <p>
                Mechatronics is more than just combining parts—it is the seamless fusion of physical assemblies, robust circuitry, and real-time control algorithms. 
                My experience spans design and simulation of mechanical parts (SolidWorks), automated packing conveyor lines, 
                and programming offline industrial robotics (ABB RobotStudio). I am eager to apply my skills to real industry workflows and contribute to European manufacturing and automation companies.
              </p>
            </div>

            {/* Grid Metrics info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-industrial-silver/20">
              {statistics.map((stat) => (
                <div key={stat.label} className="border-l-2 border-safety-orange pl-3">
                  <div className="font-mono text-[9px] text-dark-slate/60 tracking-wider uppercase mb-1">{stat.label}</div>
                  <div className="font-display text-lg font-bold text-jet-black tracking-tight">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Technical focus checkboxes */}
            <div className="mt-8 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-0.5 bg-safety-orange/10 text-safety-orange rounded">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-jet-black tracking-wider">ROBUST PHYSICAL ARCHITECTURES</h4>
                  <p className="text-xs text-dark-slate/80 font-sans mt-0.5">Creating stress-analyzed parts and high-quality technical drawings ready for production.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-0.5 bg-safety-orange/10 text-safety-orange rounded">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-jet-black tracking-wider">HARDWARE INTEGRATION & LOGIC</h4>
                  <p className="text-xs text-dark-slate/80 font-sans mt-0.5">Wiring sensors and programming controllers (PLCs, Arduino, sensors arrays) to dictate precise sequences.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
