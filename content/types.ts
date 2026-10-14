// types.ts

import type { TextOrderExerciseItem } from "@/components/activities/TextOrderExercise";
import type { TextTypeCardItem } from "@/components/activities/TextTypesCards";
import type { RecognizeCardItem } from "@/components/activities/RecognizeCards";
import type { TextTypesDiagnosisItem } from "@/components/activities/TextTypesDiagnosis";

// 1. ALLA dina befintliga aktivitetstyper finns kvar här!
export type ActivityType =
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

// 3. Fallback för ALLA andra aktiviteter i hela projektet
export type GenericActivity = {
  id: string;
  type: Exclude<
    ActivityType,
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
  | TextOrderActivity
  | TextTypesCardsActivity
  | RecognizeCardsActivity
  | DiagnosticTextActivity
  | GenericActivity;

// 5. Alla dina befintliga kapitel- och rumsstrukturer (oförändrade)
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

  rooms: {
    study: RoomConfig;
    practice: RoomConfig;
    diagnosis?: RoomConfig;
  };
};

export type ChapterData = ChapterConfig;