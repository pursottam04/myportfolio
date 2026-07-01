/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, UploadCloud, RefreshCw, Cpu, Activity, Video } from "lucide-react";

// Robust, lightweight native IndexedDB wrapper for binary video blob storage
const DB_NAME = "LabVideoDB";
const STORE_NAME = "videos";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getStoredVideo(key: string): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error("IndexedDB get error:", err);
    return null;
  }
}

async function setStoredVideo(key: string, blob: Blob): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(blob, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error("IndexedDB put error:", err);
  }
}

async function removeStoredVideo(key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error("IndexedDB delete error:", err);
  }
}

interface LabVideoPlayerProps {
  projectId?: string;
}

export default function LabVideoPlayer({ projectId }: LabVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  // High-availability CDN fallback URLs for the simulation feed
  const simulationFeeds = [
    "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-assembling-a-machine-part-41581-large.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  ];
  
  const [feedIndex, setFeedIndex] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string>(simulationFeeds[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isCustomVideo, setIsCustomVideo] = useState(false);
  const [feedLoadError, setFeedLoadError] = useState(false);
  const [telemetry, setTelemetry] = useState({
    joint1: 45.2,
    joint2: -12.4,
    pressure: 6.2,
    cycleTime: 8.4
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom video if stored in IndexedDB on mount or when projectId changes
  useEffect(() => {
    let active = true;
    let loadedUrl: string | null = null;

    if (projectId) {
      getStoredVideo(projectId).then((blob) => {
        if (!active) return;
        if (blob) {
          const url = URL.createObjectURL(blob);
          loadedUrl = url;
          setVideoSrc(url);
          setIsCustomVideo(true);
          setFeedLoadError(false);
        } else {
          setVideoSrc(simulationFeeds[0]);
          setIsCustomVideo(false);
        }
      });
    }

    return () => {
      active = false;
      if (loadedUrl) {
        URL.revokeObjectURL(loadedUrl);
      }
    };
  }, [projectId]);

  // Clean up object URLs to prevent memory leaks when videoSrc is updated/revoked
  useEffect(() => {
    return () => {
      if (videoSrc.startsWith("blob:")) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  // Animate mechatronics telemetry while playing or in simulated mode
  useEffect(() => {
    let interval: any;
    if (isPlaying || feedLoadError) {
      interval = setInterval(() => {
        setTelemetry((prev) => ({
          joint1: Number((prev.joint1 + (Math.random() - 0.5) * 2).toFixed(1)),
          joint2: Number((prev.joint2 + (Math.random() - 0.5) * 1.5).toFixed(1)),
          pressure: Number((5.8 + Math.random() * 0.8).toFixed(2)),
          cycleTime: Number((7.8 + Math.random() * 1.2).toFixed(2))
        }));
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, feedLoadError]);

  const handlePlayPause = () => {
    if (feedLoadError && !isCustomVideo) {
      // If default feed failed, toggle simulated playing state for telemetry/placeholder animation
      setIsPlaying(!isPlaying);
      return;
    }
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Playback error, attempting fallback", err);
        handleVideoError();
      });
    }
  };

  const handleVideoError = () => {
    // If the current video failed to load, try the next fallback in the list
    if (!isCustomVideo && feedIndex < simulationFeeds.length - 1) {
      const nextIndex = feedIndex + 1;
      setFeedIndex(nextIndex);
      setVideoSrc(simulationFeeds[nextIndex]);
      console.log(`Switching simulation feed to fallback index: ${nextIndex}`);
    } else {
      // No more fallback options, or a custom video failed
      if (isCustomVideo) {
        setUploadError("Could not play the uploaded video file. Please check the file format.");
        setVideoSrc(simulationFeeds[0]);
        setFeedIndex(0);
        setIsCustomVideo(false);
      } else {
        setFeedLoadError(true);
      }
      setIsPlaying(false);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith("video/")) {
      setUploadError("Invalid file type. Please upload an MP4 or other video file.");
      return;
    }
    setUploadError(null);
    setFeedLoadError(false);
    
    // Cleanup previous blob URL if exists
    if (isCustomVideo && videoSrc.startsWith("blob:")) {
      URL.revokeObjectURL(videoSrc);
    }

    const objectUrl = URL.createObjectURL(file);
    setVideoSrc(objectUrl);
    setIsCustomVideo(true);
    setIsPlaying(false); // Reset to allow play trigger

    // Store in IndexedDB
    if (projectId) {
      await setStoredVideo(projectId, file);
    }
    
    // Auto-play the custom video
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.warn("Could not autoplay custom video", err);
          setUploadError("Video loaded. Use the play button to start playback.");
        });
      }
    }, 150);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const resetToDefault = async () => {
    if (isCustomVideo && videoSrc.startsWith("blob:")) {
      URL.revokeObjectURL(videoSrc);
    }
    if (projectId) {
      await removeStoredVideo(projectId);
    }
    setFeedIndex(0);
    setVideoSrc(simulationFeeds[0]);
    setIsCustomVideo(false);
    setIsPlaying(false);
    setFeedLoadError(false);
    setUploadError(null);
  };

  return (
    <div className="w-full flex flex-col bg-jet-black text-white overflow-hidden border border-white/10 relative">
      <div className="absolute inset-0 grid-blueprint-dark opacity-10 pointer-events-none" />

      {/* Screen Monitor Area */}
      <div
        className={`relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden ${
          isDragging ? "border-2 border-dashed border-safety-orange" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Core Video Player */}
        {!feedLoadError ? (
          <video
            ref={videoRef}
            src={videoSrc}
            loop
            muted={isMuted}
            playsInline
            onError={handleVideoError}
            className="w-full h-full object-cover pointer-events-none"
          />
        ) : (
          /* Beautiful vector mechatronics diagram / fallback screen when online feed is blocked */
          <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none" />
            
            {/* Pulsing Abstract Robot Target/Laser UI */}
            <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 border border-safety-orange/40 rounded-full animate-ping duration-1000" />
              <div className="absolute w-16 h-16 border-2 border-dashed border-white/20 rounded-full animate-spin duration-[8s]" />
              <Cpu className="w-8 h-8 text-safety-orange animate-pulse" />
            </div>

            <span className="font-display font-bold text-xs tracking-widest text-safety-orange uppercase">
              SIMULATION ENGINE CONNECTED
            </span>
            <span className="text-[10px] font-mono text-white/60 mt-1 max-w-xs leading-normal">
              Default live stream restricted by network/CORS. Load a custom video feed or observe simulated telemetry below.
            </span>
            
            {/* Mini status badge */}
            <div className="mt-3 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-white/40 tracking-wider uppercase">
              TELEMETRY STATE: ACTIVE
            </div>
          </div>
        )}

        {/* Scanlines / CRT Overlay Effect for Sci-fi tech feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent opacity-30 pointer-events-none" />

        {/* Overlay HUD indicators */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          <div className="flex items-center gap-1.5 bg-black/60 border border-white/15 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider">
            <span className={`w-1.5 h-1.5 rounded-full ${(isPlaying || feedLoadError) ? "bg-red-500 animate-pulse" : "bg-white/40"}`} />
            <span>{isCustomVideo ? "LIVE_LAB_FEED" : feedLoadError ? "SIMULATED_HUD" : "SIMULATION_FEED"}</span>
          </div>
          <div className="bg-black/60 border border-white/15 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider">
            CCTV_SYS // {projectId === "christmas-window" ? "CAM_02_WINDOW" : "CAM_04"}
          </div>
        </div>

        {/* Overlay Live Telemetry readout (moving metrics) */}
        <div className="absolute bottom-3 left-3 bg-black/60 border border-white/15 px-3 py-2 rounded font-mono text-[9px] leading-relaxed hidden sm:block pointer-events-none z-10">
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

        {/* Big play button overlay when paused and feed works */}
        {!isPlaying && !feedLoadError && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-safety-orange/90 hover:bg-safety-orange text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 z-20"
            aria-label="Play video"
          >
            <Play className="w-6 h-6 fill-current ml-1" />
          </button>
        )}

        {/* HUD Warning banner on dragover */}
        {isDragging && (
          <div className="absolute inset-0 bg-safety-orange/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 z-20">
            <UploadCloud className="w-10 h-10 animate-bounce text-white mb-2" />
            <span className="font-display font-bold text-sm tracking-widest text-white">DROP LAB VIDEO HERE</span>
            <span className="font-mono text-[10px] text-white/85 mt-1">SUPPORTED FORMATS: .MP4, .MOV, .AVI</span>
          </div>
        )}
      </div>

      {/* Control Navigation Strip */}
      <div className="bg-deep-charcoal border-t border-white/10 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayPause}
            className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          
          <button
            onClick={handleMuteToggle}
            className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all"
            title={isMuted ? "Unmute" : "Mute"}
            disabled={feedLoadError}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-safety-orange" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Upload Button */}
          <button
            onClick={triggerFileSelect}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-safety-orange hover:bg-opacity-90 text-white text-[10px] font-display font-bold tracking-widest transition-all"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            LOAD LAB VIDEO
          </button>

          {(isCustomVideo || feedLoadError) && (
            <button
              onClick={resetToDefault}
              className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all"
              title="Reset simulation feed"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/*"
          className="hidden"
        />
      </div>

      {/* Error readouts if any */}
      {uploadError && (
        <div className="bg-red-950/80 border-t border-red-500/20 px-4 py-2 font-mono text-[10px] text-red-300">
          {uploadError}
        </div>
      )}

      {/* Instructional text footer */}
      <div className="bg-black/60 px-4 py-2 flex items-center justify-between text-[9px] font-mono text-white/50">
        <span className="flex items-center gap-1">
          <Video className="w-3 h-3 text-safety-orange" />
          Drag & Drop your mechatronics lab videos to test
        </span>
        <span className="hidden xs:inline">SAMK_ROBOT_FEED_V4.3</span>
      </div>
    </div>
  );
}
