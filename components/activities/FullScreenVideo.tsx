'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, Maximize, X, ArrowRight } from 'lucide-react';

interface FullScreenVideoProps {
  videoSrc?: string;
  title?: string;
  onClose?: () => void;
}

export default function FullScreenVideo({
  videoSrc = '/videos/presenteraunderlag.mp4',
  title = 'Instruktionsfilm: Presentera underlag',
  onClose,
}: FullScreenVideoProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleNativeFullScreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  if (!mounted) return null;

  const videoModal = (
    <div
      className={`fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center transition-colors duration-500 overflow-y-auto ${
        isEnded ? 'bg-white' : 'bg-black'
      }`}
    >
      {/* Top-bar: Titel och Stängknapp */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-20">
        <h2
          className={`text-lg md:text-xl font-bold tracking-wide transition-colors ${
            isEnded ? 'text-slate-900' : 'text-white drop-shadow-md'
          }`}
        >
          {title}
        </h2>

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Stäng video"
            className={`rounded-full p-3 transition-all cursor-pointer border ${
              isEnded
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                : 'bg-black/40 text-white backdrop-blur-md hover:bg-black/80 border-white/20'
            }`}
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Om videon är slut: Visa helvit vy med innehåll */}
      {isEnded ? (
        <div className="w-full max-w-2xl mx-auto py-8 text-center space-y-6 bg-white p-6 sm:p-8 my-6 z-10 animate-fade-in">
          {/* Märke för erövrad förmåga: presentera.jpeg */}
          <div className="flex justify-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44">
              <Image
                src="/images/presentera.jpeg"
                alt="Erövrad förmåga: Presentera"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Textbeskrivning */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              Du har nu erövrat förmågan <span className="text-amber-800">Presentera och samtala!</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
              Nu kan du och draken flyga vidare.
            </p>
          </div>

          {/* Knapp för att flyga vidare till startsidan */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-800 px-8 py-3 text-sm font-bold text-amber-50 shadow-md transition hover:bg-amber-900 cursor-pointer"
            >
              <span>Flyg vidare</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Drake-video utan ram placerad under knappen */}
          <div className="mx-auto w-full max-w-xs pt-4">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover bg-transparent"
            >
              <source src="/videos/drake.mp4" type="video/mp4" />
              Din webbläsare stöder inte videouppspelning.
            </video>
          </div>
        </div>
      ) : (
        /* Själva videouppspelningen */
        <>
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
            onEnded={handleVideoEnd}
          />

          {/* Täckande gradient i över- och underkant */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

          {/* Bottom-bar: Videokontroller */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-6 md:p-8 z-10">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pausa' : 'Spela'}
                className="flex items-center gap-2 rounded-2xl bg-white/20 px-5 py-3 font-bold text-white backdrop-blur-md hover:bg-white/30 transition-all cursor-pointer border border-white/20"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                <span className="text-sm font-semibold">
                  {isPlaying ? 'Pausa' : 'Spela'}
                </span>
              </button>

              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Ljud på' : 'Ljud av'}
                className="rounded-2xl bg-white/10 p-3 text-white backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer border border-white/10"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>

            <button
              onClick={toggleNativeFullScreen}
              aria-label="Fullskärmsläge"
              className="rounded-2xl bg-white/10 p-3 text-white backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer border border-white/10"
            >
              <Maximize size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );

  return createPortal(videoModal, document.body);
}