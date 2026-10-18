"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Feather,
  Search,
  FileText,
  ScrollText,
  MessageSquareQuote,
  Users,
  CheckCircle2,
  Layers,
  Sparkles,
  Swords,
  HelpCircle,
} from "lucide-react";

import FordiagnosModal from "@/components/activities/FordiagnosModal"; // Justera sökvägen om du sparar komponenten annanstans

const mapNodes = [
  {
    id: 1,
    title: "1. Genrekunskap",
    top: "76%",
    left: "18%",
    path: "/genrekunskap",
    active: true,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "2. Möta en text",
    top: "90%",
    left: "34%",
    path: "/mota-en-text",
    icon: Feather,
  },
  {
    id: 3,
    title: "3. Föra resonemang",
    top: "92%",
    left: "70%",
    path: "/fora-resonemang",
    icon: Search,
  },
  {
    id: 4,
    title: "4. Sammanfatta",
    top: "62%",
    left: "76%",
    path: "/sammanfatta",
    icon: FileText,
  },
  {
    id: 5,
    title: "5. Referera och citera",
    top: "67%",
    left: "58%",
    path: "/referera-och-citera",
    icon: ScrollText,
  },
  {
    id: 6,
    title: "6. Presentera muntligt",
    top: "43%",
    left: "53%",
    path: "/framfora-muntligt",
    icon: MessageSquareQuote,
  },
  {
    id: 7,
    title: "7. Samtala och diskutera",
    top: "50%",
    left: "31%",
    path: "/samtal-och-diskussion",
    icon: Users,
  },
  {
    id: 8,
    title: "8. Skriva korrekt och begripligt",
    top: "42%",
    left: "14%",
    path: "/skriva-korrekt",
    icon: Layers,
  },
 {
    id: 9,
    title: "9. Bygga en fungerande text",
    top: "26%",
    left: "11%",
    path: "/bygga-en-text", 
    icon: CheckCircle2,
  },
  {
    id: 10,
    title: "10. SLUTSTRID",
    top: "10%",
    left: "8%",
    path: "/slutstrid",
    icon: Swords,
    isBoss: true,
  },
];

