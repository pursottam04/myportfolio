/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EXPERIENCE } from "../data";
import { Briefcase, Calendar, MapPin, Award, CheckCircle } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-white border-b border-industrial-silver/20 relative grid-blueprint">
      <div className="absolute top-4 right-4 font-mono text-[9px] text-dark-slate/30 tracking-widest hidden md:block">
        LOG_CHRONO // WORK_HISTORY // LAB_TRIALS
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1.5px] w-6 bg-safety-orange" />
            <span className="font-mono text-xs tracking-widest text-safety-orange font-bold uppercase">SEC_03 // HISTORY</span>
            <span className="h-[1.5px] w-6 bg-safety-orange" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-jet-black mb-4">
            PROFESSIONAL & ACADEMIC PATHWAY
          </h2>
          <p className="max-w-2xl mx-auto text-dark-slate text-sm font-light tracking-wide leading-relaxed">
            A comprehensive record of practical work experience in Finland combined with continuous hands-on laboratory education at SAMK.
          </p>
        </div>

        {/* Timeline Structure */}
        <div className="relative max-w-4xl mx-auto pl-6 md:pl-0">
          {/* Vertical central structural line */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[1.5px] bg-industrial-silver/50" />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {EXPERIENCE.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.role} className={`relative flex flex-col md:flex-row items-stretch ${isEven ? "" : "md:flex-row-reverse"}`}>
                  
                  {/* Timeline bullet indicator node */}
                  <div className="absolute top-0 left-[-6px] md:left-1/2 md:translate-x-[-10px] w-5 h-5 bg-white border-4 border-safety-orange rounded-full z-10" />

                  {/* Empty balance column for desktop grids */}
                  <div className="hidden md:block w-1/2" />

                  {/* Chronology Detail Card */}
                  <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-10">
                    <div className="p-6 md:p-8 border border-industrial-silver/30 bg-white relative hover:border-jet-black transition-all duration-300">
                      {/* Industrial block ornament */}
                      <div className="absolute top-0 left-0 w-2 h-2 bg-safety-orange" />

                      {/* Header parameters */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <span className="font-mono text-[10px] text-safety-orange font-bold tracking-widest uppercase flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>
                        <span className="font-mono text-[10px] text-dark-slate/60 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-industrial-silver" />
                          {item.location.toUpperCase()}
                        </span>
                      </div>

                      {/* Title & Company */}
                      <h3 className="font-display font-extrabold text-2xl text-jet-black tracking-wide mb-1 leading-tight">
                        {item.role.toUpperCase()}
                      </h3>
                      <h4 className="font-sans font-semibold text-sm text-dark-slate mb-6">
                        {item.company}
                      </h4>

                      {/* Description Bullet Points */}
                      <div className="space-y-3 mb-6">
                        {item.description.map((desc, i) => (
                          <p key={i} className="text-xs sm:text-sm text-dark-slate font-light leading-relaxed">
                            {desc}
                          </p>
                        ))}
                      </div>

                      {/* Key Highlights row */}
                      <div className="pt-4 border-t border-industrial-silver/10">
                        <h5 className="font-display text-[11px] font-bold text-jet-black tracking-wider uppercase mb-2">
                          KEY DELIVERABLES // ACHIEVEMENTS
                        </h5>
                        <div className="space-y-2">
                          {item.highlights.map((hl) => (
                            <div key={hl} className="flex items-start gap-2.5 text-xs text-dark-slate">
                              <CheckCircle className="w-4 h-4 text-safety-orange flex-shrink-0 mt-0.5" />
                              <span className="font-sans font-medium">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
