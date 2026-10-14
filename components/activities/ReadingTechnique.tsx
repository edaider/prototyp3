'use client';

import { useEffect, useState } from 'react';

type Step = {
  id: number;
  label: string;
  text: string;
  image?: boolean;
};

type Props = {
  activity: {
    content: {
      title?: string;
      category?: string;
      paragraphs?: string[];
      steps?: Step[];
    };
  };
};

const yellowHighlight =
  'rounded-md bg-amber-200/90 px-1.5 py-0.5 text-slate-950 transition-colors duration-700 font-medium';

export function ReadingTechnique({ activity }: Props) {
  const {
    title = "Lästeknik",
    category = "Lästeknik",
    paragraphs = [],
    steps = []
  } = activity?.content || {};

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (steps.length === 0) return;

    const interval = setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="relative w-full space-y-6">
      <div className="flex flex-col items-start gap-1 border-b border-slate-200 pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {category}
        </span>
        <h2 className="text-2xl font-black text-slate-900">
          <span className={activeStep === 0 ? yellowHighlight : ''}>
            {title}
          </span>
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px] items-start">
        {/* PARAGRAFER */}
        <article className="space-y-5 text-base md:text-lg leading-relaxed text-slate-800">
          {paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </article>

        {/* ANMATIONSRUTA FÖR TANKESTEG */}
        {steps.length > 0 && (
          <div className="relative flex min-h-[280px] items-center justify-center rounded-2xl border border-amber-900/10 bg-amber-50/50 p-6 shadow-xs">
            {steps.map((step, index) => {
              const active = activeStep === index;

              return (
                <div
                  key={step.id}
                  className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ease-in-out ${
                    active
                      ? 'scale-100 opacity-100 blur-0'
                      : 'pointer-events-none scale-95 opacity-0 blur-xs'
                  }`}
                >
                  <span className="mb-2 text-[11px] font-bold uppercase tracking-widest text-amber-800">
                    {step.label}
                  </span>

                  {step.image && (
                    <div className="mb-3 text-4xl">
                      🏊‍♀️
                    </div>
                  )}

                  <p className="text-sm font-semibold leading-relaxed text-slate-800">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* STEGINDIKATORER */}
      {steps.length > 0 && (
        <div className="mt-6 flex justify-center gap-2 pt-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(index)}
              aria-label={`Visa steg ${index + 1}: ${step.label}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                activeStep === index
                  ? 'w-8 bg-amber-700'
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}