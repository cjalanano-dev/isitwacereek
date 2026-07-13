'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';

export default function TrackInfo({ meeting }) {
    if (!meeting) {
        return (
            <div className="glass-card p-6">
                <p className="text-[var(--f1-gray)] text-center font-mono text-xs uppercase animate-pulse">Loading track info...</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 font-mono text-[9px] text-white/10 p-2 uppercase select-none">
                Circuit Specs
            </div>
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <MapPin className="w-5 h-5 text-[var(--f1-red)]" />
                <h2 className="text-xl font-bold font-display text-white">Circuit Layout</h2>
            </div>

            {meeting.circuit_image && (
                <div className="relative w-full h-48 md:h-56 mb-6 rounded-2xl overflow-hidden bg-zinc-950/80 border border-zinc-900 flex items-center justify-center group">
                    <Image
                        src={meeting.circuit_image}
                        alt={`${meeting.circuit_short_name} circuit layout`}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                    />
                </div>
            )}

            <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)]">
                    <span className="text-[var(--f1-gray)] uppercase tracking-wider">Circuit Name</span>
                    <span className="font-bold text-white text-right">{meeting.circuit_short_name}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)]">
                    <span className="text-[var(--f1-gray)] uppercase tracking-wider">Location</span>
                    <span className="font-bold text-white">{meeting.location}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)]">
                    <span className="text-[var(--f1-gray)] uppercase tracking-wider">Track Type</span>
                    <span className="font-bold text-zinc-300">{meeting.circuit_type || 'Permanent'}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                    <span className="text-[var(--f1-gray)] uppercase tracking-wider">Country</span>
                    <div className="flex items-center gap-2">
                        {meeting.country_flag && (
                            <Image
                                src={meeting.country_flag}
                                alt={`${meeting.country_name} flag`}
                                width={24}
                                height={14}
                                className="rounded shadow-sm"
                                unoptimized
                            />
                        )}
                        <span className="font-bold text-white">{meeting.country_name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
