import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  GripVertical, 
  Check,
  ArrowRight
} from 'lucide-react';

// Textstycken och facit för den argumenterande texten
const TEXT_PARTS = [
  {
    id: 'rubrik',
    slotId: 'rubrik',
    label: 'RUBRIK',
    text: 'Alla borde äta vegetarisk mat!'
  },
  {
    id: 'inledning',
    slotId: 'inledning',
    label: 'INLEDNING',
    text: 'Alla vet vi att det är bra för vår hälsa att äta grönsaker. Ändå äter många människor kött istället. Jag tycker att det är helt fel. Det finns många anledningar till att jag tycker det.'
  },
  {
    id: 'argument1',
    slotId: 'argument1',
    label: 'ARGUMENT 1',
    text: 'För det första är det inte bra för miljön att äta kött. Det kostar mycket onödiga koldioxidutsläpp att föda upp ett djur till slakt.'
  },
  {
    id: 'argument2',
    slotId: 'argument2',
    label: 'ARGUMENT 2',
    text: 'För det andra är det synd om djuren som dödas. Alla djur är lika mycket värda som människor och jag blir arg när jag tänker på hur människor behandlar djur.'
  },
  {
    id: 'motargument',
    slotId: 'motargument',
    label: 'MOTARGUMENT',
    text: 'Några hävdar nog att vi behöver äta kött för att få i oss bra näringsämnen. Men det finns många bra näringsämnen i grönsaker också, faktiskt! Dessutom innehåller grönsaker många viktiga vitaminer som kött saknar.'
  },
  {
    id: 'avslutning',
    slotId: 'avslutning',
    label: 'AVSLUTNING',
    text: 'För att sammanfatta gör vi inte bara en god gärning för miljön och djurens liv när vi slutar äta kött. Vi får också ett hälsosammare matintag som förbättrar vår hälsa avsevärt.'
  },
  {
    id: 'signatur',
    slotId: 'signatur',
    label: 'SIGNATUR',
    text: 'Stolt vegetarian'
  }
];

