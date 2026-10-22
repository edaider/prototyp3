// 1. Alla aktivitetstyper i systemet
export type ActivityType =
  | "edda-video-intro"
  | "text-genre-table"
  | "genre-words-explained"
  | "presentation-words-explained"
  | "discussion-tips"
  | "discussion-checklist"
  | "correct-text"
  | "writing-log-practise-correct"
  | "diagnostic-correct"
  | "writing-log-practise-argumentative"
  | "oral-presentation-prep"
  | "diagnostic-argumentative"
  | "full-screen-video"
  | "summary-flip-cards"
  | "timed-text-memory"
  | "summary-writing-practice"
  | "summary-diagnosis"
  | "citation-flip-cards"
  | "citation-tutor-exercise"
  | "writing-log-practise-report"
  | "diagnostic-report"
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
  | "reading-skill-cards"
  | "understand-question"
  | "resonemang-cards"
  | "controll-answer"
  | "writing-log-practice"
  | "writing-log-practise"
  | "diagnostic-text"
  | "text-types-cards"
  | "recognize-cards"
  | "text-order-exercise"
  | "text-type-diagnosis"
  | "text-types-diagnosis";

// 2. Specifika typer för aktiviteter med kända props/content

export type EddaVideoActivity = {
  id: string;
  type: "edda-video-intro";
  title?: string;
  instructions?: string;
  content?: {
    videoSrc?: string;
    caption?: string;
  };
  props?: {
    title?: string;
    videoSrc?: string;
  };
};

export type DiscussionTipsActivity = {
  id: string;
  type: "discussion-tips";
  title?: string;
  instructions?: string;
  content?: Record<string, unknown>;
  props?: Record<string, unknown>;
};

export type DiscussionChecklistActivity = {
  id: string;
  type: "discussion-checklist";
  title?: string;
  instructions?: string;
  content?: Record<string, unknown>;
  props?: {
    items?: Array<{ id: number; text: string }>;
  };
};

export type CorrectTextActivity = {
  id: string;
  type: "correct-text";
  title?: string;
  instructions?: string;
  content?: {
    title?: string;
    instructions?: string;
  };
  props?: Record<string, unknown>;
};

