'use client';

import React, { useState } from 'react';

// --- Datastruktur och typer ---

type Category =
  | 'Alla'
  | 'Argumentationens grundstenar'
  | 'Retorik & Stilfigurer'
  | 'Struktur & Bindord';

interface Term {
  id: string;
  term: string;
  category: Exclude<Category, 'Alla'>;
  definition: string;
  example?: string;
}

const TERMS: Term[] = [
  // Argumentationens grundstenar
  {
    id: 'tes',
    term: 'Tes',
    category: 'Argumentationens grundstenar',
    definition: 'Din huvudåsikt eller ditt ställningstagande i frågan. Det är detta du vill övertyga läsaren om i din argumenterande text.',
    example: '"Förbjud energidrycker för alla under 18 år under skoltid."',
  },
  {
    id: 'argument',
    term: 'Argument',
    category: 'Argumentationens grundstenar',
    definition: 'Skäl, bevis eller orsaker som stöder din tes. Svarar på frågan: Varför ska läsaren tycka som du?',
    example: '"Energidrycker leder till koncentrationssvårigheter och hjärtklappning hos unga."',
  },
  {
    id: 'motargument',
    term: 'Motargument',
    category: 'Argumentationens grundstenar',
    definition: 'Invändningar eller motståndarsidans synpunkter. Att lyfta vad de som tycker annorlunda anser visar att du förstår flera perspektiv.',
    example: '"Vissa menar att det är föräldrarnas ansvar och inte skolans sak att bestämma."',
  },
  {
    id: 'bemotande',
    term: 'Bemötande / Svar på motargument',
    category: 'Argumentationens grundstenar',
    definition: 'När du bemöter motargumentet och förklarar varför det inte stämmer, eller varför ditt argument väger tyngre.',
    example: '"Det stämmer att föräldrar har ett ansvar, men under skoltid har skolan en plikt att skaffa en trygg och god studiemiljö."',
  },
  {
    id: 'sakargument',
    term: 'Sakargument / Faktaargument',
    category: 'Argumentationens grundstenar',
    definition: 'Argument som bygger på kontrollera fakta, statistik, forskning eller undersökningar för att ge hög trovärdighet.',
    example: '"Enligt Livsmedelsverket ökar höga intag av koffein risken för ångest och sömnproblem hos unga."',
  },

  // Retorik & Stilfigurer
  {
    id: 'retorisk-fraga',
    term: 'Retorisk fråga',
    category: 'Retorik & Stilfigurer',
    definition: 'En fråga som ställs för att få läsaren att tänka till, inte för att få ett faktiskt svar. Svaret uppfattas som självklart.',
    example: '"Vill vi verkligen att våra elever ska sitta med hjärtklappning under lektionstid?"',
  },
  {
    id: 'anafor',
    term: 'Anafor (Upprepning)',
    category: 'Retorik & Stilfigurer',
    definition: 'När man upprepar ett eller flera ord i början av flera meningar efter varandra för att skapa rytm och förstärka budskapet.',
    example: '"Vi måste agera för hälsa. Vi måste agera för arbetsro. Vi måste agera nu."',
  },
  {
    id: 'triad',
    term: 'Triad (Tretal)',
    category: 'Retorik & Stilfigurer',
    definition: 'Att rada upp tre saker, ord eller argument efter varandra. Retoriskt mycket verkningsfullt för minne och övertygelse.',
    example: '"För ett friskare liv, bättre fokus och tryggare skolmiljö."',
  },
  {
    id: 'ethos-pathos-logos',
    term: 'Ethos, Pathos & Logos',
    category: 'Retorik & Stilfigurer',
    definition: 'Klassiska retoriska grepp: Ethos (skapa förtroende/trovärdighet), Pathos (väcka känslor), Logos (vädja till förnuft och fakta).',
    example: 'Pathos: "Tänk på barnen som mår dåligt i det tysta."',
  },

  // Struktur & Bindord
  {
    id: 'bindord-och-overgangsord',
    term: 'Övergångsord / Bindord',
    category: 'Struktur & Bindord',
    definition: 'Ord som knyter ihop meningar och visar på sammanhang, t.ex. när du ordnar argument eller jämför synpunkter.',
    example: '"För det första...", "Dessutom...", "Å ena sidan... å andra sidan..."',
  },
  {
    id: 'sammanfattande-avslutning',
    term: 'Sammanfattning & Avslutande uppmaning',
    category: 'Struktur & Bindord',
    definition: 'Textens sista del där du upprepar din tes med nya ord, sammanfattar dina starkaste argument och ger en avslutande uppmaning.',
    example: '"Sammanfattningsvis: Sätt elevernas hälsa främst och inför förbudet idag!"',
  },
  {
    id: 'signatur',
    term: 'Signatur',
    category: 'Struktur & Bindord',
    definition: 'Avsändaren som står under texten. Kan vara ditt eget namn eller en pseudonym som visar din roll i frågan.',
    example: '"Stolt skolfrised", "Engagerad elev i åk 9" eller "Orolig förälder".',
  },
];

const CATEGORIES: Category[] = [
  'Alla',
  'Argumentationens grundstenar',
  'Retorik & Stilfigurer',
  'Struktur & Bindord',
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
            Begrepp för argumenterande text
          </h1>
          <p className="text-sm md:text-base text-black/70">
            Klicka på ett kort för att vända på det och lära dig om struktur, retorik och argumentationsbegrepp.
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
                className={`border border-black px-4 py-2 text-xs md:text-sm font-medium transition-colors cursor-pointer ${
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