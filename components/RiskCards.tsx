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
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-2xl p-5 border"
        >
          <div className="text-gray-500 text-sm">
            {card.label}
          </div>

          <div className="text-3xl font-bold mt-2">
            {card.value}%
          </div>
        </div>
      ))}
    </div>
  );
}