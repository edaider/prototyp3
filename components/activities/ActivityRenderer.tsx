"use client";

import type { ActivityConfig } from "@/content/types";

import { Flashcards } from "./Flashcards";
import { WritingInput } from "./WritingInput";
import { ReadingTechnique } from "./ReadingTechnique";
import { ReadingComprehension } from "./ReadingComprehension";
import { BetweenLines } from "./BetweenLines";
import { Quiz } from "./Quiz";
import EddaVideoIntro from "./EddaVideoIntro";
import TextTypesCards from "./TextTypesCards";
import RecognizeCards from "./RecognizeCards";
import TextOrderExercise from "./TextOrderExercise";

// Komponenter för Känna igen texttyper / Genrekunskap
import TextTypesDiagnosis from "./TextTypesDiagnosis";

// Komponenter för Föra Resonemang
import CharacterCards from "./CharacterCards";
import UnderstandQuestion from "./UnderstandQuestion";
import ReadingSkillsCards from "./ReadingSkillsCards";
import WritingLogPractise from "./WritingLogPractise";

// Komponenter för Sammanfattning
import SummaryFlipCards from "./SummaryFlipCards";
import TimedTextMemory from "./TimedTextMemory";
import WritingLogPractiseSummary from "./WritingLogPractiseSummary";
import DiagnosticSummary from "./DiagnosticSummary";

// Importera din DiagnosticText-komponent
import DiagnosticText from "./DiagnosticText";

// Komponenter för Referera och citera
import CitationFlipCards from "./CitationFlipCards";
import CitationTutorExercise from "./CitationTutorExercise";
import WritingLogPractiseReport from "./WritingLogPractiseReport";
import DiagnosticReport from "./DiagnosticReport";

// Komponenter för Bygga en text (Argumenterande text)
import TextGenreTable from "./TextGenreTable";
import GenreWordsExplained from "./GenreWordsExplained";
import WritingLogPractiseArgumentative from "./WritingLogPractiseGenre";
import DiagnosticArgumentative from "./DiagnosticGenreText";

// Komponenter för Presentera muntligt
import PresentationWordsExplained from "./PresentationWordsExplained";
import OralPresentationPrep from "./OralPresentationPrep";
import FullScreenVideo from "./FullScreenVideo";

// Komponenter för Samtal och diskussion
import DiscussionTips from "./DiscussionTips";
import DiscussionChecklist from "./DiscussionCheckList";