export default function App() {
  const genreNode =
    mapNodes.find((node) => node.id === 1) || mapNodes[0];

  const [videoReady, setVideoReady] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  // Tillstånd för fördiagnos-modalen (Öppen som standard)
  const [showFordiagnos, setShowFordiagnos] = useState(true);
  const [studentData, setStudentData] = useState<{ profile: string; dragon: string } | null>(null);

  useEffect(() => {
    if (!videoReady) return;

    const timer = window.setTimeout(() => {
      setVideoVisible(true);
    }, 100);

    return () => window.clearTimeout(timer);
  }, [videoReady]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-amber-950/20">
      {/* Fördiagnos Modal (Ligger överst när showFordiagnos = true) */}
      <FordiagnosModal
        isOpen={showFordiagnos}
        onClose={() => setShowFordiagnos(false)}
        onSave={(data) => {
          setStudentData(data);
          console.log("Vald profil och drake:", data);
        }}
      />

      {/* Knapp för att öppna fördiagnosen igen */}
      <button
        onClick={() => setShowFordiagnos(true)}
        className="absolute top-4 left-4 z-30 flex items-center gap-2 rounded-xl border border-amber-500/50 bg-stone-900/80 px-3.5 py-2 text-xs font-bold text-amber-200 shadow-lg backdrop-blur-md hover:bg-amber-900/80 hover:border-amber-400 transition-all"
      >
        <HelpCircle className="h-4 w-4 text-amber-400" />
        Fördiagnos & Drake
      </button>

      {/* Stillbild som alltid ligger bakom videon */}
      <img
        src="/images/larstigen-stillbild.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Animerad bakgrundsvideo */}
      <video
        src="/videos/larstigen.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        aria-hidden="true"
        className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-500 ${
          videoVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Varm toning ovanpå bakgrunden */}
      <div className="absolute inset-0 z-[2] bg-amber-950/10 pointer-events-none" />

      {/* Guldprickad stig */}
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-80">
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 600"
        >
          <path
            d="M 180 456 C 250 510, 290 535, 340 540 C 480 550, 580 560, 700 552 C 770 540, 800 480, 760 372 C 710 370, 640 380, 580 402 C 540 415, 530 300, 530 258 C 450 280, 370 290, 310 300 C 220 320, 160 270, 140 252 C 115 220, 110 170, 110 156 C 105 110, 95 80, 80 60"
            fill="none"
            stroke="rgba(120, 70, 20, 0.25)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 180 456 C 250 510, 290 535, 340 540 C 480 550, 580 560, 700 552 C 770 540, 800 480, 760 372 C 710 370, 640 380, 580 402 C 540 415, 530 300, 530 258 C 450 280, 370 290, 310 300 C 220 320, 160 270, 140 252 C 115 220, 110 170, 110 156 C 105 110, 95 80, 80 60"
            fill="none"
            stroke="#eab308"
            strokeWidth="5"
            strokeDasharray="6 10"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Kapitel längs lärospåret */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mapNodes.map((node) => {
          const Icon = node.icon;

          return (
            <Link
              key={node.id}
              href={node.path}
              style={{
                top: node.top,
                left: node.left,
              }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center pointer-events-auto group focus:outline-none"
            >
              {node.active ? (
                <div className="flex flex-col items-center animate-bounce-slow">
                  <div className="relative flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-tr from-amber-700 via-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-950/60 border border-amber-300/80 transition-transform group-hover:scale-110">
                    <div className="absolute -inset-1 animate-ping rounded-full bg-amber-400/20 blur-xs" />
                    <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-amber-600 to-amber-900 text-amber-100">
                      <Sparkles className="h-6 w-6 text-amber-200 fill-amber-200/50" />
                    </div>
                  </div>

                  <span className="mt-2 flex items-center gap-1.5 rounded-lg border border-amber-500/60 bg-gradient-to-b from-amber-900/90 via-stone-900/90 to-stone-950/95 px-3 py-1.5 text-center text-xs font-bold text-amber-100 shadow-md backdrop-blur-md transition-all group-hover:border-amber-400 group-hover:bg-amber-900/90 group-hover:shadow-amber-500/20">
                    <Icon className="h-4 w-4 text-amber-400" />
                    {node.title}
                  </span>
                </div>
              ) : node.isBoss ? (
                <div className="flex flex-col items-center">
                  <span className="mb-1.5 flex items-center gap-1.5 rounded-lg border border-rose-900/80 bg-gradient-to-b from-stone-900/90 via-rose-950/80 to-stone-950/95 px-3 py-1 text-xs font-black tracking-wide text-rose-200 shadow-md backdrop-blur-md transition-all group-hover:scale-105 group-hover:border-rose-600">
                    <Icon className="h-4 w-4 text-rose-400 animate-pulse" />
                    {node.title}
                  </span>

                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-rose-800/80 bg-gradient-to-b from-rose-900 to-stone-950 shadow-md transition-transform group-hover:scale-110">
                    <Swords className="h-3.5 w-3.5 text-rose-200" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="mb-1.5 flex max-w-56 items-center gap-1.5 rounded-md border border-amber-900/40 bg-gradient-to-b from-stone-900/80 to-stone-950/85 px-2.5 py-1 text-xs font-semibold text-amber-200/80 shadow-sm backdrop-blur-xs transition-all group-hover:scale-105 group-hover:border-amber-700/60 group-hover:bg-stone-900/95 group-hover:text-amber-100">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-amber-500/70 group-hover:text-amber-400" />
                    {node.title}
                  </span>

                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-amber-900/60 bg-gradient-to-b from-amber-900/60 to-stone-900 shadow-xs transition-transform group-hover:scale-110">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-600/70" />
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}