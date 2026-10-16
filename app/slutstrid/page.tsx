"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SlutbattlePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Tillbaka-knapp i hörnet för att kunna återvända till kartan/startsidan */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 text-white border border-white/20 backdrop-blur-md text-xs font-bold hover:bg-black/80 transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Tillbaka till kartan</span>
      </Link>

      {/* Fullscreen Video */}
      <video
        autoPlay
        controls
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/slutstriden.mp4" type="video/mp4" />
        Din webbläsare stöder inte videouppspelning.
      </video>
    </div>
  );
}