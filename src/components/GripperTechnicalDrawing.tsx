/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react";

export default function GripperTechnicalDrawing() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 4));
  const zoomOut = () => {
    setZoom((prev) => {
      const nextZoom = Math.max(prev - 0.25, 1);
      if (nextZoom === 1) {
        setPan({ x: 0, y: 0 });
      }
      return nextZoom;
    });
  };

  const resetZoomPan = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="w-full flex flex-col bg-white overflow-hidden relative shadow-inner select-none h-[500px] md:h-[600px]">
      
      {/* Zoom / Pan Stage Wrapper */}
      <div
        className={`flex-grow w-full h-full flex items-center justify-center overflow-hidden bg-white ${
          zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={(e) => {
          if (e.deltaY < 0) {
            zoomIn();
          } else {
            zoomOut();
          }
        }}
        style={{ touchAction: "none" }}
      >
        <div
          className="w-full max-w-5xl p-6 transition-transform duration-150 ease-out origin-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
          draggable="false"
        >
          <svg
            viewBox="0 0 950 640"
            className="w-full h-auto select-none font-sans"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))" }}
          >
            {/* Outer Drawing Border (A3 Sheet Layout) */}
            <rect x="15" y="15" width="920" height="610" fill="none" stroke="#27272a" strokeWidth="2" />
            
            {/* Inner Margin Border line */}
            <rect x="25" y="25" width="900" height="590" fill="none" stroke="#27272a" strokeWidth="1" />

            {/* Grid Reference Markers (Letters A-F, Numbers 1-8) */}
            <g className="fill-zinc-400 font-mono text-[9px] font-bold">
              {/* Horizontal reference numbers */}
              <text x="80" y="21" textAnchor="middle">8</text>
              <text x="190" y="21" textAnchor="middle">7</text>
              <text x="300" y="21" textAnchor="middle">6</text>
              <text x="410" y="21" textAnchor="middle">5</text>
              <text x="520" y="21" textAnchor="middle">4</text>
              <text x="630" y="21" textAnchor="middle">3</text>
              <text x="740" y="21" textAnchor="middle">2</text>
              <text x="850" y="21" textAnchor="middle">1</text>

              <text x="80" y="611" textAnchor="middle">8</text>
              <text x="190" y="611" textAnchor="middle">7</text>
              <text x="300" y="611" textAnchor="middle">6</text>
              <text x="410" y="611" textAnchor="middle">5</text>
              <text x="520" y="611" textAnchor="middle">4</text>
              <text x="630" y="611" textAnchor="middle">3</text>
              <text x="740" y="611" textAnchor="middle">2</text>
              <text x="850" y="611" textAnchor="middle">1</text>

              {/* Vertical reference letters */}
              <text x="21" y="80" dominantBaseline="middle">F</text>
              <text x="21" y="170" dominantBaseline="middle">E</text>
              <text x="21" y="260" dominantBaseline="middle">D</text>
              <text x="21" y="350" dominantBaseline="middle">C</text>
              <text x="21" y="440" dominantBaseline="middle">B</text>
              <text x="21" y="530" dominantBaseline="middle">A</text>

              <text x="929" y="80" dominantBaseline="middle">F</text>
              <text x="929" y="170" dominantBaseline="middle">E</text>
              <text x="929" y="260" dominantBaseline="middle">D</text>
              <text x="929" y="350" dominantBaseline="middle">C</text>
              <text x="929" y="440" dominantBaseline="middle">B</text>
              <text x="929" y="530" dominantBaseline="middle">A</text>
            </g>

            {/* Grid Tick marks */}
            <g stroke="#d4d4d8" strokeWidth="1">
              {[80, 190, 300, 410, 520, 630, 740, 850].map((x, i) => (
                <React.Fragment key={`h-${i}`}>
                  <line x1={x} y1="15" x2={x} y2="25" />
                  <line x1={x} y1="615" x2={x} y2="625" />
                </React.Fragment>
              ))}
              {[80, 170, 260, 350, 440, 530].map((y, i) => (
                <React.Fragment key={`v-${i}`}>
                  <line x1="15" y1={y} x2="25" y2={y} />
                  <line x1="915" y1={y} x2="925" y2={y} />
                </React.Fragment>
              ))}
            </g>

            {/* VIEW 1: TOP ASSEMBLY VIEW (Top-Left quadrant) */}
            <g transform="translate(10, 0)">
              <text x="230" y="45" className="fill-zinc-800 font-mono text-[10px] font-bold" textAnchor="middle">
                VIEW A-A // TOP ASSEMBLY VIEW
              </text>
              
              {/* 1. Base Plate Aluminum */}
              <rect x="80" y="70" width="300" height="220" rx="3" className="stroke-[1.2] stroke-zinc-800 fill-zinc-50" />

              {/* 3. Vertical Frame Supporting Rods */}
              <g>
                <rect x="110" y="70" width="16" height="220" className="stroke-[1] stroke-zinc-700 fill-zinc-100/30" />
                <line x1="118" y1="70" x2="118" y2="290" className="stroke-zinc-400 stroke-dasharray-[1,2]" />
                <rect x="334" y="70" width="16" height="220" className="stroke-[1] stroke-zinc-700 fill-zinc-100/30" />
                <line x1="342" y1="70" x2="342" y2="290" className="stroke-zinc-400 stroke-dasharray-[1,2]" />
              </g>

              {/* 1. Horizontal Guide Rails */}
              <g>
                <rect x="80" y="100" width="300" height="10" className="stroke-[1] stroke-zinc-600 fill-zinc-200" />
                <rect x="80" y="250" width="300" height="10" className="stroke-[1] stroke-zinc-600 fill-zinc-200" />
              </g>

              {/* 4. Sliding blocks */}
              <g>
                <rect x="105" y="95" width="26" height="20" rx="1" className="stroke-[1] stroke-zinc-600 fill-zinc-300" />
                <rect x="329" y="95" width="26" height="20" rx="1" className="stroke-[1] stroke-zinc-600 fill-zinc-300" />
                <rect x="105" y="245" width="26" height="20" rx="1" className="stroke-[1] stroke-zinc-600 fill-zinc-300" />
                <rect x="329" y="245" width="26" height="20" rx="1" className="stroke-[1] stroke-zinc-600 fill-zinc-300" />
              </g>

              {/* 8. Pneumatic Cylinder bodies */}
              <g>
                <rect x="180" y="118" width="100" height="15" rx="1" className="stroke-[1] stroke-zinc-700 fill-zinc-100" />
                <rect x="185" y="121" width="10" height="9" className="stroke-zinc-500 fill-zinc-300" />
                <rect x="265" y="121" width="10" height="9" className="stroke-zinc-500 fill-zinc-300" />
                <rect x="180" y="227" width="100" height="15" rx="1" className="stroke-[1] stroke-zinc-700 fill-zinc-100" />
                <rect x="185" y="230" width="10" height="9" className="stroke-zinc-500 fill-zinc-300" />
                <rect x="265" y="230" width="10" height="9" className="stroke-zinc-500 fill-zinc-300" />
              </g>

              {/* 9. Pneumatic Piston Rods */}
              <g>
                <rect x="131" y="122" width="49" height="7" className="stroke-[1] stroke-zinc-600 fill-zinc-200" />
                <rect x="280" y="231" width="49" height="7" className="stroke-[1] stroke-zinc-600 fill-zinc-200" />
              </g>

              {/* 7. Actuator Mount Brackets / Holders */}
              <g>
                <rect x="123" y="115" width="8" height="21" className="stroke-zinc-600 fill-zinc-400" />
                <rect x="280" y="115" width="8" height="21" className="stroke-zinc-600 fill-zinc-400" />
                <rect x="172" y="224" width="8" height="21" className="stroke-zinc-600 fill-zinc-400" />
                <rect x="329" y="224" width="8" height="21" className="stroke-zinc-600 fill-zinc-400" />
              </g>

              {/* 5. Central ISO-Flange Robotic Plate */}
              <g>
                <circle cx="230" cy="180" r="34" className="stroke-2 stroke-zinc-700 fill-zinc-100/50" />
                <circle cx="230" cy="180" r="22" stroke="#71717a" strokeDasharray="3,1" fill="none" />
                {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 230 + 22 * Math.cos(rad);
                  const cy = 180 + 22 * Math.sin(rad);
                  return (
                    <circle key={idx} cx={cx} cy={cy} r="2" fill="none" stroke="#27272a" strokeWidth="1" />
                  );
                })}
                <line x1="230" y1="140" x2="230" y2="220" stroke="#a1a1aa" strokeWidth="0.8" strokeDasharray="5,2,2,2" />
                <line x1="190" y1="180" x2="270" y2="180" stroke="#a1a1aa" strokeWidth="0.8" strokeDasharray="5,2,2,2" />
              </g>

              {/* DIMENSIONS VIEW A-A */}
              <g className="stroke-zinc-500 stroke-[0.8] fill-zinc-600 text-[8px] font-mono">
                <line x1="60" y1="60" x2="400" y2="60" />
                <line x1="60" y1="56" x2="60" y2="64" />
                <line x1="400" y1="56" x2="400" y2="64" />
                <text x="230" y="52" textAnchor="middle" className="font-bold fill-zinc-700">496.00</text>

                <line x1="105" y1="87" x2="131" y2="87" />
                <line x1="105" y1="84" x2="105" y2="90" />
                <line x1="131" y1="84" x2="131" y2="90" />
                <text x="118" y="82" textAnchor="middle" className="text-[7px]">26.00</text>

                <line x1="172" y1="150" x2="180" y2="150" />
                <line x1="172" y1="147" x2="172" y2="153" />
                <line x1="180" y1="147" x2="180" y2="153" />
                <text x="176" y="144" textAnchor="middle" className="text-[7px]">13.00</text>

                <line x1="230" y1="180" x2="264" y2="214" strokeDasharray="1,1" />
                <circle cx="264" cy="214" r="1.5" className="fill-zinc-600" />
                <text x="268" y="222" className="text-[7px] font-bold">Ø 44.00</text>
              </g>
            </g>

            {/* VIEW 2: FRONT/SECTIONAL VIEW B-B (Bottom-Left quadrant) */}
            <g transform="translate(10, 310)">
              <text x="230" y="40" className="fill-zinc-800 font-mono text-[10px] font-bold" textAnchor="middle">
                SECTION B-B // FRONT VIEW
              </text>

              {/* Side profiles of base plate */}
              <rect x="80" y="70" width="300" height="12" className="stroke-[1] stroke-zinc-700 fill-zinc-100" />

              {/* Guide rails linear bars */}
              <rect x="80" y="82" width="300" height="6" className="stroke-zinc-600 fill-zinc-300" />

              {/* Supporting Frame Rod */}
              <rect x="110" y="60" width="16" height="10" className="stroke-zinc-700 fill-zinc-200" />
              <rect x="334" y="60" width="16" height="10" className="stroke-zinc-700 fill-zinc-200" />

              {/* Clamping Claws hooks (FDM Pink PETG) */}
              <g>
                <path d="M 62 70 L 80 70 L 80 82 L 72 82 L 72 135 L 56 135 L 56 120 L 66 120 L 66 82 L 62 82 Z" className="stroke-pink-500 fill-pink-500/15" />
                <path d="M 398 70 L 380 70 L 380 82 L 388 82 L 388 135 L 404 135 L 404 120 L 394 120 L 394 82 L 398 82 Z" className="stroke-pink-500 fill-pink-500/15" />
              </g>

              {/* Slider blocks */}
              <rect x="105" y="88" width="26" height="10" className="stroke-zinc-500 fill-zinc-200" />
              <rect x="329" y="88" width="26" height="10" className="stroke-zinc-500 fill-zinc-200" strokeDasharray="2,1" />

              {/* DIMENSIONS VIEW B-B */}
              <g className="stroke-zinc-500 stroke-[0.8] fill-zinc-600 text-[8px] font-mono">
                <line x1="390" y1="70" x2="390" y2="82" />
                <line x1="387" y1="70" x2="393" y2="70" />
                <line x1="387" y1="82" x2="393" y2="82" />
                <text x="396" y="79" className="text-[7px] font-bold">8.00</text>

                <line x1="48" y1="82" x2="48" y2="135" />
                <line x1="45" y1="82" x2="51" y2="82" />
                <line x1="45" y1="135" x2="51" y2="135" />
                <text x="40" y="112" textAnchor="end" className="text-[7px]">53.00</text>
              </g>
            </g>

            {/* VIEW 3: SIDE ASSEMBLY VIEW C-C (Top-Right quadrant) */}
            <g transform="translate(460, 0)">
              <text x="140" y="45" className="fill-zinc-800 font-mono text-[10px] font-bold" textAnchor="middle">
                VIEW C-C // SIDE ASSEMBLY VIEW
              </text>

              {/* Base Plate in side profile */}
              <rect x="110" y="70" width="12" height="220" className="stroke-zinc-700 fill-zinc-100" />

              {/* Linear guide frame supporting rods */}
              <rect x="122" y="70" width="8" height="220" className="stroke-zinc-600 fill-zinc-200" />

              {/* Slider blocks side */}
              <rect x="130" y="95" width="16" height="20" className="stroke-zinc-500 fill-zinc-300" />
              <rect x="130" y="245" width="16" height="20" className="stroke-zinc-500 fill-zinc-300" />

              {/* Actuator bodies side profile */}
              <circle cx="155" cy="125" r="7" className="stroke-zinc-600 fill-zinc-200" />
              <circle cx="155" cy="234" r="7" className="stroke-zinc-600 fill-zinc-200" />

              {/* Actuator Mount brackets side */}
              <rect x="146" y="118" width="18" height="14" rx="1" className="stroke-zinc-500 fill-zinc-300" strokeDasharray="1,1" />
              <rect x="146" y="227" width="18" height="14" rx="1" className="stroke-zinc-500 fill-zinc-300" strokeDasharray="1,1" />

              {/* Pink clamp claws side profile */}
              <g>
                <path d="M 122 70 L 140 70 L 140 105 L 146 105 L 146 95 L 130 95 L 130 82 L 122 82 Z" className="stroke-pink-500 fill-pink-500/15" />
                <path d="M 122 290 L 140 290 L 140 255 L 146 255 L 146 265 L 130 265 L 130 278 L 122 278 Z" className="stroke-pink-500 fill-pink-500/15" />
              </g>

              {/* DIMENSIONS VIEW C-C */}
              <g className="stroke-zinc-500 stroke-[0.8] fill-zinc-600 text-[8px] font-mono">
                <line x1="110" y1="300" x2="168" y2="300" />
                <line x1="110" y1="296" x2="110" y2="304" />
                <line x1="168" y1="296" x2="168" y2="304" />
                <text x="139" y="312" textAnchor="middle" className="font-bold fill-zinc-700">58.00</text>

                <line x1="110" y1="65" x2="122" y2="65" />
                <line x1="110" y1="62" x2="110" y2="68" />
                <line x1="122" y1="62" x2="122" y2="68" />
                <text x="116" y="59" textAnchor="middle" className="text-[7px]">10.00</text>

                <path d="M 140 70 L 155 58" strokeDasharray="1,1" />
                <circle cx="155" cy="58" r="1.5" className="fill-zinc-600" />
                <text x="158" y="56" className="text-[7px]">R 2.50</text>
              </g>
            </g>

            {/* VIEW 4: ISOMETRIC 3D WIREFRAME VIEW (Middle-Right quadrant) */}
            <g transform="translate(460, 310)">
              <text x="210" y="20" className="fill-zinc-800 font-mono text-[10px] font-bold" textAnchor="middle">
                3D ISOMETRIC ASSEMBLY WIREFRAME
              </text>

              <g transform="matrix(0.85 0 -0.25 0.55 120 70)">
                <rect x="-60" y="-90" width="180" height="130" rx="1" className="stroke-[1] stroke-zinc-700 fill-zinc-50/10" />
                <line x1="-40" y1="-90" x2="-40" y2="40" className="stroke-[1] stroke-zinc-600" />
                <line x1="100" y1="-90" x2="100" y2="40" className="stroke-[1] stroke-zinc-600" />
                <line x1="-60" y1="-70" x2="120" y2="-70" className="stroke-[1.2] stroke-zinc-600" />
                <line x1="-60" y1="20" x2="120" y2="20" className="stroke-[1.2] stroke-zinc-600" />
                <rect x="-45" y="-75" width="10" height="10" className="stroke-zinc-600 fill-zinc-200" />
                <rect x="95" y="-75" width="10" height="10" className="stroke-zinc-600 fill-zinc-200" />
                <rect x="-45" y="15" width="10" height="10" className="stroke-zinc-600 fill-zinc-200" />
                <rect x="95" y="15" width="10" height="10" className="stroke-zinc-600 fill-zinc-200" />
                <rect x="0" y="-60" width="50" height="8" className="stroke-zinc-600 fill-zinc-200" />
                <rect x="10" y="5" width="50" height="8" className="stroke-zinc-600 fill-zinc-200" />
                <line x1="-30" y1="-56" x2="0" y2="-56" className="stroke-2 stroke-zinc-500" />
                <line x1="60" y1="9" x2="90" y2="9" className="stroke-2 stroke-zinc-500" />
                <circle cx="30" cy="-25" r="16" className="fill-none stroke-zinc-500" />
                <rect x="-65" y="-85" width="8" height="12" className="stroke-pink-500 fill-pink-500/10" />
                <rect x="115" y="-85" width="8" height="12" className="stroke-pink-500 fill-pink-500/10" />
                <rect x="-65" y="10" width="8" height="12" className="stroke-pink-500 fill-pink-500/10" />
                <rect x="115" y="10" width="8" height="12" className="stroke-pink-500 fill-pink-500/10" />
              </g>

              {/* BALLOON CALLOUTS (Numbered Bubble circles 1 to 9 with precise leader lines) */}
              <g className="font-mono text-[9px] font-bold">
                {/* Bubble 1: original linr slider */}
                <path d="M 60 120 L 40 140" stroke="#71717a" strokeWidth="0.8" fill="none" />
                <circle cx="60" cy="120" r="1.5" fill="#27272a" />
                <circle cx="33" cy="147" r="8" fill="white" stroke="#27272a" strokeWidth="1" />
                <text x="33" y="150" textAnchor="middle" className="fill-zinc-800">1</text>

                {/* Bubble 2: original hook */}
                <path d="M 235 90 L 265 65" stroke="#71717a" strokeWidth="0.8" fill="none" />
                <circle cx="235" cy="90" r="1.5" fill="#27272a" />
                <circle cx="272" cy="58" r="8" fill="white" stroke="#27272a" strokeWidth="1" />
                <text x="272" y="61" textAnchor="middle" className="fill-zinc-800">2</text>

                {/* Bubble 3: original frame rod */}
                <path d="M 85 100 L 60 75" stroke="#71717a" strokeWidth="0.8" fill="none" />
                <circle cx="85" cy="100" r="1.5" fill="#27272a" />
                <circle cx="53" cy="68" r="8" fill="white" stroke="#27272a" strokeWidth="1" />
                <text x="53" y="71" textAnchor="middle" className="fill-zinc-800">3</text>

                {/* Bubble 4: original slider */}
                <path d="M 215 110 L 235 130" stroke="#71717a" strokeWidth="0.8" fill="none" />
                <circle cx="215" cy="110" r="1.5" fill="#27272a" />
                <circle cx="242" cy="137" r="8" fill="white" stroke="#27272a" strokeWidth="1" />
                <text x="242" y="140" textAnchor="middle" className="fill-zinc-800">4</text>

                {/* Bubble 5: Part1^Gripper */}
                <path d="M 150 145 L 120 165" stroke="#71717a" strokeWidth="0.8" fill="none" />
                <circle cx="150" cy="145" r="1.5" fill="#27272a" />
                <circle cx="113" cy="172" r="8" fill="white" stroke="#27272a" strokeWidth="1" />
                <text x="113" y="175" textAnchor="middle" className="fill-zinc-800">5</text>

                {/* Bubble 6: original Plate */}
                <path d="M 130 65 L 110 40" stroke="#71717a" strokeWidth="0.8" fill="none" />
                <circle cx="130" cy="65" r="1.5" fill="#27272a" />
                <circle cx="103" cy="33" r="8" fill="white" stroke="#27272a" strokeWidth="1" />
                <text x="103" y="36" textAnchor="middle" className="fill-zinc-800">6</text>

                {/* Bubble 7: original holder */}
                <path d="M 175 105 L 155 85" stroke="#71717a" strokeWidth="0.8" fill="none" />
                <circle cx="175" cy="105" r="1.5" fill="#27272a" />
                <circle cx="148" cy="78" r="8" fill="white" stroke="#27272a" strokeWidth="1" />
                <text x="148" y="81" textAnchor="middle" className="fill-zinc-800">7</text>

                {/* Bubble 8: P1A-S010DS-0010-OEZ(000)ZT */}
                <path d="M 180 125 L 205 155" stroke="#71717a" strokeWidth="0.8" fill="none" />
                <circle cx="180" cy="125" r="1.5" fill="#27272a" />
                <circle cx="212" cy="162" r="8" fill="white" stroke="#27272a" strokeWidth="1" />
                <text x="212" y="165" textAnchor="middle" className="fill-zinc-800">8</text>

                {/* Bubble 9: Piston Rod */}
                <path d="M 135 150 L 115 125" stroke="#71717a" strokeWidth="0.8" fill="none" />
                <circle cx="135" cy="150" r="1.5" fill="#27272a" />
                <circle cx="108" cy="118" r="8" fill="white" stroke="#27272a" strokeWidth="1" />
                <text x="108" y="121" textAnchor="middle" className="fill-zinc-800">9</text>
              </g>
            </g>

            {/* Standard CAD Sheet BOM Table in Bottom-Left corner */}
            <g transform="translate(25, 450)">
              {/* Table border */}
              <rect x="0" y="0" width="370" height="165" fill="#fcfdfd" stroke="#27272a" strokeWidth="1.2" />
              {/* Headers */}
              <line x1="0" y1="20" x2="370" y2="20" stroke="#27272a" strokeWidth="0.8" />
              <line x1="50" y1="0" x2="50" y2="165" stroke="#27272a" strokeWidth="0.8" />
              <line x1="180" y1="0" x2="180" y2="165" stroke="#27272a" strokeWidth="0.8" />
              <line x1="320" y1="0" x2="320" y2="165" stroke="#27272a" strokeWidth="0.8" />

              <text x="25" y="13" className="fill-zinc-800 font-mono text-[7px] font-bold" textAnchor="middle">ITEM NO.</text>
              <text x="115" y="13" className="fill-zinc-800 font-mono text-[7px] font-bold" textAnchor="middle">PART NUMBER</text>
              <text x="250" y="13" className="fill-zinc-800 font-mono text-[7px] font-bold" textAnchor="middle">DESCRIPTION</text>
              <text x="345" y="13" className="fill-zinc-800 font-mono text-[7px] font-bold" textAnchor="middle">QTY</text>

              {/* Rows */}
              {[
                { itemNo: 1, part: "original linr slider", desc: "Guide rails & linear sliders", qty: 2 },
                { itemNo: 2, part: "original hook", desc: "Pink FDM PETG claws", qty: 4 },
                { itemNo: 3, part: "original frame rod", desc: "Vertical support rods", qty: 2 },
                { itemNo: 4, part: "original slider", desc: "FDM sliding blocks", qty: 4 },
                { itemNo: 5, part: "Part1^Gripper", desc: "Central ISO-flange adapter", qty: 1 },
                { itemNo: 6, part: "original Plate", desc: "8mm milled Aluminum base plate", qty: 1 },
                { itemNo: 7, part: "original holder", desc: "Custom brackets for actuators", qty: 4 },
                { itemNo: 8, part: "P1A-S010DS-0010", desc: "Double-acting pneumatic cyl", qty: 2 },
                { itemNo: 9, part: "P1A-S010DS-0010-Kolb", desc: "Chrome piston rod shafts", qty: 2 }
              ].map((row, idx) => {
                const y = 35 + idx * 14;
                return (
                  <g key={row.itemNo}>
                    <line x1="0" y1={y - 11} x2="370" y2={y - 11} stroke="#27272a" strokeWidth="0.5" />
                    <text x="25" y={y} className="fill-zinc-900 font-mono text-[7px]" textAnchor="middle">{row.itemNo}</text>
                    <text x="56" y={y} className="fill-zinc-900 font-mono text-[7px]">{row.part}</text>
                    <text x="186" y={y} className="fill-zinc-900 font-mono text-[7px]">{row.desc}</text>
                    <text x="345" y={y} className="fill-zinc-900 font-mono text-[7px]" textAnchor="middle">{row.qty}</text>
                  </g>
                );
              })}
            </g>

            {/* SolidWorks-style Standard Sheet TITLE BLOCK (Bottom-Right Corner) */}
            <g transform="translate(625, 530)">
              {/* Title block outer border lines */}
              <rect x="0" y="0" width="290" height="85" fill="#fcfdfd" stroke="#27272a" strokeWidth="1.2" />
              
              {/* Internal layout lines */}
              <line x1="0" y1="40" x2="290" y2="40" stroke="#27272a" strokeWidth="0.8" />
              <line x1="160" y1="0" x2="160" y2="85" stroke="#27272a" strokeWidth="0.8" />
              <line x1="0" y1="20" x2="160" y2="20" stroke="#27272a" strokeWidth="0.6" />
              <line x1="160" y1="60" x2="290" y2="60" stroke="#27272a" strokeWidth="0.6" />

              {/* Sub-label rows on the left side of block */}
              <text x="6" y="13" className="fill-zinc-500 font-mono text-[7px]">DESIGNED BY:</text>
              <text x="75" y="13" className="fill-zinc-900 font-mono text-[8px] font-bold">Pursottam K. Shah</text>
              
              <text x="6" y="33" className="fill-zinc-500 font-mono text-[7px]">DATE APPROVED:</text>
              <text x="75" y="33" className="fill-zinc-900 font-mono text-[8px] font-bold">2024-11-20</text>

              <text x="6" y="53" className="fill-zinc-500 font-mono text-[7px]">MATERIAL SPECIFICATIONS:</text>
              <text x="6" y="65" className="fill-zinc-900 font-mono text-[8px] font-bold">ALU 6061-T6 + PETG (FDM)</text>
              
              <text x="6" y="78" className="fill-zinc-500 font-mono text-[7px]">FINISH: ANODIZED CLEAR / NO SHARP EDGES</text>

              {/* Right side of title block: Large Title & Dwg No */}
              <text x="166" y="15" className="fill-zinc-500 font-mono text-[7px]">SYSTEM NOMENCLATURE:</text>
              <text x="225" y="32" className="fill-zinc-950 font-sans text-[12px] font-black tracking-wide" textAnchor="middle">
                Crate Gripper
              </text>

              <text x="166" y="53" className="fill-zinc-500 font-mono text-[7px]">DRAWING NUMBER (DWG_NO):</text>
              <text x="225" y="73" className="fill-zinc-950 font-mono text-[10px] font-bold tracking-wider" textAnchor="middle">
                -35548458
              </text>
              <rect x="270" y="66" width="14" height="13" fill="none" stroke="#27272a" strokeWidth="0.8" />
              <text x="277" y="75" className="fill-zinc-900 font-mono text-[8px] font-bold" textAnchor="middle">A3</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Floating Action Bar at Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur border border-slate-800 px-4 py-2.5 rounded-full z-20 flex items-center gap-3 shadow-2xl">
        <button
          type="button"
          onClick={zoomOut}
          disabled={zoom <= 1}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white rounded-full transition duration-300"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="font-mono text-xs text-white font-bold min-w-[50px] text-center">
          {(zoom * 100).toFixed(0)}%
        </span>
        <button
          type="button"
          onClick={zoomIn}
          disabled={zoom >= 4}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white rounded-full transition duration-300"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-slate-800" />
        <button
          type="button"
          onClick={resetZoomPan}
          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] font-mono font-bold transition uppercase flex items-center gap-1"
          title="Reset Scale"
        >
          <RotateCcw className="w-3 h-3" /> RESET
        </button>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400 font-mono pl-1 border-l border-slate-800">
          <Move className="w-3 h-3 text-pink-500" />
          <span>DRAG TO PAN</span>
        </div>
      </div>
    </div>
  );
}