// Komponenter för Skriva korrekt
import CorrectText from "./CorrectText";
import WritingLogPractiseCorrect from "./WritingLogPractiseCorrect";
import DiagnosticCorrect from "./DiagnosticCorrect";

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
      case "edda-video-intro":
        return (
          <EddaVideoIntro
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      // Skriva korrekt
      case "correct-text":
        return (
          <CorrectText
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      case "writing-log-practise-correct":
        return (
          <WritingLogPractiseCorrect
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      case "diagnostic-correct":
        return (
          <DiagnosticCorrect
            data={activity.content as any}
            {...((activity.props as object) || {})}
          />
        );

      // Samtal och diskussion
      case "discussion-tips":
        return (
          <DiscussionTips
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      case "discussion-checklist":
        return (
          <DiscussionChecklist
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      // Presentera muntligt
      case "presentation-words-explained":
        return (
          <PresentationWordsExplained
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      case "oral-presentation-prep":
        return (
          <OralPresentationPrep
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      case "full-screen-video":
      case "fullscreen-video":
        return (
          <FullScreenVideo
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      // Bygga en text
      case "text-genre-table":
        return (
          <TextGenreTable
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      case "genre-words-explained":
        return (
          <GenreWordsExplained
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      case "writing-log-practise-argumentative":
        return (
          <WritingLogPractiseArgumentative
            {...((activity.content as object) || {})}
            {...((activity.props as object) || {})}
          />
        );

      case "diagnostic-argumentative":
        return (
          <DiagnosticArgumentative
            data={activity.content as any}
            {...((activity.props as object) || {})}
          />
        );

      // Referera och citera
      case "citation-flip-cards":
        return (
          <CitationFlipCards
            activity={activity as any}
            {...((activity.props as object) || {})}
          />
        );

      case "citation-tutor-exercise":
        return (
          <CitationTutorExercise
            activity={activity as any}
            {...((activity.props as object) || {})}
          />
        );

      case "writing-log-practise-report":
        return (
          <WritingLogPractiseReport {...((activity.props as object) || {})} />
        );

      case "diagnostic-report":
        return (
          <DiagnosticReport
            data={activity.content as any}
            {...((activity.props as object) || {})}
          />
        );

      // Sammanfattning
      case "summary-flip-cards":
        return <SummaryFlipCards {...((activity.props as object) || {})} />;

      case "timed-text-memory":
        return <TimedTextMemory {...((activity.props as object) || {})} />;

      case "summary-writing-practice":
        return (
          <WritingLogPractiseSummary {...((activity.props as object) || {})} />
        );

      case "summary-diagnosis":
        return <DiagnosticSummary {...((activity.props as object) || {})} />;

      // Föra Resonemang
      case "character-cards":
        return (
          <CharacterCards
            activity={activity as any}
            {...((activity.props as object) || {})}
          />
        );

      case "svarsteknik":
      case "understand-question":
        return (
          <UnderstandQuestion
            activity={activity as any}
            {...((activity.props as object) || {})}
          />
        );

      case "reading-skill-cards":
      case "reading-skills-cards":
        return (
          <ReadingSkillsCards
            activity={activity as any}
            {...((activity.props as object) || {})}
          />
        );

      case "writing-log-practice":
        return (
          <WritingLogPractise
            activity={activity as any}
            mode={mode}
            {...((activity.props as object) || {})}
          />
        );

      // Övriga
      case "flashcards":
        return <Flashcards activity={activity as any} />;

      case "writing-input":
        return <WritingInput activity={activity as any} mode={mode} />;

      case "reading-strategies":
        return <BetweenLines activity={activity as any} />;

      case "reading-technique":
        return <ReadingTechnique activity={activity as any} />;

      case "reading-comprehension":
        return <ReadingComprehension activity={activity as any} />;

      case "quiz":
        return <Quiz activity={activity as any} />;

      case "text-types-cards":
        return <TextTypesCards {...((activity.props as any) || {})} />;

      case "recognize-cards":
        return <RecognizeCards {...((activity.props as any) || {})} />;

      case "text-type-diagnosis":
      case "text-types-diagnosis":
        return <TextTypesDiagnosis {...((activity.props as any) || {})} />;

      case "text-order-exercise": {
        const exercises = (activity.props as any)?.exercises;

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

        return <TextOrderExercise exercises={exercises as any} />;
      }

      case "diagnostic-text":
        return (
          <DiagnosticText
            data={activity.content as any}
            {...((activity.props as object) || {})}
          />
        );

      default:
        console.warn(
          `Okänd aktivitetstyp i ActivityRenderer: ${
            (activity as { type?: string }).type
          }`,
          activity
        );
        return null;
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-200/80 bg-white/98 p-6 text-slate-900 shadow-2xl backdrop-blur-md md:p-10">
      {activity.title &&
        activity.type !== "edda-video-intro" &&
        activity.type !== "diagnostic-text" &&
        activity.type !== "diagnostic-report" &&
        activity.type !== "summary-diagnosis" &&
        activity.type !== "text-types-diagnosis" &&
        activity.type !== "text-type-diagnosis" &&
        activity.type !== "diagnostic-argumentative" &&
        activity.type !== "diagnostic-correct" &&
        activity.type !== "full-screen-video" &&
        activity.type !== "fullscreen-video" && (
          <h2 className="mb-3 text-2xl font-bold">{activity.title}</h2>
        )}

      {activity.instructions &&
        activity.type !== "edda-video-intro" &&
        activity.type !== "diagnostic-text" &&
        activity.type !== "diagnostic-report" &&
        activity.type !== "summary-diagnosis" &&
        activity.type !== "text-types-diagnosis" &&
        activity.type !== "text-type-diagnosis" &&
        activity.type !== "diagnostic-argumentative" &&
        activity.type !== "diagnostic-correct" &&
        activity.type !== "full-screen-video" &&
        activity.type !== "fullscreen-video" && (
          <p className="mb-6 leading-relaxed text-slate-600">
            {activity.instructions}
          </p>
        )}

      <div>{renderActivityContent()}</div>
    </div>
  );
}