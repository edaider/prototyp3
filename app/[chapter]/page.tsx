import { notFound } from "next/navigation";
import { getChapter } from "@/content/chapterRegistry";
import { ChapterLayout } from "@/components/castle/ChapterLayout";

export const instant = false;

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: chapterId } = await params;
  const chapter = getChapter(chapterId);

  if (!chapter) {
    notFound();
  }

  return <ChapterLayout chapter={chapter} />;
}