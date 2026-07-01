/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, AlertCircle, Sparkles, CheckCircle, Activity } from "lucide-react";

export default function GripperPhysicalPhoto() {
  const [isOpen, setIsOpen] = useState(true);
  const [pressure, setPressure] = useState(6.0); // bars
  const [status, setStatus] = useState("STANDBY");
  const [isCylinder1Active, setIsCylinder1Active] = useState(false);
  const [isCylinder2Active, setIsCylinder2Active] = useState(false);

  // Trigger automated open/close sequence loop
  const toggleGripper = () => {
    setStatus("CYCLING");
    setIsOpen(!isOpen);
    setPressure(isOpen ? 4.2 : 6.2); // drop in pressure momentarily during travel
    
    setTimeout(() => {
      setPressure(isOpen ? 6.1 : 6.0);
      setStatus(isOpen ? "GRIPPED" : "OPEN");
    }, 800);
  };

  // Cylinder status flags based on movement
  useEffect(() => {
    if (status === "CYCLING") {
      setIsCylinder1Active(true);
      setIsCylinder2Active(true);
      const timer = setTimeout(() => {
        setIsCylinder1Active(false);
        setIsCylinder2Active(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="w-full flex flex-col bg-deep-charcoal text-white border border-white/10 rounded-lg overflow-hidden relative shadow-xl">
      {/* Carbon fiber style dark grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(244,63,94,0.04)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Controller Header */}
      <div className="bg-black/40 border-b border-white/10 px-4 py-3 flex items-center justify-between text-xs font-mono relative z-10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-pink-500 animate-pulse" />
          <span className="font-bold tracking-wider text-white">PHYSICAL MECHANISM ASSEMBLY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${status === "GRIPPED" ? "bg-green-400" : "bg-cyan-400"} animate-pulse`} />
          <span className="text-white/60 tracking-widest">{status}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row relative z-10 p-5 gap-5">
        
        {/* Render Stage */}
        <div className="w-full md:w-8/12 bg-neutral-950 rounded border border-white/5 p-4 flex flex-col items-center justify-center relative min-h-[280px]">
          <div className="absolute inset-0 grid-blueprint-dark opacity-10 pointer-events-none" />

          {/* Parallel sliding arm movement distance: open vs closed */}
          <div className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center">
            
            {/* Robot flange central adapter (Item 5) */}
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border-2 border-zinc-500 shadow-lg flex items-center justify-center z-10">
              <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-700/50 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-zinc-800" />
              </div>
            </div>

            {/* Aluminum backplate (Item 6) */}
            <div className="absolute w-[240px] h-[160px] bg-gradient-to-b from-zinc-400 to-zinc-600 border border-zinc-300 rounded-sm shadow-md opacity-90" />

            {/* Linear Guide Rails (Item 3) */}
            <div className="absolute w-[210px] h-3 bg-zinc-800 top-1/4 rounded-full shadow-inner border border-zinc-600" />
            <div className="absolute w-[210px] h-3 bg-zinc-800 bottom-1/4 rounded-full shadow-inner border border-zinc-600" />

            {/* Dual pneumatic actuators cylinder housings (Item 8) */}
            <div className="absolute left-[70px] top-[95px] w-12 h-4 bg-zinc-700 rounded border border-zinc-500 shadow z-20">
              {/* Cylinder piston rod (Item 9) extending/retracting */}
              <div 
                className="absolute right-[-14px] top-[1px] h-2 bg-zinc-300 rounded transition-all duration-700" 
                style={{ width: isOpen ? "16px" : "4px" }}
              />
            </div>
            <div className="absolute right-[70px] bottom-[95px] w-12 h-4 bg-zinc-700 rounded border border-zinc-500 shadow z-20">
              <div 
                className="absolute left-[-14px] top-[1px] h-2 bg-zinc-300 rounded transition-all duration-700" 
                style={{ width: isOpen ? "16px" : "4px" }}
              />
            </div>

            {/* Pink claws (Item 2) - Slide based on open/close state */}
            {/* Left Pink Claws Assembly (FDM PETG 3D print) */}
            <div 
              className="absolute left-0 h-full flex flex-col justify-between py-10 transition-all duration-700 z-30"
              style={{ transform: `translateX(${isOpen ? "0px" : "25px"})` }}
            >
              {/* Top claw */}
              <div className="w-10 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded border-2 border-pink-400 shadow-lg flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:4px_4px]" />
                <span className="text-[7px] font-mono font-bold text-white leading-none">FDM</span>
                {/* Horizontal slide link */}
                <div className="absolute right-[-20px] w-5 h-2 bg-zinc-400 border border-zinc-500 rounded-sm" />
              </div>
              
              {/* Bottom claw */}
              <div className="w-10 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded border-2 border-pink-400 shadow-lg flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:4px_4px]" />
                <span className="text-[7px] font-mono font-bold text-white leading-none">FDM</span>
                <div className="absolute right-[-20px] w-5 h-2 bg-zinc-400 border border-zinc-500 rounded-sm" />
              </div>
            </div>

            {/* Right Pink Claws Assembly */}
            <div 
              className="absolute right-0 h-full flex flex-col justify-between py-10 transition-all duration-700 z-30"
              style={{ transform: `translateX(${isOpen ? "0px" : "-25px"})` }}
            >
              {/* Top claw */}
              <div className="w-10 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded border-2 border-pink-400 shadow-lg flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:4px_4px]" />
                <span className="text-[7px] font-mono font-bold text-white leading-none">FDM</span>
                {/* Horizontal slide link */}
                <div className="absolute left-[-20px] w-5 h-2 bg-zinc-400 border border-zinc-500 rounded-sm" />
              </div>
              
              {/* Bottom claw */}
              <div className="w-10 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded border-2 border-pink-400 shadow-lg flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:4px_4px]" />
                <span className="text-[7px] font-mono font-bold text-white leading-none">FDM</span>
                <div className="absolute left-[-20px] w-5 h-2 bg-zinc-400 border border-zinc-500 rounded-sm" />
              </div>
            </div>

            {/* Dynamic Parallel Clamping arrows */}
            <div className="absolute inset-x-0 top-[8%] flex justify-between px-16 pointer-events-none text-cyan-400">
              <span className={`text-xs animate-bounce font-bold ${isOpen ? "rotate-0" : "rotate-180"}`}>➔</span>
              <span className={`text-xs animate-bounce font-bold ${isOpen ? "rotate-180" : "rotate-0"}`}>➔</span>
            </div>
            <div className="absolute inset-x-0 bottom-[8%] flex justify-between px-16 pointer-events-none text-cyan-400">
              <span className={`text-xs animate-bounce font-bold ${isOpen ? "rotate-0" : "rotate-180"}`}>➔</span>
              <span className={`text-xs animate-bounce font-bold ${isOpen ? "rotate-180" : "rotate-0"}`}>➔</span>
            </div>
          </div>
        </div>

        {/* Assembly Technical Details Right Panel */}
        <div className="w-full md:w-4/12 flex flex-col justify-between font-mono text-xs text-white/80 gap-4">
          <div className="space-y-4">
            <div>
              <span className="text-white/40 block text-[10px] uppercase tracking-wider">FABRICATION / STRUCTURE</span>
              <p className="text-[11px] leading-relaxed mt-1 font-sans text-white/90">
                The claw hooks are printed using heavy-duty <strong className="text-pink-400">PETG thermoplastic</strong> on an FDM printer with 100% infill to handle heavy shear loads. The slider base is machined from <strong>8mm aluminum 6061-T6 plate</strong>.
              </p>
            </div>

            {/* Pneumatics Controller panel */}
            <div className="p-3 bg-black/40 border border-white/5 rounded space-y-2">
              <span className="text-cyan-400 font-bold block text-[10px] tracking-widest uppercase">
                PNEUMATICS READOUT
              </span>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-white/50">Supply Pressure:</span>
                <span className="font-bold text-white">{pressure.toFixed(1)} bar</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-white/50">Actuator Travel:</span>
                <span className="font-bold text-white">{isOpen ? "0.0 mm" : "50.0 mm"}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-white/50">Clamping Force:</span>
                <span className="font-bold text-pink-400">{isOpen ? "0.0 N" : "185.2 N"}</span>
              </div>

              {/* Status lights */}
              <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[9px] tracking-wider uppercase">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isCylinder1Active ? "bg-pink-500 animate-ping" : "bg-neutral-600"}`} />
                  <span>CYLINDER_1</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isCylinder2Active ? "bg-pink-500 animate-ping" : "bg-neutral-600"}`} />
                  <span>CYLINDER_2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trigger Action Button */}
          <button
            onClick={toggleGripper}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-display font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Play className="w-3.5 h-3.5" />
            {isOpen ? "TRIGGER CLAMP CYLINDER" : "TRIGGER RELEASE CYLINDER"}
          </button>
        </div>
      </div>
    </div>
  );
}
