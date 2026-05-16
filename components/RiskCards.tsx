"use client";

type Props = {
  risks: any;
};

export default function RiskCards({
  risks,
}: Props) {
  const cards = [
    {
      label: "Migraine Risk",
      value: risks?.migraineRisk || 0,
    },
    {
      label: "Glucose Risk",
      value: risks?.glucoseRisk || 0,
    },
    {
      label: "Anxiety Risk",
      value: risks?.anxietyRisk || 0,
    },
    {
      label: "Sleep Risk",
      value: risks?.sleepRisk || 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const isHigh = card.value > 50;
        const isMedium = card.value > 25 && card.value <= 50;
        
        return (
          <div
            key={card.label}
            className={`rounded-3xl p-6 border transition-all duration-300 hover:shadow-lg ${
              isHigh 
                ? "bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200" 
                : isMedium 
                  ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
                  : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
            }`}
          >
            <div className={`text-sm font-semibold tracking-wide uppercase ${
              isHigh ? "text-rose-700" : isMedium ? "text-amber-700" : "text-slate-500"
            }`}>
              {card.label}
            </div>

            <div className={`text-4xl font-extrabold mt-3 ${
              isHigh ? "text-rose-900" : isMedium ? "text-amber-900" : "text-slate-800"
            }`}>
              {card.value}%
            </div>
          </div>
        );
      })}
    </div>
  );
}