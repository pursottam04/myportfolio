/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowDown, ChevronDown, CheckCircle, FileText } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-jet-black select-none">
      {/* Background Image with Dark & Industrial Blue Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920"
          alt="Mechatronics Automation background"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter contrast-125 saturate-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jet-black via-black/80 to-black/60" />
        <div className="absolute inset-0 grid-blueprint-dark opacity-40 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 w-full z-10 pt-16 flex flex-col justify-between h-[80%] md:h-[75%]">
        {/* Decorative Grid Lines - High End Engineering Feel */}
        <div className="absolute top-0 left-6 bottom-0 w-[1px] bg-white/10 hidden lg:block" />
        <div className="absolute top-0 right-6 bottom-0 w-[1px] bg-white/10 hidden lg:block" />

        {/* Floating Industry Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-industrial-silver uppercase pl-0 lg:pl-10"
        >
          <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></span>
          <span>AVAILABLE FOR MECHATRONICS ROLES IN FINLAND / EUROPE</span>
        </motion.div>

        {/* Main Headings */}
        <div className="pl-0 lg:pl-10 my-auto flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="overflow-hidden"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold text-white leading-none tracking-tight">
              MECHATRONICS
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="overflow-hidden"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold text-white leading-none tracking-tight flex items-center gap-4">
              <span className="text-safety-orange">.</span>
              AUTOMATION
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="overflow-hidden"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold text-white leading-none tracking-tight flex items-center gap-4">
              <span className="text-safety-orange">.</span>
              ENGINEERING
            </h1>
          </motion.div>

          {/* Subheading Brief */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 max-w-2xl"
          >
            <p className="text-base sm:text-lg text-industrial-silver font-sans font-light leading-relaxed tracking-wide">
              Designing precision-engineered mechatronic systems. Integrating high-performance
              mechanical assemblies, PLC automation, robotic programming, and software logic
              to build the future of industrial automation.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <button
              onClick={onOpenResume}
              className="flex items-center gap-3 px-8 py-4 bg-safety-orange text-white font-display font-bold text-sm tracking-widest hover:bg-opacity-90 active:scale-95 transition-all duration-300 shadow-md"
            >
              <FileText className="w-4 h-4" />
              DOWNLOAD CV
            </button>
            <a
              href="#about"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-display font-bold text-sm tracking-widest border border-white/20 hover:border-white/40 active:scale-95 transition-all duration-300"
            >
              ABOUT ME
            </a>
          </motion.div>
        </div>

        {/* Scroll down mouse indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="pl-0 lg:pl-10 flex items-center justify-between w-full"
        >
          {/* Engineering Coordinates */}
          <div className="hidden sm:flex items-center gap-4 font-mono text-[10px] text-white/30 tracking-widest">
            <span>LOC: PORI, FINLAND</span>
            <span>|</span>
            <span>SYS: 3RD YEAR SAMK</span>
            <span>|</span>
            <span>LAT: 61.4851° N, LON: 21.7974° E</span>
          </div>

          <a
            href="#about"
            className="flex flex-col items-center gap-2 group mx-auto sm:mx-0 sm:ml-auto"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1.5 transition-colors group-hover:border-safety-orange">
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 bg-safety-orange rounded-full"
              />
            </div>
            <span className="font-mono text-[9px] text-white/40 tracking-[0.25em] uppercase group-hover:text-white transition-colors">
              SCROLL DOWN
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
