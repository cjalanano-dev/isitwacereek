'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';

export default function TrackInfo({ meeting }) {
    if (!meeting) {
        return (
            <div className="glass-card p-6">
                <p className="text-[var(--f1-gray)] text-center">Loading track info...</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[var(--f1-red)]" />
                <h2 className="text-xl font-bold">Circuit Info</h2>
            </div>

            {meeting.circuit_image && (
                <div className="relative w-full h-48 md:h-56 mb-6 rounded-xl overflow-hidden bg-[var(--f1-darker)]">
                    <Image
                        src={meeting.circuit_image}
                        alt={`${meeting.circuit_short_name} circuit layout`}
                        fill
                        className="object-contain p-4"
                        unoptimized
                    />
                </div>
            )}

            <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.1)]">
                    <span className="text-[var(--f1-gray)]">Circuit</span>
                    <span className="font-semibold">{meeting.circuit_short_name}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.1)]">
                    <span className="text-[var(--f1-gray)]">Location</span>
                    <span className="font-semibold">{meeting.location}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.1)]">
                    <span className="text-[var(--f1-gray)]">Type</span>
                    <span className="font-semibold">{meeting.circuit_type || 'Permanent'}</span>
                </div>

                <div className="flex items-center justify-between py-3">
                    <span className="text-[var(--f1-gray)]">Country</span>
                    <div className="flex items-center gap-2">
                        {meeting.country_flag && (
                            <Image
                                src={meeting.country_flag}
                                alt={`${meeting.country_name} flag`}
                                width={32}
                                height={18}
                                className="rounded"
                                unoptimized
                            />
                        )}
                        <span className="font-semibold">{meeting.country_name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
