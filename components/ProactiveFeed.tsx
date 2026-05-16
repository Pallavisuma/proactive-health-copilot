"use client";

type Props = {
  triggers: any[];
};

export default function ProactiveFeed({
  triggers,
}: Props) {
  return (
    <div className="space-y-4">
      {triggers?.map((trigger, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-5 border"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">
              {trigger.title}
            </h2>

            <span className="text-xs uppercase text-red-500 font-semibold">
              {trigger.severity}
            </span>
          </div>

          <p className="text-gray-600 mt-3">
            {trigger.reason}
          </p>

          <div className="mt-4">
            <div className="font-semibold">
              Recommended Action
            </div>

            <p className="text-sm text-gray-600 mt-1">
              {trigger.recommendation}
            </p>
          </div>

          <div className="mt-4">
            <div className="font-semibold">
              Why We Spoke Up
            </div>

            <ul className="list-disc ml-5 text-sm text-gray-600 mt-2">
              {trigger.whyNow?.map(
                (reason: string, i: number) => (
                  <li key={i}>{reason}</li>
                )
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}