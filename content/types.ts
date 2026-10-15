import type { TextOrderExerciseItem } from "@/components/activities/TextOrderExercise";
import type { TextTypeCardItem } from "@/components/activities/TextTypesCards";
import type { RecognizeCardItem } from "@/components/activities/RecognizeCards";
import type { TextTypesDiagnosisItem } from "@/components/activities/TextTypesDiagnosis";
import type { SummaryCardItem } from "@/components/activities/SummaryFlipCards";
import type { TimedWord } from "@/components/activities/TimedTextMemory";

// 1. Lägg till dina nya aktivitetstyper här
export type ActivityType =
  | "edda-video-intro"
  | "summary-flip-cards"
  | "timed-text-memory"
  | "flashcards"
  | "writing-input"
  | "ai-tutor"
  | "drag-drop"
  | "multiple-choice"
  | "reading-technique"
  | "reading-comprehension"
  | "reading-strategies"
  | "svarsteknik"
  | "quiz"
  | "character-cards"
  | "reading-skills-cards"
  | "understand-question"
  | "resonemang-cards"
  | "controll-answer"
  | "writing-log-practise"
  | "diagnostic-text"
  | "text-types-cards"
  | "recognize-cards"
  | "text-order-exercise";

// 2. Specifika typer för aktiviteter med kända props
export type EddaVideoActivity = {
  id: string;
  type: "edda-video-intro";
  title?: string;
  instructions?: string;
  props?: {
    title?: string;
    videoSrc?: string;
  };
};

export type SummaryFlipCardsActivity = {
  id: string;
  type: "summary-flip-cards";
  title?: string;
  instructions?: string;
  props?: {
    cards?: SummaryCardItem[];
  };
};

export type TimedTextMemoryActivity = {
  id: string;
  type: "timed-text-memory";
  title?: string;
  instructions?: string;
  props?: {
    timerSeconds?: number;
    words?: TimedWord[];
    summaryPoints?: string[];
  };
};

export type TextOrderActivity = {
  id: string;
  type: "text-order-exercise";
  title?: string;
  instructions?: string;
  props: {
    exercises: TextOrderExerciseItem[];
  };
};

export type TextTypesCardsActivity = {
  id: string;
  type: "text-types-cards";
  title?: string;
  instructions?: string;
  props?: {
    cards?: TextTypeCardItem[];
  };
};

export type RecognizeCardsActivity = {
  id: string;
  type: "recognize-cards";
  title?: string;
  instructions?: string;
  props?: {
    cards?: RecognizeCardItem[];
  };
};

export type DiagnosticTextActivity = {
  id: string;
  type: "diagnostic-text";
  title?: string;
  instructions?: string;
  props?: {
    items?: TextTypesDiagnosisItem[];
  };
};

// 3. Fallback för ALLA andra aktiviteter
export type GenericActivity = {
  id: string;
  type: Exclude<
    ActivityType,
    | "edda-video-intro"
    | "summary-flip-cards"
    | "timed-text-memory"
    | "text-order-exercise"
    | "text-types-cards"
    | "recognize-cards"
    | "diagnostic-text"
  > | string;
  title?: string;
  instructions?: string;
  component?: string;
  props?: Record<string, unknown>;
  content?: Record<string, unknown>;
};

// 4. Den kompletta unionen
export type ActivityConfig =
  | EddaVideoActivity
  | SummaryFlipCardsActivity
  | TimedTextMemoryActivity
  | TextOrderActivity
  | TextTypesCardsActivity
  | RecognizeCardsActivity
  | DiagnosticTextActivity
  | GenericActivity;

// 5. Kapitelsystemet (Stödjer NU BÅDE "activities"-array och "rooms"-objekt)
export type ChapterSection = {
  id: string;
  title: string;
  component: string;
  props?: Record<string, unknown>;
};

export type RoomConfig = {
  title: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  introduction?: string;
  activities?: ActivityConfig[];
  sections?: ChapterSection[];

  activeFigureKey?:
    | "detektiven"
    | "pusslaren"
    | "journalisten"
    | "analytikern";
  question?: string;
  initialText?: string;
  checklistComponent?: string;

  textData?: {
    title: string;
    text: string;
    image?: string;
  };

  questions?: Array<{
    id: number;
    type: "multiple" | "open";
    question: string;
    options?: string[];
    correct?: number;
  }>;
};

export type ChapterConfig = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;

  intro?: {
    video: string;
    poster: string;
  };

  survey?: {
    title: string;
    questions: {
      id: string;
      prompt: string;
      options: string[];
    }[];
  };

  // Platt lista med aktiviteter ELLER rumsuppdelning
  activities?: ActivityConfig[];
  rooms?: {
    study: RoomConfig;
    practice: RoomConfig;
    diagnosis?: RoomConfig;
  };
};

export type ChapterData = ChapterConfig;