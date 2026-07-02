/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Cpu, Activity, Video } from "lucide-react";

interface LabVideoPlayerProps {
  projectId?: string;
}

export default function LabVideoPlayer({ projectId }: LabVideoPlayerProps) {
  // Resolve static video source from absolute public paths
  const getVideoSrc = () => {
    switch (projectId) {
      case "pick-and-place":
        return "/pick-and-place.mp4";
      case "welding-robot":
        return "/robotic-welding.mp4";
      case "christmas-window":
        return "/christmas-window.mp4";
      case "custom-gripper":
        return "/gripper.mp4";
      case "automated-packing":
        return "/packing-system.mp4";
      default:
        return "/pick-and-place.mp4";
    }
  };

  const videoSrc = getVideoSrc();

  const [telemetry, setTelemetry] = useState({
    joint1: 45.2,
    joint2: -12.4,
    pressure: 6.2,
    cycleTime: 8.4
  });

  // Animate mechatronics telemetry continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        joint1: Number((prev.joint1 + (Math.random() - 0.5) * 2).toFixed(1)),
        joint2: Number((prev.joint2 + (Math.random() - 0.5) * 1.5).toFixed(1)),
        pressure: Number((5.8 + Math.random() * 0.8).toFixed(2)),
        cycleTime: Number((7.8 + Math.random() * 1.2).toFixed(2))
      }));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col bg-jet-black text-white overflow-hidden border border-white/10 relative">
      <div className="absolute inset-0 grid-blueprint-dark opacity-10 pointer-events-none" />

      {/* Screen Monitor Area */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden">
        {/* Core Video Player with native controls, loop, muted, autoPlay */}
        <video
          src={videoSrc}
          controls
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover z-0"
        />

        {/* Scanlines / CRT Overlay Effect for Sci-fi tech feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent opacity-30 pointer-events-none z-10" />

        {/* Overlay HUD indicators */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-20">
          <div className="flex items-center gap-1.5 bg-black/60 border border-white/15 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>LAB_FEED</span>
          </div>
          <div className="bg-black/60 border border-white/15 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider">
            CCTV_SYS // {projectId === "christmas-window" ? "CAM_02_WINDOW" : "CAM_04"}
          </div>
        </div>

        {/* Overlay Live Telemetry readout (moving metrics) */}
        <div className="absolute bottom-3 left-3 bg-black/60 border border-white/15 px-3 py-2 rounded font-mono text-[9px] leading-relaxed hidden sm:block pointer-events-none z-20">
          {projectId === "christmas-window" ? (
            <>
              <div>TURIN_J1: <span className="text-safety-orange font-bold">{telemetry.joint1}°</span></div>
              <div>SLEIGH_ROT: <span className="text-safety-orange font-bold">{telemetry.joint2}°</span></div>
              <div>FLIGHT_PITCH: <span className="text-safety-orange font-bold">{(telemetry.pressure * 3).toFixed(1)}°</span></div>
              <div>CYCLE_SPEED: <span className="text-safety-orange font-bold">{telemetry.cycleTime}s</span></div>
            </>
          ) : (
            <>
              <div>TURIN_J1: <span className="text-safety-orange font-bold">{telemetry.joint1}°</span></div>
              <div>TURIN_J2: <span className="text-safety-orange font-bold">{telemetry.joint2}°</span></div>
              <div>PRESSURE: <span className="text-safety-orange font-bold">{telemetry.pressure} bar</span></div>
              <div>CYCLE: <span className="text-safety-orange font-bold">{telemetry.cycleTime}s</span></div>
            </>
          )}
        </div>
      </div>

      {/* Control Navigation Strip */}
      <div className="bg-deep-charcoal border-t border-white/10 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-safety-orange animate-pulse" />
          <span className="font-mono text-[10px] text-white/70">ACTIVE DATA CONNECTED</span>
        </div>

        <div className="font-mono text-[9px] text-white/40 tracking-wider">
          {projectId ? projectId.toUpperCase().replace("-", "_") + "_STREAM" : "STREAM"}
        </div>
      </div>

      {/* Instructional text footer */}
      <div className="bg-black/60 px-4 py-2 flex items-center justify-between text-[9px] font-mono text-white/50">
        <span className="flex items-center gap-1">
          <Video className="w-3 h-3 text-safety-orange" />
          Playing high-fidelity local lab video stream
        </span>
        <span className="hidden xs:inline">SAMK_ROBOT_FEED_V4.3</span>
      </div>
    </div>
  );
}
