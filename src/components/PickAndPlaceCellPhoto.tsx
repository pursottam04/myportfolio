/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export default function PickAndPlaceCellPhoto() {
  return (
    <div className="w-full bg-deep-charcoal border border-white/10 rounded-lg p-5 flex flex-col gap-4 relative shadow-xl">
      <div className="relative w-full aspect-video rounded border border-white/10 overflow-hidden bg-neutral-950 flex flex-col items-center justify-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-10" />

        <img 
          src="/pick-and-place.jpg" 
          alt="Pick and Place Cell Photo" 
          className="w-full h-full object-cover relative z-0"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
