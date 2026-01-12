'use client';

import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/utils/time';
import { Timer } from 'lucide-react';

export default function CountdownTimer({ targetSession }) {
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        if (!targetSession) return;

        const updateTimer = () => {
            const remaining = getTimeRemaining(targetSession.date_start);
            setTimeRemaining(remaining);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [targetSession]);

    if (!mounted || !targetSession) {
        return (
            <div className="glass-card p-6 md:p-8">
                <div className="text-center text-[var(--f1-gray)]">
                    Loading countdown...
                </div>
            </div>
        );
    }

    if (timeRemaining.total <= 0) {
        return (
            <div className="glass-card p-6 md:p-8 glow-red">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-[var(--f1-red)] mb-2">
                        <Timer className="w-5 h-5" />
                        <span className="text-sm font-semibold uppercase tracking-wider">Now Live</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-glow">
                        {targetSession.session_name}
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 md:p-8">
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 text-[var(--f1-red)] mb-2">
                    <Timer className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Next Session</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold">
                    {targetSession.session_name}
                </h3>
            </div>

            <div className="flex justify-center gap-3 md:gap-4">
                <CountdownUnit value={timeRemaining.days} label="Days" />
                <CountdownUnit value={timeRemaining.hours} label="Hours" />
                <CountdownUnit value={timeRemaining.minutes} label="Mins" />
                <CountdownUnit value={timeRemaining.seconds} label="Secs" />
            </div>
        </div>
    );
}

function CountdownUnit({ value, label }) {
    return (
        <div className="countdown-digit">
            <div className="text-3xl md:text-4xl font-bold text-[var(--f1-white)] tabular-nums">
                {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs text-[var(--f1-gray)] uppercase tracking-wider mt-1">
                {label}
            </div>
        </div>
    );
}
