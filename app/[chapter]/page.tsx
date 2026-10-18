import { notFound } from "next/navigation";
import { getChapter, getAllChapterIds } from "@/content/chapterRegistry"; 
import { ChapterLayout } from "@/components/castle/ChapterLayout";

// Detta berättar för Next.js vilka sidor som ska byggas statiskt baserat på dina nycklar!
export async function generateStaticParams() {
  const chapterIds = getAllChapterIds();

  return chapterIds.map((chapter) => ({
    chapter: chapter,
  }));
}

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