/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Lightbulb, Play, Pause, Compass } from "lucide-react";

export default function ChristmasWindowPhysical() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightsMode, setLightsMode] = useState<"shimmer" | "glow" | "off">("shimmer");
  const [villageLights, setVillageLights] = useState(true);
  const [robotAngle, setRobotAngle] = useState(0);

  // Smooth periodic oscillation for the robot arm trajectory
  useEffect(() => {
    if (!isPlaying) return;
    let frameId: number;
    let start = Date.now();

    const update = () => {
      const elapsed = Date.now() - start;
      // Oscillate between -15 and 15 degrees for an organic flight feel
      const angle = Math.sin(elapsed / 1200) * 15;
      setRobotAngle(angle);
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  return (
    <div className="relative w-full aspect-video md:h-[320px] bg-[#0c1020] overflow-hidden select-none border border-white/10 rounded-b-lg">
      {/* 1. Hanging curtain lights backdrop */}
      <div className="absolute inset-0 flex justify-around pointer-events-none opacity-40 px-4">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="flex flex-col items-center h-full gap-2 pt-1">
            <div className="w-[1px] h-20 bg-white/20" />
            {[...Array(6)].map((_, j) => (
              <div
                key={j}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${
                  lightsMode === "off"
                    ? "bg-white/10"
                    : lightsMode === "glow"
                    ? "bg-amber-100 shadow-[0_0_8px_rgba(253,230,138,0.8)]"
                    : "bg-amber-200 shadow-[0_0_10px_rgba(253,230,138,1)]"
                }`}
                style={{
                  animation:
                    lightsMode === "shimmer"
                      ? `pulse ${1.5 + (i * 0.1 + j * 0.15) % 2}s infinite ease-in-out`
                      : "none",
                  opacity: lightsMode === "off" ? 0.3 : 1,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Hanging ornaments */}
      <div className="absolute inset-0 flex justify-around pointer-events-none opacity-60">
        <div className="absolute left-[20%] top-0 flex flex-col items-center">
          <div className="w-[1px] h-12 bg-white/30" />
          <div className="w-4 h-4 rounded-full border border-white/50 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
        </div>
        <div className="absolute left-[50%] top-0 flex flex-col items-center">
          <div className="w-[1px] h-24 bg-white/30" />
          <div className="w-5 h-5 rounded-full border border-white/50 bg-white/15 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
        </div>
        <div className="absolute left-[75%] top-0 flex flex-col items-center">
          <div className="w-[1px] h-16 bg-white/30" />
          <div className="w-4 h-4 rounded-full border border-white/50 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
        </div>
      </div>

      {/* 2. Interactive Yellow industrial robot arm ("TURIN") */}
      <div className="absolute bottom-[40px] left-[15%] w-[160px] h-[160px] pointer-events-none z-10">
        {/* Robot Base */}
        <div className="absolute bottom-0 left-[20px] w-[50px] h-[16px] bg-[#222222] border-t border-white/20 rounded-t" />
        <div className="absolute bottom-[16px] left-[25px] w-[40px] h-[14px] bg-[#FFCC00] rounded" />

        {/* Articulated arm group */}
        <div
          className="absolute origin-[45px_130px] w-full h-full"
          style={{ transform: `rotate(${robotAngle * 0.4}deg)` }}
        >
          {/* Main vertical boom / Lower link */}
          <div className="absolute bottom-[28px] left-[35px] w-[20px] h-[65px] bg-[#FFCC00] rounded-full border-r border-black/20 origin-bottom transform rotate-12">
            {/* Cable feed (Black hose running down the arm) */}
            <div className="absolute left-[-4px] top-4 w-2 h-12 bg-[#111111] rounded-full border border-black/30 transform -rotate-[15deg]" />
          </div>

          {/* Elbow Joint (with the decorative giant beige ribbon bow) */}
          <div className="absolute top-[50px] left-[45px] w-[22px] h-[22px] bg-[#222] rounded-full z-20">
            {/* THE GIANT DECORATIVE BOW from the photo */}
            <div className="absolute top-[-10px] left-[-16px] w-[54px] h-[40px] pointer-events-auto cursor-help" title="Festive Ribbon Bow">
              {/* Bow loop left */}
              <div className="absolute left-0 top-2 w-[24px] h-[18px] bg-[#D2B48C] border border-[#C5A073] rounded-tl-full rounded-br-full transform rotate-[15deg] shadow-lg" />
              {/* Bow loop right */}
              <div className="absolute right-0 top-2 w-[24px] h-[18px] bg-[#D2B48C] border border-[#C5A073] rounded-tr-full rounded-bl-full transform -rotate-[15deg] shadow-lg" />
              {/* Bow center knot */}
              <div className="absolute left-[20px] top-[14px] w-[14px] h-[14px] bg-[#b89569] border border-[#9b7b51] rounded-full z-30" />
              {/* Ribbon tail left */}
              <div className="absolute left-[6px] top-[22px] w-[16px] h-[20px] bg-[#D2B48C] rounded-r-sm transform rotate-[35deg] origin-top" />
              {/* Ribbon tail right */}
              <div className="absolute right-[6px] top-[22px] w-[16px] h-[20px] bg-[#D2B48C] rounded-l-sm transform -rotate-[35deg] origin-top" />
            </div>
          </div>

          {/* Outer / Upper Link */}
          <div
            className="absolute top-[48px] left-[55px] w-[85px] h-[18px] bg-[#FFCC00] rounded-full origin-left border-b border-black/20"
            style={{ transform: `rotate(${-robotAngle * 0.7}deg)` }}
          >
            {/* "TURIN" printed text on the arm */}
            <span className="absolute left-8 top-[3px] font-mono font-black text-[7px] text-black tracking-widest uppercase">
              TURIN
            </span>

            {/* Sleigh Assembly on Flange */}
            <div className="absolute right-[-24px] top-[-15px] w-[45px] h-[35px] flex flex-col items-center">
              {/* Santa's sleigh */}
              <div className="relative w-[32px] h-[16px] bg-[#DC2626] border border-red-700 rounded-b-md shadow-md">
                {/* Gold runner runners */}
                <div className="absolute bottom-[-4px] left-[-4px] right-[-4px] h-[3px] bg-[#F59E0B] rounded-full" />
                {/* Tiny Santa Claus */}
                <div className="absolute top-[-10px] right-[4px] w-4 h-4 flex flex-col items-center">
                  <div className="w-3.5 h-3.5 bg-red-600 rounded-full border border-white" />
                  <div className="absolute top-[-3px] w-2 h-2 bg-white rounded-full" /> {/* Hat tip */}
                  <div className="absolute bottom-0 w-3 h-1.5 bg-white rounded-full opacity-90" /> {/* Beard */}
                </div>
                {/* Tiny Gifts */}
                <div className="absolute top-[-6px] left-[4px] w-2 h-2 bg-blue-500 rounded-sm" />
                <div className="absolute top-[-5px] left-[10px] w-1.5 h-1.5 bg-amber-400 rounded-sm" />
              </div>

              {/* Leading reindeer */}
              <div className="absolute right-[-14px] top-[4px] w-4 h-5 flex flex-col items-center">
                <div className="w-3 h-3.5 bg-amber-800 rounded-sm" />
                {/* Antlers */}
                <div className="absolute top-[-3px] left-[1px] right-[1px] flex justify-between">
                  <div className="w-[1px] h-2.5 bg-amber-900 transform -rotate-12" />
                  <div className="w-[1px] h-2.5 bg-amber-900 transform rotate-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deep Fluffy Snow Layer (Multi-tiered for depth) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-100 to-white z-20 shadow-[0_-4px_20px_rgba(255,255,255,0.25)]">
        {/* Soft drift curves */}
        <div className="absolute bottom-[10px] left-[-10%] w-[60%] h-[30px] bg-slate-50 border-t border-white/50 rounded-t-[100px] transform rotate-3" />
        <div className="absolute bottom-[5px] right-[-10%] w-[60%] h-[35px] bg-white border-t border-white/40 rounded-t-[100px] transform -rotate-2" />
      </div>

      {/* 4. Miniature Wooden Village Houses nestled in the snow */}
      {/* Village element 1: Main arched nativity house */}
      <div className="absolute bottom-[24px] left-[42%] w-[65px] h-[45px] z-20 flex flex-col items-center">
        {/* Wooden Arch roof */}
        <div className="w-full h-8 border-t-4 border-l-2 border-r-2 border-[#8B5A2B] rounded-t-full bg-black/60 relative overflow-hidden">
          {/* Golden inner scene glow */}
          <div
            className={`absolute inset-0 bg-amber-400/80 transition-opacity duration-1000 flex items-end justify-center pb-0.5 ${
              villageLights ? "opacity-100 shadow-[0_0_12px_#FBBF24]" : "opacity-0"
            }`}
          >
            {/* Silhouetted figures inside */}
            <div className="flex gap-1 items-end z-10">
              <div className="w-2 h-4 bg-[#4A2E16] rounded-t" />
              <div className="w-1.5 h-3 bg-[#4A2E16] rounded-t" />
              <div className="w-2 h-2.5 bg-[#4A2E16] rounded-full" />
            </div>
          </div>
        </div>
        {/* Wooden support base */}
        <div className="w-[75px] h-[5px] bg-[#8B5A2B] rounded" />
      </div>

      {/* Village element 2: Two-story winter cottage (Image 1 top right of snow) */}
      <div className="absolute bottom-[30px] right-[24%] w-[55px] h-[50px] z-20 flex flex-col items-center">
        {/* Slanted wooden roof */}
        <div className="w-[62px] h-[14px] bg-[#6B4423] rounded-t border-b border-black/30 transform -rotate-12 flex justify-center">
          {/* Snow on roof */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-white rounded-t" />
        </div>
        {/* House body with windows */}
        <div className="w-[48px] h-[36px] bg-[#D7C49E] border border-[#B09C75] relative flex flex-wrap gap-2 p-1.5 justify-center items-center">
          {/* Cozy glowing windows */}
          <div
            className={`w-3.5 h-3.5 bg-amber-400 transition-all duration-1000 border border-[#8B7355] ${
              villageLights ? "shadow-[0_0_8px_#FBBF24] opacity-100" : "opacity-30 bg-gray-500"
            }`}
          />
          <div
            className={`w-3.5 h-3.5 bg-amber-400 transition-all duration-1000 border border-[#8B7355] ${
              villageLights ? "shadow-[0_0_8px_#FBBF24] opacity-100" : "opacity-30 bg-gray-500"
            }`}
          />
        </div>
      </div>

      {/* Village element 3: Small white church (Image 1 bottom right) */}
      <div className="absolute bottom-[16px] right-[10%] w-[45px] h-[60px] z-30 flex flex-col items-center">
        {/* Church spire */}
        <div className="w-5 h-16 bg-white border-l border-r border-slate-300 relative flex flex-col items-center">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-b-[#DC2626] absolute top-[-20px]" />
          {/* Bell arch glow */}
          <div
            className={`w-2.5 h-3 rounded-t-full mt-4 transition-colors duration-1000 ${
              villageLights ? "bg-amber-400 shadow-[0_0_6px_#FBBF24]" : "bg-slate-300"
            }`}
          />
          {/* Church body */}
          <div className="absolute bottom-0 w-[42px] h-[24px] bg-white border-t border-slate-200" />
        </div>
      </div>

      {/* 5. Decorative foliage & flowers from Image 1 */}
      {/* Tall white lily/amaryllis */}
      <div className="absolute bottom-[20px] right-[38%] w-12 h-20 pointer-events-none z-20 flex flex-col items-center">
        {/* Green stems */}
        <div className="w-1 h-14 bg-emerald-800 rounded-full" />
        {/* Large white flower blossoms */}
        <div className="absolute top-0 flex gap-1 justify-center">
          <div className="w-3.5 h-3.5 bg-white border border-emerald-200 rounded-full shadow-sm" />
          <div className="w-3.5 h-3.5 bg-white border border-emerald-200 rounded-full shadow-sm" />
        </div>
      </div>

      {/* Small green bottle-brush trees */}
      <div className="absolute bottom-[22px] left-[38%] w-5 h-10 pointer-events-none z-20 flex flex-col items-center">
        <div className="w-[1.5px] h-3 bg-[#5A3825]" />
        <div className="absolute top-0 w-4 h-8 bg-emerald-950/90 border border-emerald-800 rounded-full shadow-sm" />
      </div>
      <div className="absolute bottom-[22px] right-[5%] w-4 h-8 pointer-events-none z-30 flex flex-col items-center">
        <div className="w-[1px] h-2 bg-[#5A3825]" />
        <div className="absolute top-0 w-3.5 h-6.5 bg-emerald-950/90 border border-emerald-800 rounded-full shadow-sm" />
      </div>

      {/* 6. SPONSOR BANNER (HUITTINEN, samk, SATAKUNTALIITTO, European Union) */}
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

      {/* 7. Foreground interactive controls panel */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-40 bg-black/75 backdrop-blur-md px-2.5 py-1.5 border border-white/10 rounded-sm">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1 rounded-xs bg-white/10 hover:bg-safety-orange text-white transition-colors cursor-pointer"
          title={isPlaying ? "Pause Robot" : "Play Robot"}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>

        <button
          onClick={() => {
            if (lightsMode === "shimmer") setLightsMode("glow");
            else if (lightsMode === "glow") setLightsMode("off");
            else setLightsMode("shimmer");
          }}
          className={`p-1 rounded-xs transition-colors cursor-pointer ${
            lightsMode !== "off" ? "bg-amber-400/20 text-amber-300" : "bg-white/10 text-white/50"
          } hover:bg-white/20`}
          title="Toggle Fairy Lights"
        >
          <Sparkles className="w-3 h-3" />
        </button>

        <button
          onClick={() => setVillageLights(!villageLights)}
          className={`p-1 rounded-xs transition-colors cursor-pointer ${
            villageLights ? "bg-amber-400/20 text-amber-300" : "bg-white/10 text-white/50"
          } hover:bg-white/20`}
          title="Toggle Village Lights"
        >
          <Lightbulb className="w-3 h-3" />
        </button>

        <div className="h-4 w-[1px] bg-white/20 mx-0.5" />

        <div className="flex items-center gap-1 font-mono text-[8px] text-white/80 uppercase">
          <Compass className="w-2.5 h-2.5 text-safety-orange animate-spin" style={{ animationDuration: isPlaying ? "4s" : "0s" }} />
          <span>CYC_ACT: {(robotAngle + 15).toFixed(0)}°</span>
        </div>
      </div>

      {/* Decorative window glass reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30" />
    </div>
  );
}
