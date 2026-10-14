"use client";

import { useState } from "react";
import type { ActivityConfig, ChapterConfig, RoomConfig } from "@/content/types";
import { RoomView } from "./RoomView";
import { RoomNavigation } from "./RoomNavigation";

type Step = "study" | "practice" | "diagnosis";

type Props = {
  chapter: ChapterConfig;
};

export function ChapterLayout({ chapter }: Props) {
  const [step, setStep] = useState<Step>("study");
  const [roomContentVisible, setRoomContentVisible] = useState(false);

  // Hjälpfunktion som hämtar och normaliserar RoomConfig
  function getRoomConfig(s: Step): RoomConfig | undefined {
    let rawRoom: Record<string, unknown> | undefined;

    // 1. Om kapitlet använder den vanliga rooms-strukturen (t.ex. genrekunskap)
    if (chapter.rooms && chapter.rooms[s]) {
      rawRoom = chapter.rooms[s] as unknown as Record<string, unknown>;
    } else {
      // 2. Om kapitlet har direktfälten study/practice/diagnosis (t.ex. förresonemang)
      const rawChapter = chapter as unknown as Record<string, unknown>;
      rawRoom = rawChapter[s] as Record<string, unknown> | undefined;
    }

    if (!rawRoom) return undefined;

    // Konvertera eventuella gamla 'sections' till 'activities'
    const existingActivities = (rawRoom.activities as ActivityConfig[]) || [];
    const convertedSections =
      (rawRoom.sections as Array<{ id: string; title: string; component: string; props?: Record<string, unknown> }>)?.map(
        (sec) => ({
          id: sec.id,
          type: sec.component
            .toLowerCase()
            .replace(/([a-z])([A-Z])/g, "$1-$2") as ActivityConfig["type"],
          title: sec.title,
          props: sec.props,
        })
      ) || [];

    return {
      title: (rawRoom.title as string) || chapter.title,
      description: rawRoom.description as string,
      // Kombinera båda så att allt nytt innehåll syns!
      activities: [...existingActivities, ...convertedSections],
      activeFigureKey: rawRoom.activeFigureKey as RoomConfig["activeFigureKey"],
      question: rawRoom.question as string,
      initialText: rawRoom.initialText as string,
      checklistComponent: rawRoom.checklistComponent as string,
      textData: rawRoom.textData as RoomConfig["textData"],
      questions: rawRoom.questions as RoomConfig["questions"],
    };
  }

  const room = getRoomConfig(step);

  function navigateToRoom(nextStep: Step) {
    setRoomContentVisible(false);
    setStep(nextStep);
  }

  if (!room) {
    return (
      <div className="p-8 text-center text-white">
        Detta rum är inte tillgängligt i kapitlet.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-950">
      <RoomView
        key={`${chapter.id}-${step}`}
        room={room}
        mode={step}
        onContentVisible={() => setRoomContentVisible(true)}
      />

      {roomContentVisible && (
        <RoomNavigation currentStep={step} onNavigate={navigateToRoom} />
      )}
    </div>
  );
}