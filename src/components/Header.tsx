/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Cpu, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onOpenResume: () => void;
}

export default function Header({ onOpenResume }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "CONTACT", href: "#contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white border-industrial-silver/40 py-4 shadow-sm"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#"
            className={`flex items-center gap-2 font-display text-2xl font-bold tracking-widest transition-colors duration-300 ${
              isScrolled ? "text-jet-black" : "text-white"
            }`}
          >
            <Cpu className="w-6 h-6 text-safety-orange" />
            <span>P. K. SHAH</span>
            <span className="text-xs font-sans font-medium px-1.5 py-0.5 bg-safety-orange text-white tracking-normal ml-1">
              MECHATRONICS
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-display text-sm font-semibold tracking-wider hover:text-safety-orange transition-colors relative group py-2 ${
                  isScrolled ? "text-jet-black" : "text-white"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-safety-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 px-4 py-2 bg-safety-orange text-white text-xs font-bold font-display tracking-wider hover:bg-opacity-95 transition-all duration-300"
            >
              <FileText className="w-3.5 h-3.5" />
              VIEW RESUME
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-industrial-silver/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-jet-black" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-jet-black" : "text-white"}`} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full h-screen bg-deep-charcoal z-30 pt-24 px-8 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4 border-b border-industrial-silver/20 pb-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-2xl font-bold tracking-widest text-white hover:text-safety-orange transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-4 bg-safety-orange text-white font-display font-bold tracking-widest text-center flex items-center justify-center gap-2 hover:bg-opacity-95"
              >
                <FileText className="w-5 h-5" />
                VIEW FULL CV
              </button>
              <div className="text-white/40 font-mono text-xs text-center mt-8">
                PKS MECHATRONICS PORTFOLIO
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
