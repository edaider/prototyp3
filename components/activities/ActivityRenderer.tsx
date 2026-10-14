"use client";

import type { ActivityConfig } from "@/content/types";

import { Flashcards } from "./Flashcards";
import { WritingInput } from "./WritingInput";
import { ReadingTechnique } from "./ReadingTechnique";
import { ReadingComprehension } from "./ReadingComprehension";
import { BetweenLines } from "./BetweenLines";
import { Quiz } from "./Quiz";

import TextTypesCards from "./TextTypesCards";
import RecognizeCards from "./RecognizeCards";
import TextOrderExercise from "./TextOrderExercise";
import TextTypesDiagnosis from "./TextTypesDiagnosis";

type Props = {
  activity: ActivityConfig;
  mode: "study" | "practice" | "diagnosis";
};

export function ActivityRenderer({ activity, mode }: Props) {
  if (activity.type === "ai-tutor") {
    return null;
  }

  const renderActivityContent = () => {
    switch (activity.type) {
      case "flashcards":
        return <Flashcards activity={activity} />;

      case "writing-input":
        return <WritingInput activity={activity} mode={mode} />;

      case "reading-strategies":
        return <BetweenLines activity={activity} />;

      case "reading-technique":
        return <ReadingTechnique activity={activity} />;

      case "reading-comprehension":
        return <ReadingComprehension activity={activity} />;

      case "quiz":
        return <Quiz activity={activity} />;

      case "text-types-cards":
        return <TextTypesCards {...activity.props} />;

      case "recognize-cards":
        return <RecognizeCards {...activity.props} />;

      case "text-order-exercise": {
        const exercises = activity.props?.exercises;

        if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
          console.error(
            `Aktiviteten "${activity.id}" saknar giltiga övningar för TextOrderExercise.`,
            activity.props
          );

          return (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
            >
              Övningen kan inte visas eftersom textdelarna saknas.
              Kontrollera kapitelkonfigurationen.
            </p>
          );
        }

        return <TextOrderExercise exercises={exercises} />;
      }

      case "diagnostic-text":
        return <TextTypesDiagnosis {...activity.props} />;

      default:
        console.warn(
          `Okänd aktivitetstyp i ActivityRenderer: ${(activity as { type?: string }).type}`,
          activity
        );
        return null;
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-200/80 bg-white/98 p-6 text-slate-900 shadow-2xl backdrop-blur-md md:p-10">
      {activity.title && (
        <h2 className="mb-3 text-2xl font-bold">
          {activity.title}
        </h2>
      )}

      {activity.instructions && (
        <p className="mb-6 leading-relaxed text-slate-600">
          {activity.instructions}
        </p>
      )}

      <div>{renderActivityContent()}</div>
    </div>
  );
}