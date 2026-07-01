/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SKILL_CATEGORIES } from "../data";
import {
  Cpu,
  PenTool,
  FileText,
  Flame,
  Sliders,
  Bot,
  LayoutGrid,
  Zap,
  Terminal,
  CircuitBoard,
  Database,
  FileSpreadsheet,
  Wrench,
  ShieldAlert,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  PenTool,
  FileText,
  Flame,
  Sliders,
  Bot,
  LayoutGrid,
  Zap,
  Terminal,
  CircuitBoard,
  Database,
  FileSpreadsheet
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("mechanical");

  return (
    <section id="skills" className="py-24 bg-white border-b border-industrial-silver/20 relative grid-blueprint">
      <div className="absolute top-4 left-4 font-mono text-[9px] text-dark-slate/30 tracking-widest hidden md:block">
        MATRIX_SYS // COM_INTERFACES // RECRUIT_VIEW
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1.5px] w-6 bg-safety-orange" />
            <span className="font-mono text-xs tracking-widest text-safety-orange font-bold uppercase">SEC_02 // SKILLS MATRIX</span>
            <span className="h-[1.5px] w-6 bg-safety-orange" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-jet-black mb-4">
            TECHNICAL CAPABILITIES
          </h2>
          <p className="max-w-2xl mx-auto text-dark-slate text-sm font-light tracking-wide leading-relaxed">
            Highly structured and balanced mechatronics skillset combining mechanical modeling, physical circuit wiring, 
            industrial automation, and software script interfaces.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 mb-12 border-b border-industrial-silver/20 pb-4">
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-4 font-display font-bold text-sm tracking-widest transition-all duration-300 relative ${
                activeTab === category.id
                  ? "text-safety-orange"
                  : "text-dark-slate/70 hover:text-jet-black"
              }`}
            >
              {category.title.toUpperCase()}
              {activeTab === category.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-[-5px] left-0 w-full h-[2.5px] bg-safety-orange"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {SKILL_CATEGORIES.find((cat) => cat.id === activeTab)?.skills.map((skill) => {
                const IconComponent = iconMap[skill.icon] || Wrench;
                return (
                  <div
                    key={skill.name}
                    className="p-6 border border-industrial-silver/30 bg-white hover:border-jet-black transition-all duration-300 relative group flex flex-col justify-between"
                  >
                    {/* Technical Card Accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 bg-industrial-silver/30 group-hover:bg-safety-orange transition-colors" />
                    
                    <div>
                      {/* Icon & Title Row */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 border border-industrial-silver/40 text-jet-black group-hover:text-safety-orange group-hover:border-safety-orange/40 transition-colors bg-white">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-lg text-jet-black tracking-wider leading-none mb-1">
                            {skill.name}
                          </h3>
                          <span className="font-mono text-[10px] bg-industrial-silver/20 text-dark-slate/80 px-2 py-0.5 font-semibold uppercase tracking-widest">
                            {skill.level}
                          </span>
                        </div>
                      </div>

                      {/* Description Text */}
                      <p className="text-xs sm:text-sm text-dark-slate font-sans leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    {/* Technical status watermark */}
                    <div className="mt-4 pt-4 border-t border-industrial-silver/10 flex items-center justify-between">
                      <span className="font-mono text-[9px] text-dark-slate/40">SYS_OK // VER_9.1</span>
                      <span className="font-mono text-[9px] text-safety-orange font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        CERTIFIED TRAINED
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Safety & Workspace Credentials (Bottom highlights) */}
        <div className="mt-16 p-6 border-l-4 border-safety-orange bg-deep-charcoal text-white grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded">
              <ShieldAlert className="w-5 h-5 text-safety-orange" />
            </div>
            <div>
              <h4 className="font-display text-xs font-bold tracking-widest uppercase text-white">OCCUPATIONAL SAFETY CARD</h4>
              <p className="text-[11px] text-white/75 font-sans mt-0.5">Officially Certified (Finland Työturvallisuuskortti)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded">
              <GraduationCap className="w-5 h-5 text-safety-orange" />
            </div>
            <div>
              <h4 className="font-display text-xs font-bold tracking-widest uppercase text-white">SAMK ACCREDITATION</h4>
              <p className="text-[11px] text-white/75 font-sans mt-0.5">Practical lab models aligned with Finnish industry norms</p>
            </div>
          </div>

          <div className="text-right hidden md:block">
            <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">SYSTEM_SAFE_STANDARDS</span>
          </div>
        </div>

      </div>
    </section>
  );
}
