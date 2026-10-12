'use client';

import { Flag, MapPin, Calendar } from 'lucide-react';

export default function Hero({ meeting, isRaceWeek }) {
    if (!meeting) {
        return (
            <div className="text-center py-16 md:py-24 glass-card">
                <p className="text-[var(--f1-gray)] text-lg animate-pulse">Loading race weekend details...</p>
            </div>
        );
    }

    return (
        <section className="relative text-left py-10 md:py-14 overflow-hidden glass-card">
            {/* Background elements */}
            <div
                className="absolute inset-0 opacity-40 mix-blend-color-dodge transition-all duration-700"
                style={{ background: 'var(--gradient-glow)' }}
            />
            
            <div className="relative z-10 px-6 md:px-10 space-y-6 max-w-5xl">
                <div>
                    {isRaceWeek ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--f1-red)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span className="text-xs font-bold tracking-wider uppercase text-white">It&apos;s race week</span>
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--f1-gray)] animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--f1-gray-light)] font-mono">
                                Upcoming Event
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-.045em] leading-[.95] text-white">
                        {meeting.meeting_name}
                    </h1>
                    <p className="text-sm md:text-base text-[var(--f1-gray)] max-w-2xl leading-relaxed">
                        {meeting.meeting_official_name}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[var(--f1-red)]" />
                        <span className="text-sm font-semibold text-zinc-300">{meeting.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Flag className="w-4 h-4 text-[var(--f1-red)]" />
                        <span className="text-sm font-semibold text-zinc-300">{meeting.country_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[var(--f1-red)]" />
                        <span className="text-sm font-semibold text-zinc-300">{meeting.circuit_short_name}</span>
                    </div>
                </div>
            </div>
            
            {/* Bottom styling element: carbon skew line */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="f1-divider" />
            </div>
        </section>
    );
}
