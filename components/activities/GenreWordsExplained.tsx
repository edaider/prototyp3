'use client';

import React, { useState } from 'react';

// --- Datastruktur och typer ---

type Category = 'Alla' | 'Berättarperspektiv' | 'Språkliga knep & Bildspråk' | 'Textens uppbyggnad & Struktur';

interface Term {
  id: string;
  term: string;
  category: Exclude<Category, 'Alla'>;
  definition: string;
  example?: string;
}

const TERMS: Term[] = [
  // Berättarperspektiv
  {
    id: 'forstahandsperspektiv',
    term: 'Förstahandsperspektiv',
    category: 'Berättarperspektiv',
    definition: 'Historien berättas ur huvudpersonens eller en karaktärs egna ögon. Berättaren använder ordet "jag" (eller "vi"). Vi får bara veta vad denna person tänker, känner och ser.',
    example: '"Jag gick nerför gatan och kände hur pulsen ökade."',
  },
  {
    id: 'tredjepersonsperspektiv',
    term: 'Tredjepersonsperspektiv',
    category: 'Berättarperspektiv',
    definition: 'Berättaren står utanför handlingen och beskriver karaktärerna som "han", "hon" eller "de". Ofta följer berättaren en specifik person, men utan att använda ordet "jag".',
    example: '"Hon gick nerför gatan och försökte att inte visa att hon var rädd."',
  },
  {
    id: 'allvetande-berattare',
    term: 'Allvetande berättare',
    category: 'Berättarperspektiv',
    definition: 'En variant av tredjepersonsperspektiv där berättaren vet allt om alla. Kan hoppa mellan olika karaktärers tankar, känslor och veta vad som händer på flera ställen samtidigt.',
    example: '"Medan Lisa gick nerför gatan var hon rädd, ovetandes om att Erik redan väntade på henne."',
  },

  // Språkliga knep & Bildspråk
  {
    id: 'bildsprak',
    term: 'Bildspråk',
    category: 'Språkliga knep & Bildspråk',
    definition: 'Ett samlingsnamn för sätt att uttrycka sig där man skapar inre bilder hos läsaren istället för att bara beskriva saker bokstavligt.',
  },
  {
    id: 'liknelser',
    term: 'Liknelser',
    category: 'Språkliga knep & Bildspråk',
    definition: 'När man jämför en sak med en annan och använder ett jämförelseord (som "som" eller "likt").',
    example: '"Han var modig som ett lejon."',
  },
  {
    id: 'metaforer',
    term: 'Metaforer',
    category: 'Språkliga knep & Bildspråk',
    definition: 'När man jämför två saker utan jämförelseord. Man säger att något ÄR någonting annat för att beskriva en egenskap.',
    example: '"Du är min solstråle" eller "Han har ett hjärta av sten."',
  },
  {
    id: 'stilfigurer',
    term: 'Stilfigurer',
    category: 'Språkliga knep & Bildspråk',
    definition: 'Ett samlingsnamn för språkliga verktyg och effekter som författare använder för att göra en text mer intressant eller dramatisk (t.ex. metaforer, upprepningar, överdrifter).',
  },

  // Textens uppbyggnad & Struktur
  {
    id: 'ingressen',
    term: 'Ingressen',
    category: 'Textens uppbyggnad & Struktur',
    definition: 'Den kortare, ofta fetstilta inledande texten i till exempel en tidningsartikel. Den sitter direkt under rubriken och sammanfattar det viktigaste för att locka till vidare läsning.',
  },
  {
    id: 'brodtext',
    term: 'Brödtext',
    category: 'Textens uppbyggnad & Struktur',
    definition: 'Själva huvudtexten i en artikel, bok eller rapport. Löptexten där hela historien, resonemanget eller nyheten förklaras i detalj.',
  },
  {
    id: 'citat',
    term: 'Citat',
    category: 'Textens uppbyggnad & Struktur',
    definition: 'En exakt återgivning av vad någon har sagt eller skrivit. I text markeras det ofta med citattecken ("...") eller talstreck (–).',
    example: '"Jag kommer alltid att älska litteratur", sade författaren.',
  },
  {
    id: 'kronologisk-ordning',
    term: 'Kronologisk ordning',
    category: 'Textens uppbyggnad & Struktur',
    definition: 'När händelser berättas i den tidsordning de faktiskt hände – från början till slut.',
    example: 'Måndag hände detta, tisdag hände nästa sak, och på onsdag avslutades det.',
  },
];

const CATEGORIES: Category[] = [
  'Alla',
  'Berättarperspektiv',
  'Språkliga knep & Bildspråk',
  'Textens uppbyggnad & Struktur',
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

// --- Huvudkomponent (Next.js Page) ---

export default function FlashcardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Alla');

  const filteredTerms =
    selectedCategory === 'Alla'
      ? TERMS
      : TERMS.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white text-black font-sans px-4 py-12 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Rubrik */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Litterära begrepp
          </h1>
          <p className="text-sm md:text-base text-black/70">
            Klicka på ett kort för att vända på det och se förklaring samt exempel.
          </p>
        </header>

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
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term) => (
            <Flashcard key={term.id} term={term} />
          ))}
        </section>
      </div>
    </main>
  );
}