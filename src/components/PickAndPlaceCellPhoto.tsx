/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Upload, RotateCcw, Image as ImageIcon, AlertCircle } from "lucide-react";

export default function PickAndPlaceCellPhoto() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persisted photo on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("samk_cell_uploaded_photo");
      if (stored) {
        setUploadedImage(stored);
      }
    } catch (e) {
      console.error("Failed to load image from localStorage", e);
    }
  }, []);

  // Handle file processing with canvas compression to protect local storage
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPEG, PNG, WEBP).");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // High quality but storage-safe downscaling (max 1000px side)
        const maxSide = 1000;
        let width = img.width;
        let height = img.height;

        if (width > maxSide || height > maxSide) {
          if (width > height) {
            height = Math.round((height * maxSide) / width);
            width = maxSide;
          } else {
            width = Math.round((width * maxSide) / height);
            height = maxSide;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
          
          try {
            localStorage.setItem("samk_cell_uploaded_photo", compressedDataUrl);
            setUploadedImage(compressedDataUrl);
          } catch (storageErr) {
            console.warn("Storage limit reached, saving in memory only", storageErr);
            setUploadedImage(compressedDataUrl);
          }
        } else {
          setUploadedImage(event.target?.result as string);
        }
        setIsLoading(false);
      };
      
      img.onerror = () => {
        setErrorMsg("Failed to parse image file.");
        setIsLoading(false);
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      setErrorMsg("Error reading image file.");
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const resetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this photo?")) {
      localStorage.removeItem("samk_cell_uploaded_photo");
      setUploadedImage(null);
      setErrorMsg(null);
    }
  };

  return (
    <div className="w-full bg-deep-charcoal border border-white/10 rounded-lg p-5 flex flex-col gap-4 relative shadow-xl">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Upload Zone / Display Box */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={uploadedImage ? undefined : triggerUpload}
        className={`relative w-full aspect-video rounded border-2 transition-all duration-300 overflow-hidden bg-neutral-950 flex flex-col items-center justify-center ${
          isDragging 
            ? "border-safety-orange bg-safety-orange/5 scale-[1.01]" 
            : uploadedImage 
              ? "border-white/10" 
              : "border-dashed border-white/20 hover:border-white/40 cursor-pointer"
        }`}
      >
        {/* Subtle grid background for the canvas zone */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-10" />

        {isLoading ? (
          <div className="flex flex-col items-center gap-3 font-mono text-xs text-white/60 z-20">
            <div className="w-8 h-8 border-2 border-t-safety-orange border-white/15 rounded-full animate-spin" />
            <span>PROCESSING CELL PHOTO...</span>
          </div>
        ) : uploadedImage ? (
          <div className="relative w-full h-full">
            <img 
              src={uploadedImage} 
              alt="Uploaded Pick and Place Cell" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Control HUD elements overlay - simple upload and delete button */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={triggerUpload}
                className="flex items-center gap-2 bg-safety-orange hover:bg-safety-orange/90 text-white px-4 py-2 text-[11px] tracking-wider uppercase font-mono font-bold rounded shadow-md transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Upload className="w-3.5 h-3.5" />
                UPLOAD NEW PHOTO
              </button>
              <button
                onClick={resetPhoto}
                className="flex items-center justify-center bg-black/75 hover:bg-black text-white w-9 h-9 rounded border border-white/15 shadow-md transition-all duration-200 cursor-pointer active:scale-95 hover:border-red-500/50"
                title="Delete Photo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 z-20 font-mono select-none">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 transition-all duration-300 hover:scale-105 hover:bg-safety-orange/10 hover:border-safety-orange/30">
              <Upload className="w-6 h-6 text-white/40" />
            </div>
            
            <h3 className="text-xs font-bold tracking-wider text-white mb-1.5 uppercase">
              ADD PROJECT PHOTO
            </h3>
            
            <p className="text-[11px] text-white/50 max-w-[280px] leading-relaxed mb-3">
              Drag and drop your cell photo here, or click to browse from your device.
            </p>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 p-2.5 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
