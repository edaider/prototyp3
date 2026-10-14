"use client";

type RoomStep = "study" | "practice" | "diagnosis";

type RoomNavigationProps = {
  currentStep: RoomStep;
  onNavigate: (step: RoomStep) => void;
};

const navigationItems: {
  id: RoomStep;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "study",
    label: "Tronrummet",
    description: "Studera",
    icon: "👑",
  },
  {
    id: "practice",
    label: "Biblioteket",
    description: "Träna",
    icon: "📚",
  },
  {
    id: "diagnosis",
    label: "Fängelsehålan",
    description: "Diagnos",
    icon: "🗝️",
  },
];

export function RoomNavigation({
  currentStep,
  onNavigate,
}: RoomNavigationProps) {
  return (
    <nav
      aria-label="Kapitelrum"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-2xl border-2 border-amber-900/80 bg-stone-950/90 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md md:top-6 md:right-6"
    >
      {navigationItems.map((item) => {
        const isActive = currentStep === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? "step" : undefined}
            className={`group relative min-w-24 rounded-xl px-3 py-1.5 text-center transition-all duration-300 ${
              isActive
                ? "border-2 border-amber-500 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.35),inset_0_1px_0_rgba(251,191,36,0.3)] scale-105"
                : "border border-amber-900/40 bg-stone-900/80 text-amber-200/70 hover:border-amber-700/60 hover:bg-stone-800 hover:text-amber-100"
            }`}
          >
            {/* Inre mjuk guldram för det aktiva valet */}
            {isActive && (
              <span className="absolute inset-0.5 rounded-lg border border-amber-400/40 pointer-events-none" />
            )}

            <span className="relative z-10 block text-xs font-black tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {item.icon} {item.label}
            </span>

            <span
              className={`relative z-10 mt-0.5 block text-[10px] font-medium transition-colors ${
                isActive ? "text-amber-200" : "text-amber-200/50 group-hover:text-amber-200/80"
              }`}
            >
              {item.description}
            </span>
          </button>
        );
      })}
    </nav>
  );
}