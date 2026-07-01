/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github, FileText, ArrowUpRight, HelpCircle } from "lucide-react";
import { REFERENCES } from "../data";

interface FooterProps {
  onOpenResume: () => void;
}

export default function Footer({ onOpenResume }: FooterProps) {
  return (
    <footer id="contact" className="bg-deep-charcoal border-t border-white/10 pt-20 pb-12 relative text-white">
      <div className="absolute top-4 left-4 font-mono text-[9px] text-white/20 tracking-widest hidden md:block">
        SYS_LINK // COMM_CHANNELS // END_OF_FILE
      </div>

      <div className="absolute inset-0 grid-blueprint-dark opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main CTA & Reference Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-white/10">
          
          {/* Left Block: Come Say Hello */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[1px] w-6 bg-safety-orange" />
                <span className="font-mono text-xs tracking-widest text-safety-orange font-bold uppercase">SEC_04 // CALL TO ACTION</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-none mb-6">
                LET'S BUILD SOMETHING RELIABLE.
              </h2>
              <p className="text-sm text-white/70 font-sans font-light leading-relaxed max-w-lg mb-8">
                I am actively seeking internships, summer positions, and entry-level mechatronics, automation, or mechanical design engineering roles. 
                Based in Pori, Finland, I am ready to relocate or adapt to your production requirements. Let's discuss how my skills can fit your team.
              </p>
            </div>

            {/* Direct Contact Metrics */}
            <div className="space-y-4">
              <a
                href="mailto:pursotta@gmail.com"
                className="flex items-center gap-4 group p-4 bg-white/5 border border-white/10 hover:border-safety-orange transition-colors max-w-md"
              >
                <div className="p-2.5 bg-safety-orange/15 border border-safety-orange/30 text-safety-orange">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-white/40 tracking-wider">DIRECT EMAIL LINK</div>
                  <div className="font-sans text-sm sm:text-base font-semibold group-hover:text-safety-orange transition-colors">
                    pursotta@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+358453248860"
                className="flex items-center gap-4 group p-4 bg-white/5 border border-white/10 hover:border-safety-orange transition-colors max-w-md"
              >
                <div className="p-2.5 bg-safety-orange/15 border border-safety-orange/30 text-safety-orange">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-white/40 tracking-wider">TELEPHONE CALL LINK</div>
                  <div className="font-sans text-sm sm:text-base font-semibold group-hover:text-safety-orange transition-colors">
                    +358 45 324 8860
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Block: Professional References */}
          <div className="col-span-1 lg:col-span-6 bg-white/[0.02] border border-white/10 p-8 sm:p-10 relative">
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-safety-orange" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-safety-orange" />

            <h3 className="font-display font-bold text-lg text-white tracking-widest uppercase mb-6 border-b border-white/10 pb-2">
              ACADEMIC & INDUSTRY REFERENCES
            </h3>

            <div className="space-y-8">
              {REFERENCES.map((ref) => (
                <div key={ref.name} className="flex gap-4 items-start">
                  <div className="p-2.5 bg-white/10 border border-white/20 text-white rounded mt-0.5">
                    <HelpCircle className="w-4 h-4 text-safety-orange" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm text-white tracking-wide uppercase">
                      {ref.name}
                    </h4>
                    <p className="text-xs text-white/60 font-sans">
                      {ref.role}
                    </p>
                    <p className="text-xs text-white/50 font-sans">
                      {ref.organization}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs font-mono">
                      <a href={`mailto:${ref.email}`} className="text-safety-orange hover:underline">
                        {ref.email}
                      </a>
                      <span className="text-white/20">|</span>
                      <span className="text-white/75">{ref.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Resume Download Callout */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-white/40 tracking-wider uppercase">
                ACADEMICS DEPT ACCREDITED
              </span>
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-6 py-2.5 bg-safety-orange text-white font-display font-bold text-xs tracking-widest hover:bg-opacity-95 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                PRINT FULL REFS SHEET
              </button>
            </div>
          </div>

        </div>

        {/* Footer Sub-Links & Copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40">
          
          {/* Logo brand & Name */}
          <div className="flex items-center gap-3">
            <span className="font-display font-bold tracking-widest text-white uppercase text-sm">
              P. K. SHAH
            </span>
            <span>|</span>
            <span className="font-sans font-light">SAMK MECHATRONICS 2026</span>
          </div>

          {/* Professional Social Anchor Nodes */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 border border-white/10 hover:border-safety-orange hover:text-safety-orange transition-all duration-300 text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 border border-white/10 hover:border-safety-orange hover:text-safety-orange transition-all duration-300 text-white"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenResume}
              className="p-2 bg-white/5 border border-white/10 hover:border-safety-orange hover:text-safety-orange transition-all duration-300 text-white font-mono text-[10px] px-3 font-semibold uppercase tracking-wider"
            >
              CV DOCUMENT
            </button>
          </div>

        </div>

        {/* Absolute Bottom Coordinates Row */}
        <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/20">
          <span>COM_LOG: CONNECTION_SECURE // TLS_V1.3</span>
          <span>© 2026 Pursottam Kumar Shah. All Rights Reserved.</span>
        </div>

      </div>
    </footer>
  );
}
