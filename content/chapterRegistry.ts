import type { ChapterConfig } from "./types";
import { genrekunskap } from "./chapters/genrekunskap";
import { mottext } from "./chapters/mottext";
import { resonemang } from "./chapters/forresonemang";
import { referera } from "./chapters/referera";
import { sammanfattningChapter } from "./chapters/sammanfattning";
import { byggtext } from "./chapters/byggtext"; 
import { presentera } from "./chapters/presentera"; 
import { samtal } from "./chapters/samtal";
import { skrivakorrekt } from "./chapters/skrivakorrekt"; // <-- Importera skrivakorrekt-kapitlet

export const chapters: Record<string, ChapterConfig> = {
  genrekunskap,
  "mota-en-text": mottext,
  "fora-resonemang": resonemang as unknown as ChapterConfig,
  "referera-och-citera": referera as unknown as ChapterConfig,
  sammanfatta: sammanfattningChapter as unknown as ChapterConfig,
  "bygga-en-text": byggtext as unknown as ChapterConfig, 
  "framfora-muntligt": presentera as unknown as ChapterConfig,
  "samtal-och-diskussion": samtal as unknown as ChapterConfig,
  "skriva-korrekt": skrivakorrekt as unknown as ChapterConfig, // <-- Registrera kapitlet här
};

export function getChapter(id: string) {
  return chapters[id];
}