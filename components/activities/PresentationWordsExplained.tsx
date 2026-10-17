'use client';

import React, { useState } from 'react';

// --- Datastruktur och typer ---

type Category = 'Alla' | 'Stilfigurer & Retorik' | 'Bildspråk';

interface Term {
  id: string;
  term: string;
  category: Exclude<Category, 'Alla'>;
  definition: string;
  example?: string;
}

const TERMS: Term[] = [
  {
    id: 'anafor',
    term: 'Anafor',
    category: 'Stilfigurer & Retorik',
    definition: 'När man upprepar ett eller flera ord i början av flera meningar eller satser efter varandra. Det skapar en rytm och förstärker budskapet i en presentation eller text.',
    example: '"Jag har en dröm... Jag har en dröm om att en dag..." (Martin Luther King)',
  },
  {
    id: 'hyperbol',
    term: 'Hyperbol',
    category: 'Stilfigurer & Retorik',
    definition: 'En medveten och kraftig överdrift i språket som används för att göra en poäng extra tydlig eller dramatisk.',
    example: '"Jag har sagt till dig tusen gånger!" eller "Jag dör av skratt."',
  },
  {
    id: 'litotes',
    term: 'Litotes',
    category: 'Stilfigurer & Retorik',
    definition: 'En medveten underdrift där man uttrycker sig svagare än vad situationen faktiskt kräver. Används ofta humoristiskt eller för att dämpa en påstående.',
    example: '"Det var inte helt fel" (om något fantastiskt) eller "Det är lite svalt" (vid 20 minusgrader).',
  },
  {
    id: 'metafor',
    term: 'Metafor',
    category: 'Bildspråk',
    definition: 'När man jämför två sakförhållanden utan att använda jämförelseord (som "som" eller "likt"). Man säger att något ÄR någonting annat för att ge en egenskap.',
    example: '"Du är min solstråle" eller "Han har ett hjärta av sten."',
  },
];

const CATEGORIES: Category[] = [
  'Alla',
  'Stilfigurer & Retorik',
  'Bildspråk',
];

// --- Flashcard Komponent ---

interface FlashcardProps {
  term: Term;
}

const Flashcard: React.FC<FlashcardProps> = ({ term }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${term.term}. Klicka för att se förklaring.`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className="group h-64 w-full cursor-pointer focus:outline-none"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative h-full w-full border border-black bg-white transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Framsida */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 [backface-visibility:hidden]">
          <span className="text-xs font-mono uppercase tracking-wider text-black/60">
            {term.category}
          </span>
          <div className="my-auto text-center">
            <h3 className="text-2xl font-bold tracking-tight text-black">
              {term.term}
            </h3>
          </div>
          <span className="text-center text-xs font-mono text-black/40 group-hover:text-black">
            (Klicka för förklaring)
          </span>
        </div>

        {/* Baksida */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-y-auto p-6 text-black [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <h4 className="mb-2 text-base font-bold underline underline-offset-4">
              {term.term}
            </h4>
            <p className="text-sm leading-relaxed text-black/90">
              {term.definition}
            </p>
          </div>
          {term.example && (
            <div className="mt-3 border-t border-black/20 pt-2 italic text-xs text-black/70">
              <span className="font-semibold not-italic">Exempel: </span>
              {term.example}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Huvudkomponent ---

export default function PresentationWordsExplained() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Alla');

  const filteredTerms =
    selectedCategory === 'Alla'
      ? TERMS
      : TERMS.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white text-black font-sans px-4 py-12 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Kategori-filtrering */}
        <nav aria-label="Filtrera kategorier" className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`border border-black px-4 py-2 text-xs md:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>

        {/* Flashcards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {filteredTerms.map((term) => (
            <Flashcard key={term.id} term={term} />
          ))}
        </section>
      </div>
    </main>
  );
}