// Slumpa ordningen på en array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function App() {
  const [bankItems, setBankItems] = useState([]);
  const [slots, setSlots] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Nollställ och initiera övningen
  const initGame = () => {
    setBankItems(shuffleArray(TEXT_PARTS));
    const initialSlots = {};
    TEXT_PARTS.forEach(part => {
      initialSlots[part.slotId] = null;
    });
    setSlots(initialSlots);
    setSelectedCard(null);
    setDraggedItem(null);
    setFeedback(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Drag and drop-logik
  const handleDragStart = (e, item, source) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ item, source }));
    setDraggedItem({ item, source });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetSlotId) => {
    e.preventDefault();
    setDraggedItem(null);
    
    let dataStr = e.dataTransfer.getData('text/plain');
    let data = null;
    try {
      data = JSON.parse(dataStr);
    } catch (err) {
      if (draggedItem) data = draggedItem;
    }

    if (!data) return;

    const { item, source } = data;
    placeItemInSlot(item, targetSlotId, source);
  };

  // Placera ett kort i en slot
  const placeItemInSlot = (item, targetSlotId, source) => {
    setFeedback(null);

    setSlots(prevSlots => {
      const newSlots = { ...prevSlots };
      const existingItemInSlot = newSlots[targetSlotId];

      if (source && source.type === 'slot') {
        newSlots[source.slotId] = null;
      }

      if (existingItemInSlot && source?.type === 'bank') {
        setBankItems(prevBank => [...prevBank.filter(b => b.id !== item.id), existingItemInSlot]);
      } else if (existingItemInSlot && source?.type === 'slot') {
        newSlots[source.slotId] = existingItemInSlot;
      } else if (source?.type === 'bank') {
        setBankItems(prevBank => prevBank.filter(b => b.id !== item.id));
      }

      newSlots[targetSlotId] = item;
      return newSlots;
    });

    setSelectedCard(null);
  };

  // Klick-interaktion för mobiler/pekskärmar
  const handleCardClick = (item, source) => {
    setFeedback(null);
    if (selectedCard && selectedCard.item.id === item.id) {
      setSelectedCard(null);
      return;
    }
    setSelectedCard({ item, source });
  };

  const handleSlotClick = (targetSlotId) => {
    if (!selectedCard) return;
    placeItemInSlot(selectedCard.item, targetSlotId, selectedCard.source);
  };

  // Ta bort ett kort från en slot tillbaka till textbanken
  const handleRemoveFromSlot = (slotId, item, e) => {
    e.stopPropagation();
    setFeedback(null);
    setSlots(prev => ({ ...prev, [slotId]: null }));
    setBankItems(prev => [...prev, item]);
    if (selectedCard?.item?.id === item.id) setSelectedCard(null);
  };

  // Rätta svar
  const checkAnswers = () => {
    const results = {};
    let correctCount = 0;
    let placedCount = 0;

    TEXT_PARTS.forEach(part => {
      const placedItem = slots[part.slotId];
      if (placedItem) {
        placedCount++;
        const isCorrect = placedItem.id === part.slotId;
        results[part.slotId] = isCorrect;
        if (isCorrect) correctCount++;
      } else {
        results[part.slotId] = false;
      }
    });

    setFeedback({
      isComplete: placedCount === TEXT_PARTS.length,
      correctCount,
      total: TEXT_PARTS.length,
      results
    });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ENKEL RUBRIK */}
        <header className="text-center py-4 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Pussla ihop texten
          </h1>
          <p className="text-sm text-neutral-500 font-medium">
            Dra och släpp eller klicka på textstyckena för att placera dem i rätt ordning.
          </p>
        </header>

        {/* FEEDBACK BANNER */}
        {feedback && (
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
            feedback.correctCount === feedback.total
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-neutral-50 border-neutral-300 text-black'
          }`}>
            <div className="flex items-center gap-3">
              {feedback.correctCount === feedback.total ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-neutral-400 shrink-0" />
              )}
              <div>
                <h2 className="text-sm sm:text-base font-bold">
                  {feedback.correctCount === feedback.total
                    ? 'Snyggt jobbat! Alla delar sitter på rätt plats.'
                    : `Du har ${feedback.correctCount} av ${feedback.total} rätt.`}
                </h2>
                <p className="text-xs text-neutral-600">
                  {!feedback.isComplete 
                    ? 'Placera ut alla textstycken och kontrollera igen.' 
                    : feedback.correctCount === feedback.total 
                    ? 'Du har stenkoll på den argumenterande textens struktur!' 
                    : 'Kolla på de markerade rutorna och prova att flytta om dem.'}
                </p>
              </div>
            </div>

            <button
              onClick={checkAnswers}
              className="px-4 py-2 rounded-lg font-bold border border-black bg-black text-white hover:bg-neutral-800 transition-all text-xs whitespace-nowrap"
            >
              Kontrollera igen
            </button>
          </div>
        )}

        {/* HUVUDINNEHÅLL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* TEXTBANK (VÄNSTER) */}
          <div className="lg:col-span-5 bg-neutral-50 rounded-xl p-4 sm:p-5 border border-neutral-200 sticky top-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-black text-sm uppercase tracking-wider">
                Textstycken ({bankItems.length} kvar)
              </h2>
              {selectedCard && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-black bg-black text-white">
                  Kort valt
                </span>
              )}
            </div>

            {bankItems.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-neutral-300 rounded-lg bg-white text-neutral-400">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                <p className="text-xs font-medium">Alla kort har placerats ut!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
                {bankItems.map(item => {
                  const isSelected = selectedCard?.item?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item, { type: 'bank' })}
                      onClick={() => handleCardClick(item, { type: 'bank' })}
                      className={`group p-3.5 rounded-lg bg-white border transition-all cursor-grab active:cursor-grabbing select-none ${
                        isSelected 
                          ? 'border-black ring-1 ring-black' 
                          : 'border-neutral-200 hover:border-black'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <GripVertical className="w-4 h-4 mt-0.5 text-neutral-300 group-hover:text-black shrink-0" />
                        <p className="text-black text-xs sm:text-sm leading-relaxed font-normal">
                          "{item.text}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* DROP-ZONER / MALL (HÖGER) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-3">
              {TEXT_PARTS.map((part) => {
                const placedItem = slots[part.slotId];
                const isSelected = selectedCard && selectedCard.item.id === placedItem?.id;
                const isCorrect = feedback?.results ? feedback.results[part.slotId] : null;

                return (
                  <div
                    key={part.slotId}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, part.slotId)}
                    onClick={() => handleSlotClick(part.slotId)}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all relative bg-white ${
                      placedItem
                        ? isCorrect === true
                          ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                          : isCorrect === false
                          ? 'border-rose-400 bg-rose-50/30'
                          : 'border-black'
                        : selectedCard
                        ? 'border-black border-dashed bg-neutral-50 cursor-pointer'
                        : 'border-neutral-200 border-dashed bg-neutral-50/50 hover:border-neutral-300'
                    }`}
                  >
                    {/* Header för slotten */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-500 uppercase">
                        {part.label}
                      </span>

                      {/* Rättningsikoner */}
                      {isCorrect === true && (
                        <div className="flex items-center gap-1 text-emerald-700 text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Rätt
                        </div>
                      )}
                      {isCorrect === false && (
                        <div className="flex items-center gap-1 text-rose-600 text-xs font-semibold">
                          <XCircle className="w-3.5 h-3.5" /> Fel plats
                        </div>
                      )}
                    </div>

                    {/* Placerat kort eller tom ruta */}
                    {placedItem ? (
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, placedItem, { type: 'slot', slotId: part.slotId })}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(placedItem, { type: 'slot', slotId: part.slotId });
                        }}
                        className={`p-3 rounded-lg bg-white border transition-all cursor-grab active:cursor-grabbing flex items-start justify-between gap-3 ${
                          isSelected ? 'border-black ring-1 ring-black' : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <p className="text-black text-xs sm:text-sm leading-relaxed font-normal">
                          {placedItem.text}
                        </p>
                        <button
                          onClick={(e) => handleRemoveFromSlot(part.slotId, placedItem, e)}
                          title="Ta bort kort"
                          className="text-neutral-400 hover:text-red-600 p-1 rounded transition-colors shrink-0"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="py-2.5 px-3 border border-neutral-200 rounded-lg text-center text-neutral-400 text-xs bg-white">
                        {selectedCard ? (
                          <span className="text-black font-semibold flex items-center justify-center gap-1">
                            Klicka här för att placera <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span>Släpp <strong>{part.label}</strong> här</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* KNAPPAR I BOTTEN */}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
              <button
                onClick={initGame}
                className="flex items-center gap-1.5 text-neutral-500 hover:text-black text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Återställ
              </button>

              <button
                onClick={checkAnswers}
                className="flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-all"
              >
                <Check className="w-4 h-4" /> Rätta
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}