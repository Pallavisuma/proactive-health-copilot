"use client";

const events = [
    {
        date: "2 days ago",
        title:
            "Sleep efficiency deterioration detected",
        description:
            "Recovery scores dropped below baseline threshold.",
    },

    {
        date: "Yesterday",
        title:
            "Migraine risk escalation observed",
        description:
            "Historical trigger correlation matched previous episodes.",
    },

    {
        date: "Today",
        title:
            "Proactive intervention initiated",
        description:
            "Recovery optimization recommendations generated.",
    },
];

export default function TimelineFeed() {
    return (
        <div className="bg-white rounded-2xl border p-5">
            <h2 className="text-xl font-bold mb-5">
                Longitudinal Timeline Intelligence
            </h2>

            <div className="space-y-5">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="border-l-2 border-black pl-4"
                    >
                        <div className="text-sm text-gray-500">
                            {event.date}
                        </div>

                        <div className="font-semibold mt-1">
                            {event.title}
                        </div>

                        <div className="text-gray-600 text-sm mt-1">
                            {event.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}