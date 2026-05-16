"use client";

type Props = {
    healthTwin: any;
};

export default function HealthTwinPanel({
    healthTwin,
}: Props) {
    if (!healthTwin) return null;

    return (
        <div className="bg-black text-white rounded-2xl p-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm opacity-70">
                        Human State
                    </div>

                    <h2 className="text-3xl font-bold mt-1">
                        {healthTwin.healthState}
                    </h2>
                </div>

                <div className="text-right">
                    <div className="text-sm opacity-70">
                        Confidence
                    </div>

                    <div className="text-2xl font-bold">
                        {Math.round(
                            healthTwin.confidence * 100
                        )}
                        %
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="text-sm opacity-70">
                    Why This Matters
                </div>

                <p className="mt-2 text-gray-300">
                    {healthTwin.explanation}
                </p>
            </div>

            <div className="mt-5">
                <div className="text-sm opacity-70 mb-2">
                    Top Drivers
                </div>

                <div className="flex flex-wrap gap-2">
                    {healthTwin.topDrivers?.map(
                        (
                            driver: string,
                            index: number
                        ) => (
                            <div
                                key={index}
                                className="bg-white/10 px-3 py-1 rounded-full text-sm"
                            >
                                {driver}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}