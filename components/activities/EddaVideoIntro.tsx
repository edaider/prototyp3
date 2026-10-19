"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface EddaVideoIntroProps {
  title?: string;
  videoSrc?: string;
  activity?: {
    title?: string;
    videoSrc?: string;
  };
}

export default function EddaVideoIntro({
  title = "Edda lär dig!",
  videoSrc = "/videos/sammanfattning.mp4",
  activity,
}: EddaVideoIntroProps) {
  // Hämtar i första hand från activity prop, annars direkt från title/videoSrc props
  const videoTitle = activity?.title || title;
  const videoSource = activity?.videoSrc || videoSrc;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full mb-8 rounded-2xl bg-white p-6 shadow-sm">
      {videoTitle && (
        <h3 className="text-xl font-bold text-slate-800 mb-4 text-left">
          {videoTitle}
        </h3>
      )}

      <div
        onClick={togglePlay}
        className="relative max-w-2xl mx-auto w-full overflow-hidden rounded-xl bg-white cursor-pointer group"
      >
        <video
          ref={videoRef}
          src={videoSource}
          preload="auto"
          playsInline
          className="w-full h-auto max-h-[380px] object-contain rounded-xl bg-white"
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-30">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900/80 text-white backdrop-blur-md hover:bg-stone-900 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="h-3.5 w-3.5" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900/80 text-white backdrop-blur-md hover:bg-stone-900 transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}