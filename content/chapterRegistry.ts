import type { ChapterConfig } from "./types";

import { genrekunskap } from "./chapters/genrekunskap";
import { mottext } from "./chapters/mottext";
import { resonemang } from "./chapters/forresonemang";
import { sammanfattningChapter } from "./chapters/sammanfattning";

export const chapters: Record<string, ChapterConfig> = {
  genrekunskap,
  "mota-en-text": mottext,
  "fora-resonemang": resonemang as unknown as ChapterConfig,
  sammanfatta: sammanfattningChapter as unknown as ChapterConfig,
};

export function getChapter(id: string) {
  return chapters[id];
}