/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export default function GripperCoverPreview() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#eef1f6] flex items-center justify-center">
      {/* Lab background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 opacity-80" />
      
      {/* Silver lab ventilation pipes in background */}
      <div className="absolute left-1/4 -bottom-10 w-12 h-[120%] bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 opacity-30 rounded-full" />
      <div className="absolute left-1/2 -bottom-10 w-16 h-[120%] bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 opacity-25 rounded-full" />
      <div className="absolute left-3/4 -bottom-10 w-12 h-[120%] bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 opacity-35 rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-900/10 to-slate-900/30" />

      {/* Yellow Turin Industrial Robot Arm holding the gripper from the left */}
      <div className="absolute left-[-20px] top-[45%] -translate-y-1/2 w-[90px] h-[70px] z-10 flex items-center">
        {/* Yellow link */}
        <div className="w-[60px] h-10 bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-500 rounded-r-lg border border-yellow-600 shadow-md flex items-center justify-end pr-2">
          <span className="font-mono text-[6px] text-yellow-950 font-bold tracking-widest uppercase">TURIN</span>
        </div>
        {/* Black flange connection joint */}
        <div className="w-6 h-12 bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700 rounded-sm shadow-inner" />
      </div>

      {/* Main Gripper Assembly Group */}
      <div className="relative w-[190px] h-[260px] bg-gradient-to-br from-zinc-300 via-zinc-100 to-zinc-400 border border-zinc-400 rounded shadow-2xl flex items-center justify-center p-3">
        {/* Steel Plate Texture Lines / Screws */}
        <div className="absolute inset-2 border border-zinc-400/40 rounded-sm pointer-events-none" />
        {/* Surface reflection */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 skew-y-12 pointer-events-none" />

        {/* Center circle mounting pattern (6 screws for the robotic flange) */}
        <div className="absolute w-12 h-12 rounded-full border border-zinc-400/80 flex items-center justify-center opacity-70">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-600 border border-zinc-400 shadow-inner" />
            ))}
          </div>
        </div>

        {/* Left Vertical Aluminum Extrusion Rail (Item 3) */}
        <div className="absolute left-4 top-2 bottom-2 w-5 bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 border-x border-zinc-400 shadow-md flex justify-center">
          {/* Extrusion center slot */}
          <div className="w-1 h-full bg-zinc-600 border-x border-zinc-400" />
        </div>

        {/* Right Vertical Aluminum Extrusion Rail (Item 3) */}
        <div className="absolute right-4 top-2 bottom-2 w-5 bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 border-x border-zinc-400 shadow-md flex justify-center">
          {/* Extrusion center slot */}
          <div className="w-1 h-full bg-zinc-600 border-x border-zinc-400" />
        </div>

        {/* Horizontal Pneumatic Cylinders (Item 8) with White Brackets */}
        {/* Top Pneumatic Cylinder (Facing Left) */}
        <div className="absolute top-[35%] left-7 right-7 h-5 flex items-center">
          {/* Left-side white sliding bracket */}
          <div className="w-4 h-6 bg-slate-50 border border-zinc-300 rounded shadow-sm z-10" />
          {/* Silver Piston Rod */}
          <div className="w-[40px] h-1.5 bg-gradient-to-b from-zinc-300 to-zinc-100 border border-zinc-400" />
          {/* Cylinder Body */}
          <div className="flex-grow h-4 bg-gradient-to-b from-zinc-400 via-zinc-200 to-zinc-500 border border-zinc-500 rounded-sm shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-full bg-blue-500 opacity-20" /> {/* Pneumatic air line band */}
          </div>
          {/* Right-side white stationary bracket */}
          <div className="w-4 h-6 bg-slate-50 border border-zinc-300 rounded shadow-sm z-10" />
        </div>

        {/* Bottom Pneumatic Cylinder (Facing Right) */}
        <div className="absolute bottom-[35%] left-7 right-7 h-5 flex items-center">
          {/* Left-side white stationary bracket */}
          <div className="w-4 h-6 bg-slate-50 border border-zinc-300 rounded shadow-sm z-10" />
          {/* Cylinder Body */}
          <div className="flex-grow h-4 bg-gradient-to-b from-zinc-400 via-zinc-200 to-zinc-500 border border-zinc-500 rounded-sm shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-full bg-blue-500 opacity-20" />
          </div>
          {/* Silver Piston Rod */}
          <div className="w-[40px] h-1.5 bg-gradient-to-b from-zinc-300 to-zinc-100 border border-zinc-400" />
          {/* Right-side white sliding bracket */}
          <div className="w-4 h-6 bg-slate-50 border border-zinc-300 rounded shadow-sm z-10" />
        </div>

        {/* Hot Pink 3D Printed Corner Clamping Hooks (FDM PETG - Item 2) */}
        {/* Top Left Claw */}
        <div className="absolute left-[3px] top-[-2px] w-8 h-10 flex flex-col items-end z-20">
          <div className="w-8 h-6 bg-gradient-to-br from-pink-500 via-pink-400 to-pink-600 rounded-t-sm border border-pink-400 shadow-md flex items-center justify-center">
            <div className="w-1 h-3 bg-pink-700/50 rounded-full" />
          </div>
          {/* Gripper hook projection extending outwards */}
          <div className="w-5 h-4 bg-gradient-to-br from-pink-500 to-pink-600 border-x border-b border-pink-400 rounded-b-md shadow-sm" style={{ transform: "skewX(-10deg)" }} />
        </div>

        {/* Top Right Claw */}
        <div className="absolute right-[3px] top-[-2px] w-8 h-10 flex flex-col items-start z-20">
          <div className="w-8 h-6 bg-gradient-to-br from-pink-500 via-pink-400 to-pink-600 rounded-t-sm border border-pink-400 shadow-md flex items-center justify-center">
            <div className="w-1 h-3 bg-pink-700/50 rounded-full" />
          </div>
          <div className="w-5 h-4 bg-gradient-to-br from-pink-500 to-pink-600 border-x border-b border-pink-400 rounded-b-md shadow-sm" style={{ transform: "skewX(10deg)" }} />
        </div>

        {/* Bottom Left Claw */}
        <div className="absolute left-[3px] bottom-[-2px] w-8 h-10 flex flex-col items-end justify-end z-20">
          {/* Gripper hook projection extending outwards */}
          <div className="w-5 h-4 bg-gradient-to-tr from-pink-600 to-pink-500 border-x border-t border-pink-400 rounded-t-md shadow-sm" style={{ transform: "skewX(10deg)" }} />
          <div className="w-8 h-6 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 rounded-b-sm border border-pink-400 shadow-md flex items-center justify-center">
            <div className="w-1 h-3 bg-pink-700/50 rounded-full" />
          </div>
        </div>

        {/* Bottom Right Claw */}
        <div className="absolute right-[3px] bottom-[-2px] w-8 h-10 flex flex-col items-start justify-end z-20">
          <div className="w-5 h-4 bg-gradient-to-tr from-pink-600 to-pink-500 border-x border-t border-pink-400 rounded-t-md shadow-sm" style={{ transform: "skewX(-10deg)" }} />
          <div className="w-8 h-6 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 rounded-b-sm border border-pink-400 shadow-md flex items-center justify-center">
            <div className="w-1 h-3 bg-pink-700/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Industrial Overlay Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      {/* Blueprint technical border mask */}
      <div className="absolute inset-3 border border-zinc-400/20 pointer-events-none" />
    </div>
  );
}
