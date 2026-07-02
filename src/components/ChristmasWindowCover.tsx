/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export default function ChristmasWindowCover() {
  return (
    <div className="relative w-full h-full bg-[#0c1020] overflow-hidden">
      {/* 1. Cozy warm glowing backdrop curtain lights */}
      <div className="absolute inset-0 flex justify-around opacity-30 px-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center h-full gap-2 pt-1">
            <div className="w-[1px] h-12 bg-white/10" />
            {[...Array(3)].map((_, j) => (
              <div key={j} className="w-1 h-1 rounded-full bg-amber-100 shadow-[0_0_4px_rgba(253,230,138,0.5)] animate-pulse" style={{ animationDelay: `${i*200}ms` }} />
            ))}
          </div>
        ))}
      </div>

      {/* 2. Stylized Yellow Robot Arm carrying Santa's Sleigh */}
      <div className="absolute bottom-[20px] left-[15%] w-[120px] h-[100px] pointer-events-none z-10">
        {/* Base */}
        <div className="absolute bottom-0 left-[15px] w-[30px] h-[8px] bg-slate-800 rounded-t" />
        
        {/* Arm segments */}
        <div className="absolute bottom-[8px] left-[22px] w-[12px] h-[40px] bg-[#FFCC00] rounded-full border-r border-black/10 transform rotate-12">
          {/* Cable feed */}
          <div className="absolute left-[-2px] top-2 w-[5px] h-6 bg-[#222] rounded-full" />
        </div>

        {/* Elbow Ribbon Bow (signature feature) */}
        <div className="absolute bottom-[40px] left-[26px] w-[14px] h-[14px] bg-[#222] rounded-full z-20 flex items-center justify-center">
          <div className="absolute w-[22px] h-[14px] bg-[#D2B48C] border border-[#C5A073] rounded-full opacity-90 shadow-sm" />
          <div className="w-[4px] h-[4px] bg-[#9b7b51] rounded-full z-30" />
        </div>

        {/* Upper arm segment extending out */}
        <div className="absolute bottom-[42px] left-[32px] w-[50px] h-[10px] bg-[#FFCC00] rounded-full transform -rotate-[15deg] origin-left border-b border-black/10">
          {/* Sleigh element */}
          <div className="absolute right-[-14px] top-[-8px] w-[20px] h-[10px] bg-[#DC2626] rounded-b border border-red-700 shadow-sm flex items-center justify-center">
            {/* Santa dot */}
            <div className="w-2 h-2 bg-red-500 rounded-full border border-white absolute top-[-5px] right-[2px]" />
            {/* Reindeer dot */}
            <div className="w-1.5 h-2 bg-amber-800 rounded-sm absolute top-[-2px] right-[-6px]" />
          </div>
        </div>
      </div>

      {/* 3. Pure white cotton snow blanket at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-100 to-white z-10 shadow-[0_-2px_10px_rgba(255,255,255,0.2)]">
        <div className="absolute bottom-1 left-[-5%] w-[60%] h-6 bg-slate-50 rounded-t-[50px] transform rotate-2" />
        <div className="absolute bottom-0 right-[-5%] w-[60%] h-6 bg-white rounded-t-[50px] transform -rotate-1" />
      </div>

      {/* 4. Little silhouetted wooden houses glowing in the snow */}
      <div className="absolute bottom-[8px] right-[20%] w-[32px] h-[22px] z-10 bg-black/60 rounded-t-full border-t border-[#8B5A2B] relative overflow-hidden flex items-end justify-center pb-0.5">
        {/* Glow */}
        <div className="absolute inset-0 bg-amber-400/80 shadow-[0_0_6px_#FBBF24]" />
      </div>

      {/* Decorative window frame highlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />
    </div>
  );
}
