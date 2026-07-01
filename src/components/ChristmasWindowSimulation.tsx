/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Tv, Monitor, Video, ShieldAlert, Cpu } from "lucide-react";

export default function ChristmasWindowSimulation() {
  const [isSimActive, setIsSimActive] = useState(true);
  const [simAngle, setSimAngle] = useState<"front" | "isometric">("front");
  const [simTime, setSimTime] = useState(0);

  // Time generator for simulation sweep lines and movement
  useEffect(() => {
    if (!isSimActive) return;
    const interval = setInterval(() => {
      setSimTime((prev) => (prev + 1) % 100);
    }, 45);
    return () => clearInterval(interval);
  }, [isSimActive]);

  // Derived angle of the virtual robot joint
  const robotRotation = isSimActive ? Math.sin(simTime * 0.08) * 20 : 0;

  return (
    <div className="relative w-full aspect-video md:h-[320px] bg-[#11141e] overflow-hidden select-none border border-white/10 rounded-b-lg">
      {/* Background Fairy Lights curtain (dimmer in this setup) */}
      <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20 px-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col items-center h-full gap-3 pt-1">
            <div className="w-[1px] h-20 bg-white/10" />
            {[...Array(4)].map((_, j) => (
              <div key={j} className="w-1 h-1 rounded-full bg-amber-100 shadow-[0_0_4px_rgba(253,230,138,0.5)]" />
            ))}
          </div>
        ))}
      </div>

      {/* 1. Large Virtual Simulation Monitor (Left/Center) */}
      <div className="absolute top-[20px] left-[6%] w-[50%] h-[170px] bg-[#0c0d12] border-4 border-slate-800 rounded-md p-1 shadow-[0_0_20px_rgba(0,0,0,0.8)] z-10 flex flex-col justify-between">
        {/* Screen Header/Status bar */}
        <div className="h-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-2 text-[7px] font-mono text-emerald-400">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isSimActive ? "bg-emerald-500 animate-ping" : "bg-red-500"}`} />
            <span>SYS_ROBOT_SIM // ONLINE</span>
          </div>
          <span>FPS: 60.0 // {simAngle.toUpperCase()}</span>
        </div>

        {/* Dynamic Simulation Screen (Green Screen backdrop like in the photo!) */}
        <div className="relative flex-grow bg-[#00B32C] overflow-hidden border border-emerald-950 flex items-center justify-center">
          {/* Radar sweep line */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/20 animate-scan pointer-events-none" />
          
          {/* Virtual Grid lines */}
          <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none" />

          {/* Virtual Yellow Turin Robot Arm */}
          <div className="absolute bottom-[20px] w-[140px] h-[120px] pointer-events-none">
            {/* Robot Pedestal */}
            <div className="absolute bottom-0 left-[45px] w-[30px] h-[12px] bg-slate-800 border-t border-slate-600 rounded" />

            {/* Rotational pivot group */}
            <div
              className="absolute origin-[60px_100px] w-full h-full"
              style={{ transform: `rotate(${robotRotation * 0.6}deg)` }}
            >
              {/* Lower link */}
              <div className="absolute bottom-[20px] left-[52px] w-[14px] h-[45px] bg-[#FFCC00] rounded-full border border-black/30 transform rotate-12" />

              {/* Upper link */}
              <div
                className="absolute top-[35px] left-[60px] w-[60px] h-[12px] bg-[#FFCC00] rounded-full border border-black/30 origin-left"
                style={{ transform: `rotate(${-robotRotation * 0.8}deg)` }}
              >
                {/* Simulated tool (Vacuum clamp or gripper tip) */}
                <div className="absolute right-[-10px] top-[-3px] w-4 h-[18px] bg-slate-700 border border-slate-600 rounded flex flex-col justify-between">
                  <div className="w-1.5 h-1 bg-amber-400 self-center" />
                </div>
              </div>
            </div>
          </div>

          {/* Virtual UI overlays */}
          <div className="absolute bottom-1 right-2.5 font-mono text-[7px] text-white flex flex-col items-end pointer-events-none leading-tight bg-black/40 p-1 rounded-xs">
            <span>X: {(152 + Math.cos(simTime * 0.1) * 35).toFixed(1)} mm</span>
            <span>Y: {(241 + Math.sin(simTime * 0.1) * 12).toFixed(1)} mm</span>
          </div>
          <div className="absolute top-2 left-2.5 font-mono text-[6.5px] text-white bg-black/40 p-1 rounded-xs leading-none">
            <span>TURIN TX_800_SIM</span>
          </div>
        </div>
      </div>

      {/* 2. Teddy Bear (Right) - Giant plush sitting down with red Santa hat & sweater */}
      <div className="absolute bottom-[20px] right-[6%] w-[110px] h-[170px] z-10 pointer-events-none flex flex-col items-center">
        {/* Red Santa Hat */}
        <div className="absolute top-[10px] w-14 h-12 z-20 flex flex-col items-center">
          {/* Hat Cone */}
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-b-[#DC2626] relative transform -rotate-[15deg]">
            {/* White pom-pom */}
            <div className="absolute top-[-30px] left-[-4px] w-3 h-3 bg-white rounded-full border border-slate-100 shadow-sm" />
          </div>
          {/* Hat fluff brim */}
          <div className="w-[38px] h-4 bg-white rounded-full border border-slate-200 mt-[-4px] shadow-sm" />
        </div>

        {/* Teddy Head */}
        <div className="w-16 h-14 bg-[#8C6239] rounded-full relative shadow-md mt-[18px]">
          {/* Ears */}
          <div className="absolute top-[-4px] left-[-2px] w-6 h-6 bg-[#8C6239] rounded-full border-2 border-[#704d29]" />
          <div className="absolute top-[-4px] right-[-2px] w-6 h-6 bg-[#8C6239] rounded-full border-2 border-[#704d29]" />
          {/* Eyes (Glass style) */}
          <div className="absolute top-5 left-4 w-2 h-2 bg-black rounded-full shadow-inner" />
          <div className="absolute top-5 right-4 w-2 h-2 bg-black rounded-full shadow-inner" />
          {/* Teddy Glasses / spectacles (as shown in the second photo!) */}
          <div className="absolute top-4 left-2 right-2 h-4 border-2 border-slate-400 rounded-full flex justify-between pointer-events-auto opacity-85">
            <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-400 mt-[-2px]" />
            <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-400 mt-[-2px]" />
          </div>
          {/* Snout & Nose */}
          <div className="absolute bottom-2 left-[18px] right-[18px] h-6 bg-[#E3C19F] rounded-full flex flex-col items-center justify-start pt-0.5">
            <div className="w-4 h-2 bg-black rounded-b-md" />
            <div className="w-[1px] h-1.5 bg-black" />
          </div>
        </div>

        {/* Teddy Sweater & Scarf */}
        <div className="w-[75px] h-[70px] bg-[#991B1B] border-t-2 border-[#DC2626] rounded-t-2xl relative flex flex-col items-center pt-2 shadow-lg mt-[-6px]">
          {/* Red Tie/Scarf hanging */}
          <div className="w-3 h-10 bg-[#DC2626] rounded-b border border-red-800 shadow-md transform rotate-6" />
          
          {/* Teddy Arms */}
          <div className="absolute left-[-10px] top-2 w-[20px] h-[45px] bg-[#8C6239] border border-[#704d29] rounded-full transform -rotate-12" />
          <div className="absolute right-[-10px] top-2 w-[20px] h-[45px] bg-[#8C6239] border border-[#704d29] rounded-full transform rotate-12" />
        </div>

        {/* Teddy Legs/Pants */}
        <div className="w-[85px] h-[35px] bg-[#5C4033] border-t border-black/30 rounded-t mt-[-10px] flex justify-between px-1.5 shadow-sm">
          <div className="w-[32px] h-[34px] bg-[#8C6239] rounded-full" />
          <div className="w-[32px] h-[34px] bg-[#8C6239] rounded-full" />
        </div>
      </div>

      {/* 3. Gift Boxes wrapped in festive paper (Bottom center) */}
      {/* Box 1: Red decorated present box (Center) */}
      <div className="absolute bottom-[18px] left-[42%] w-[60px] h-[55px] z-20 flex flex-col justify-end">
        <div className="w-[60px] h-[45px] bg-[#991B1B] border-2 border-[#DC2626] rounded-sm relative shadow-md">
          {/* Golden ribbon ribbons */}
          <div className="absolute left-[26px] top-0 bottom-0 w-[6px] bg-[#F59E0B]" />
          <div className="absolute top-[18px] left-0 right-0 h-[6px] bg-[#F59E0B]" />
          {/* Gold bow on top */}
          <div className="absolute top-[-8px] left-[18px] w-6 h-3 bg-[#D97706] rounded-full" />
        </div>
      </div>

      {/* Box 2: Green present box (Left foreground) */}
      <div className="absolute bottom-[18px] left-[28%] w-[50px] h-[45px] z-30 flex flex-col justify-end">
        <div className="w-[50px] h-[36px] bg-[#065F46] border border-[#10B981] rounded-xs relative shadow-md">
          {/* White ribbon wrapping */}
          <div className="absolute left-[21px] top-0 bottom-0 w-[6px] bg-white" />
          <div className="absolute top-[14px] left-0 right-0 h-[6px] bg-white" />
        </div>
      </div>

      {/* 4. Toy Nutcracker Soldiers (standing sentinel on boxes/stands) */}
      {/* Nutcracker 1: Standing on Green box */}
      <div className="absolute bottom-[60px] left-[32%] w-12 h-28 z-40 pointer-events-none flex flex-col items-center">
        {/* Red Soldier Hat (shako) */}
        <div className="w-5 h-8 bg-black border border-slate-700 rounded-t-xs relative flex flex-col items-center">
          <div className="w-1 h-3 bg-amber-400 absolute bottom-1" /> {/* Plume */}
        </div>
        {/* Head */}
        <div className="w-4.5 h-5 bg-[#FFD3B6] border-l border-r border-slate-300 relative flex flex-col items-center justify-around">
          {/* Black beard & mustache */}
          <div className="w-3.5 h-1 bg-black rounded-b-xs" />
          {/* Tiny eyes */}
          <div className="flex gap-1 justify-between w-3">
            <div className="w-0.5 h-0.5 bg-black rounded-full" />
            <div className="w-0.5 h-0.5 bg-black rounded-full" />
          </div>
        </div>
        {/* Red Uniform Torso */}
        <div className="w-5.5 h-7 bg-[#DC2626] rounded-xs border-t border-slate-100 relative flex flex-col items-center">
          {/* Gold crossbelts */}
          <div className="absolute w-[2px] h-full bg-amber-400 transform rotate-12" />
          <div className="absolute w-[2px] h-full bg-amber-400 transform -rotate-12" />
        </div>
        {/* Blue/black pants and black boots */}
        <div className="w-4.5 h-5 bg-blue-900 flex justify-between px-0.5">
          <div className="w-1.5 h-full bg-black rounded-b-sm" />
          <div className="w-1.5 h-full bg-black rounded-b-sm" />
        </div>
      </div>

      {/* Nutcracker 2: Small soldier in front */}
      <div className="absolute bottom-[18px] left-[20%] w-8 h-20 z-40 pointer-events-none flex flex-col items-center scale-75">
        <div className="w-4 h-6 bg-red-700 rounded-t" />
        <div className="w-3.5 h-4 bg-orange-200" />
        <div className="w-4.5 h-5 bg-emerald-800" />
        <div className="w-3.5 h-4 bg-black rounded-b-sm" />
      </div>

      {/* 5. SPONSOR BANNER (HUITTINEN, samk, SATAKUNTALIITTO, European Union) */}
      <div className="absolute bottom-0 left-0 right-0 h-[18px] bg-white border-t border-slate-300 flex items-center justify-between px-3 text-[5.5px] font-mono tracking-tighter text-slate-800 uppercase font-black z-40 select-none">
        <div className="flex items-center gap-2">
          {/* HUITTINEN */}
          <div className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 bg-emerald-700 rounded-sm inline-block" />
            <span className="text-emerald-900 font-extrabold text-[5px]">HUITTINEN</span>
          </div>
          {/* SAMK */}
          <div className="flex items-center gap-0.5 border-l border-slate-300 pl-1.5">
            <span className="text-[#005B94] font-black text-[5px]">samk</span>
            <span className="text-cyan-600 text-[4px] font-bold">●</span>
          </div>
        </div>

        {/* SATAKUNTALIITTO */}
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1 bg-blue-800 rounded-xs" />
          <span className="text-[4px] text-slate-600 tracking-tight leading-none">SATAKUNTALIITTO Regional Council</span>
        </div>

        {/* European Union */}
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-1.5 bg-blue-900 flex flex-wrap gap-0.25 p-0.25 items-center justify-center">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="w-[0.5px] h-[0.5px] bg-amber-400 rounded-full" />
            ))}
          </div>
          <span className="text-[4.2px] text-slate-700 leading-none">Co-funded by the EU</span>
        </div>
      </div>

      {/* 6. Foreground Controls for Simulation Display */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-40 bg-black/75 backdrop-blur-md px-2.5 py-1.5 border border-white/10 rounded-sm">
        <button
          onClick={() => setIsSimActive(!isSimActive)}
          className={`px-2 py-1 rounded-xs font-mono text-[8px] uppercase tracking-wider text-white transition-all cursor-pointer ${
            isSimActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isSimActive ? "Simulating" : "Paused"}
        </button>

        <button
          onClick={() => setSimAngle((prev) => (prev === "front" ? "isometric" : "front"))}
          className="p-1 rounded-xs bg-white/10 hover:bg-safety-orange text-white transition-colors cursor-pointer flex items-center gap-1 font-mono text-[8px]"
          title="Change Viewport Angle"
        >
          <Video className="w-2.5 h-2.5" />
          <span>{simAngle.toUpperCase()}</span>
        </button>

        <div className="h-4 w-[1px] bg-white/20 mx-0.5" />

        <div className="flex items-center gap-1 font-mono text-[8px] text-white/80 uppercase">
          <Cpu className="w-2.5 h-2.5 text-safety-orange" />
          <span>AX_1: {robotRotation.toFixed(1)}°</span>
        </div>
      </div>

      {/* Glass reflections */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30" />
    </div>
  );
}