export type WritingLogPractiseCorrectActivity = {
  id: string;
  type: "writing-log-practise-correct";
  title?: string;
  instructions?: string;
  content?: {
    question?: string;
    initialText?: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  props?: Record<string, unknown>;
};

export type DiagnosticCorrectActivity = {
  id: string;
  type: "diagnostic-correct";
  title?: string;
  instructions?: string;
  content?: {
    textData?: {
      title: string;
      text: string;
      image?: string;
    };
  };
  props?: Record<string, unknown>;
};

export type TextGenreTableActivity = {
  id: string;
  type: "text-genre-table";
  title?: string;
  instructions?: string;
  content?: {
    genres?: Array<{
      id: string;
      name: string;
      purpose: string;
      features: string[];
      examples: string[];
    }>;
  };
  props?: Record<string, unknown>;
};

export type GenreWordsExplainedActivity = {
  id: string;
  type: "genre-words-explained";
  title?: string;
  instructions?: string;
  content?: {
    categories?: string[];
    terms?: Array<{
      id: string;
      term: string;
      category: string;
      definition: string;
      example?: string;
    }>;
  };
  props?: Record<string, unknown>;
};

export type PresentationWordsExplainedActivity = {
  id: string;
  type: "presentation-words-explained";
  title?: string;
  instructions?: string;
  content?: {
    categories?: string[];
    terms?: Array<{
      id: string;
      term: string;
      category: string;
      definition: string;
      example?: string;
    }>;
  };
  props?: Record<string, unknown>;
};

export type WritingLogPractiseArgumentativeActivity = {
  id: string;
  type: "writing-log-practise-argumentative";
  title?: string;
  instructions?: string;
  content?: {
    question?: string;
    initialText?: string;
    imageSrc?: string;
    imageAlt?: string;
    studentInterest?: string;
  };
  props?: {
    question?: string;
    initialText?: string;
    imageSrc?: string;
    imageAlt?: string;
    studentInterest?: string;
  };
};

export type OralPresentationPrepActivity = {
  id: string;
  type: "oral-presentation-prep";
  title?: string;
  instructions?: string;
  content?: {
    title?: string;
  };
  props?: Record<string, unknown>;
};

export type DiagnosticArgumentativeActivity = {
  id: string;
  type: "diagnostic-argumentative";
  title?: string;
  instructions?: string;
  content?: {
    textData?: {
      title: string;
      text: string;
      image?: string;
    };
  };
  props?: Record<string, unknown>;
};

export type FullScreenVideoActivity = {
  id: string;
  type: "full-screen-video";
  title?: string;
  instructions?: string;
  content?: {
    videoSrc?: string;
    title?: string;
  };
  props?: Record<string, unknown>;
};

export type SummaryFlipCardsActivity = {
  id: string;
  type: "summary-flip-cards";
  title?: string;
  instructions?: string;
  props?: {
    cards?: Array<{
      id: string | number;
      front: string;
      back: string;
    }>;
  };
};

export type TimedTextMemoryActivity = {
  id: string;
  type: "timed-text-memory";
  title?: string;
  instructions?: string;
  props?: {
    timerSeconds?: number;
    words?: Array<{ id: number; text: string }>;
    summaryPoints?: string[];
  };
};

export type WritingLogPractiseReportActivity = {
  id: string;
  type: "writing-log-practise-report";
  title?: string;
  instructions?: string;
  props?: {
    question?: string;
    initialText?: string;
    author?: string;
    year?: string;
    source?: string;
    imageSrc?: string;
    imageAlt?: string;
  };
};

export type DiagnosticReportActivity = {
  id: string;
  type: "diagnostic-report";
  title?: string;
  instructions?: string;
  content?: Record<string, unknown>;
  props?: Record<string, unknown>;
};

export type TextOrderActivity = {
  id: string;
  type: "text-order-exercise";
  title?: string;
  instructions?: string;
  props: {
    exercises: Array<Record<string, unknown>>;
  };
};

export type TextTypesCardsActivity = {
  id: string;
  type: "text-types-cards";
  title?: string;
  instructions?: string;
  props?: {
    cards?: Array<any>;
  };
};

export type RecognizeCardsActivity = {
  id: string;
  type: "recognize-cards";
  title?: string;
  instructions?: string;
  props?: {
    cards?: Array<any>;
  };
};

export type ReadingSkillsCardsActivity = {
  id: string;
  type: "reading-skills-cards" | "reading-skill-cards";
  title?: string;
  instructions?: string;
  content?: Record<string, unknown>;
  props?: Record<string, unknown>;
};

export type DiagnosticTextActivity = {
  id: string;
  type: "diagnostic-text";
  title?: string;
  instructions?: string;
  content?: Record<string, unknown>;
  props?: {
    items?: Array<Record<string, unknown>>;
  };
};

export type DragDropItem = {
  id: string;
  text: string;
  slotId: string;
};

export type DragDropSlot = {
  id: string;
  label: string;
  description?: string;
};

export type DragDropActivity = {
  id: string;
  type: "drag-drop";
  title?: string;
  instructions?: string;
  content?: {
    slots?: DragDropSlot[];
    items?: DragDropItem[];
  };
  props?: Record<string, unknown>;
};

// 3. Fallback för ALLA andra aktiviteter
export type GenericActivity = {
  id: string;
  type: Exclude<
    ActivityType,
    | "edda-video-intro"
    | "discussion-tips"
    | "discussion-checklist"
    | "correct-text"
    | "writing-log-practise-correct"
    | "diagnostic-correct"
    | "text-genre-table"
    | "genre-words-explained"
    | "presentation-words-explained"
    | "writing-log-practise-argumentative"
    | "oral-presentation-prep"
    | "diagnostic-argumentative"
    | "full-screen-video"
    | "summary-flip-cards"
    | "timed-text-memory"
    | "writing-log-practise-report"
    | "diagnostic-report"
    | "text-order-exercise"
    | "text-types-cards"
    | "recognize-cards"
    | "reading-skills-cards"
    | "reading-skill-cards"
    | "diagnostic-text"
    | "drag-drop"
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
  | DiscussionTipsActivity
  | DiscussionChecklistActivity
  | CorrectTextActivity
  | WritingLogPractiseCorrectActivity
  | DiagnosticCorrectActivity
  | TextGenreTableActivity
  | GenreWordsExplainedActivity
  | PresentationWordsExplainedActivity
  | WritingLogPractiseArgumentativeActivity
  | OralPresentationPrepActivity
  | DiagnosticArgumentativeActivity
  | FullScreenVideoActivity
  | SummaryFlipCardsActivity
  | TimedTextMemoryActivity
  | WritingLogPractiseReportActivity
  | DiagnosticReportActivity
  | TextOrderActivity
  | TextTypesCardsActivity
  | RecognizeCardsActivity
  | ReadingSkillsCardsActivity
  | DiagnosticTextActivity
  | DragDropActivity
  | GenericActivity;

// 5. Kapitelsystemet
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
  rooms: {
    study: RoomConfig;
    practice: RoomConfig;
    diagnosis: RoomConfig;
  };
};