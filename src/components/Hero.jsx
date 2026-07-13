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
        <section className="relative text-center py-12 md:py-20 rounded-3xl overflow-hidden glass-card">
            {/* Background elements */}
            <div
                className="absolute inset-0 opacity-40 mix-blend-color-dodge transition-all duration-700"
                style={{ background: 'var(--gradient-glow)' }}
            />
            
            {/* Corner Tech Lines */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-600 select-none hidden md:block">
                SYSTEM: ACTIVE // STG.GP.LNK.{(meeting.meeting_key)}
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] text-zinc-600 select-none hidden md:block">
                OFFSET: UTC+{meeting.gmt_offset}
            </div>

            <div className="relative z-10 px-4 md:px-8 space-y-6">
                <div>
                    {isRaceWeek ? (
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-[var(--f1-red)] to-red-500 glow-red animate-pulse-glow border border-red-400/20">
                            <span className="text-xl">🏎️</span>
                            <span className="text-xs md:text-sm font-black tracking-widest uppercase font-mono text-white">
                                IT&apos;S RACE WEEK!
                            </span>
                            <span className="text-xl">🏁</span>
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
                    <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none ${isRaceWeek ? 'text-glow text-white' : 'text-zinc-100'}`}>
                        {meeting.meeting_name}
                    </h1>
                    <p className="text-xs md:text-sm text-[var(--f1-gray)] max-w-2xl mx-auto uppercase font-mono tracking-wider font-semibold">
                        {meeting.meeting_official_name}
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-4">
                    <div className="flex items-center gap-2.5 bg-[rgba(0,0,0,0.2)] px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.04)] hover:border-red-500/20 transition-colors">
                        <MapPin className="w-4 h-4 text-[var(--f1-red)]" />
                        <span className="text-sm font-semibold text-zinc-300">{meeting.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-[rgba(0,0,0,0.2)] px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.04)] hover:border-red-500/20 transition-colors">
                        <Flag className="w-4 h-4 text-[var(--f1-red)]" />
                        <span className="text-sm font-semibold text-zinc-300">{meeting.country_name}</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-[rgba(0,0,0,0.2)] px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.04)] hover:border-red-500/20 transition-colors">
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
