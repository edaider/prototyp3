"use client";

import { useEffect, useRef, useState } from "react";
import type { ActivityConfig, RoomConfig } from "@/content/types";

import { ActivityRenderer } from "@/components/activities/ActivityRenderer";
import WritingLogPractise from "@/components/activities/WritingLogPractise";
import ControllAnswer from "@/components/activities/ControllAnswer";
import DiagnosticText from "@/components/activities/DiagnosticText";

type Props = {
  room: RoomConfig;
  mode: "study" | "practice" | "diagnosis";
  onContentVisible?: () => void;
};

type Phase = "entrance" | "cinematic" | "ready" | "content";

const INTRO_DURATION = 15_000;
const ENTRANCE_IMAGE = "/images/slottskorridoren.jpeg";

const ROOM_MEDIA: Record<Props["mode"], { video: string; image: string }> = {
  study: {
    video: "/videos/tronsalen.mp4",
    image: "/images/tronrum.jpeg",
  },
  practice: {
    video: "/videos/biblioteket.mp4",
    image: "/images/bibliotek.jpeg",
  },
  diagnosis: {
    video: "/videos/fängelsehålan.mp4",
    image: "/images/fängelsehåla.png",
  },
};

// ⚠️ VIKTIGT: Namnet här MÅSTE vara RoomView och ha "export" framför!
export function RoomView({ room, mode, onContentVisible }: Props) {
  const [phase, setPhase] = useState<Phase>("entrance");
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const media = ROOM_MEDIA[mode];

  function stopVideo() {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  }

  useEffect(() => {
    setPhase("entrance");
    setError("");

    return () => {
      stopVideo();
    };
  }, [mode, media.video]);

  useEffect(() => {
    if (phase !== "cinematic") return;

    const timer = window.setTimeout(() => {
      stopVideo();
      setPhase("ready");
    }, INTRO_DURATION);

    return () => window.clearTimeout(timer);
  }, [phase]);

  async function enterCastle() {
    const video = videoRef.current;

    if (!video) {
      setError("Videospelaren kunde inte laddas. Försök igen.");
      return;
    }

    try {
      video.pause();
      video.currentTime = 0;
      video.muted = false;
      video.volume = 1;

      await video.play();

      setError("");
      setPhase("cinematic");
    } catch (err) {
      console.error("Kunde inte starta rumsvideon:", err);
      setError("Videon kunde inte startas med ljud.");
    }
  }

  function beginStudying() {
    stopVideo();
    setPhase("content");
    onContentVisible?.();
  }

  const displayActivities: ActivityConfig[] = [
    ...(room.activities ?? []),
    ...(room.sections?.map((section) => ({
      id: section.id,
      type: section.component
        .toLowerCase()
        .replace(/([a-z])([A-Z])/g, "$1-$2") as ActivityConfig["type"],
      title: section.title,
      props: section.props,
    })) ?? []),
  ];

  return (
    <main className="relative min-h-screen bg-stone-950 text-white">
      <video
        ref={videoRef}
        key={media.video}
        src={media.video}
        playsInline
        preload="auto"
        loop
        aria-hidden="true"
        className={`fixed inset-0 h-screen w-screen object-cover ${
          phase === "cinematic"
            ? "z-0 opacity-100"
            : "pointer-events-none -z-10 opacity-0"
        }`}
      />

      {/* FAS 1: SLOTTSKORRIDOR */}
      {phase === "entrance" && (
        <>
          <img
            src={ENTRANCE_IMAGE}
            alt=""
            aria-hidden="true"
            className="fixed inset-0 z-0 h-screen w-screen object-cover"
          />

          <div className="fixed inset-0 z-[1] bg-black/20" />

          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-5 px-5">
            <button
              type="button"
              onClick={enterCastle}
              className="group relative inline-flex cursor-pointer items-center justify-center rounded-lg border-2 border-amber-900/60 bg-gradient-to-b from-amber-800 via-amber-900 to-stone-900 px-8 py-4 text-lg font-black tracking-wide text-amber-100 shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-105 hover:border-amber-500 hover:from-amber-700 hover:to-amber-950 hover:text-amber-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95"
            >
              <span className="pointer-events-none absolute inset-1 rounded-md border border-amber-500/30 group-hover:border-amber-400/60" />

              <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Flyg vidare in genom porten
              </span>
            </button>

            {error && (
              <p
                role="alert"
                className="max-w-lg rounded-lg bg-red-950/90 p-4 text-center text-white"
              >
                {error}
              </p>
            )}
          </div>
        </>
      )}

      {/* FAS 2: VIDEO OCH STILLBILD */}
      {(phase === "cinematic" || phase === "ready") && (
        <>
          {phase === "ready" && (
            <>
              <img
                src={media.image}
                alt=""
                aria-hidden="true"
                className="fixed inset-0 z-[1] h-screen w-screen object-cover"
              />

              <div className="fixed inset-0 z-[2] bg-black/20" />

              <div className="relative z-10 flex min-h-screen items-center justify-center">
                <button
                  type="button"
                  onClick={beginStudying}
                  className="group relative inline-flex cursor-pointer items-center justify-center rounded-lg border-2 border-amber-900/60 bg-gradient-to-b from-amber-800 via-amber-900 to-stone-900 px-8 py-4 text-lg font-black tracking-wide text-amber-100 shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-105 hover:border-amber-500 hover:from-amber-700 hover:to-amber-950 hover:text-amber-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95"
                >
                  <span className="pointer-events-none absolute inset-1 rounded-md border border-amber-500/30 group-hover:border-amber-400/60" />

                  <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Börja här
                  </span>
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* FAS 3: INNEHÅLL */}
      {phase === "content" && (
        <>
          <img
            src={media.image}
            alt=""
            aria-hidden="true"
            className="fixed inset-0 z-0 h-screen w-screen object-cover"
          />

          <div className="fixed inset-0 z-[1] bg-black/30 backdrop-blur-[2px]" />

          <div className="relative z-10 mx-auto w-full max-w-[92%] px-3 pb-12 pt-20 md:px-6 md:pt-24 lg:max-w-7xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md md:text-4xl">
              {room.title}
            </h1>

            {room.introduction && (
              <p className="mt-2 max-w-3xl text-base font-medium text-amber-50/90 drop-shadow-xs md:text-lg">
                {room.introduction}
              </p>
            )}

            <div className="mt-8 space-y-8 pb-32">
              {displayActivities.length > 0 && (
                <>
                  {displayActivities.map((activity) => (
                    <ActivityRenderer
                      key={activity.id}
                      activity={activity}
                      mode={mode}
                    />
                  ))}
                </>
              )}

              {mode === "practice" && room.question && (
                <div className="space-y-8">
                  <WritingLogPractise
                    activeFigureKey={room.activeFigureKey}
                    question={room.question}
                    initialText={room.initialText}
                  />

                  <div className="mx-auto mt-8 max-w-4xl">
                    <ControllAnswer />
                  </div>
                </div>
              )}

              {mode === "diagnosis" &&
                room.textData &&
                room.questions && (
                  <DiagnosticText
                    data={{
                      textData: room.textData,
                      questions: room.questions,
                    }}
                  />
                )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
