'use client';

import { Flag, MapPin, Calendar } from 'lucide-react';

export default function Hero({ meeting, isRaceWeek }) {
    if (!meeting) {
        return (
            <div className="text-center py-16 md:py-24">
                <p className="text-[var(--f1-gray)] text-lg">Loading race calendar...</p>
            </div>
        );
    }

    return (
        <section className="text-center py-12 md:py-20 relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-30"
                style={{ background: 'var(--gradient-glow)' }}
            />

            <div className="relative z-10">
                <div className="mb-6">
                    {isRaceWeek ? (
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--f1-red)] glow-red animate-pulse-glow">
                            <span className="text-2xl">🏎️</span>
                            <span className="text-xl md:text-2xl font-bold tracking-wide">
                                IT&apos;S RACE WEEK!
                            </span>
                            <span className="text-2xl">🏁</span>
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border-[var(--f1-gray)]">
                            <span className="text-xl md:text-2xl font-medium text-[var(--f1-gray-light)]">
                                No Race This Week
                            </span>
                        </div>
                    )}
                </div>

                <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 ${isRaceWeek ? 'text-glow' : ''}`}>
                    {meeting.meeting_name}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[var(--f1-gray-light)]">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[var(--f1-red)]" />
                        <span className="text-lg">{meeting.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Flag className="w-5 h-5 text-[var(--f1-red)]" />
                        <span className="text-lg">{meeting.country_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[var(--f1-red)]" />
                        <span className="text-lg">{meeting.circuit_short_name}</span>
                    </div>
                </div>

                <p className="mt-6 text-sm text-[var(--f1-gray)] max-w-2xl mx-auto px-4">
                    {meeting.meeting_official_name}
                </p>
            </div>
        </section>
    );
}
