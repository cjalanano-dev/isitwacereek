'use client';

import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/utils/time';
import { Timer, Trophy } from 'lucide-react';

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
            <div className="glass-card p-8 flex items-center justify-center min-h-[160px]">
                <div className="text-center text-[var(--f1-gray)] font-mono text-sm tracking-wider flex items-center gap-2 animate-pulse">
                    <Timer className="w-4 h-4 text-[var(--f1-red)]" />
                    CALCULATING TIMING WINDOW...
                </div>
            </div>
        );
    }

    if (timeRemaining.total <= 0) {
        return (
            <div className="glass-card p-8 border border-[rgba(225,6,0,0.3)] glow-red overflow-hidden relative">
                <div className="absolute top-0 right-0 font-mono text-[9px] text-red-500/30 p-2 uppercase select-none">
                    Session Status // Live
                </div>
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 text-[var(--f1-red)] bg-red-950/20 px-3 py-1 rounded-full border border-red-900/30">
                        <Trophy className="w-4 h-4 animate-bounce" />
                        <span className="text-xs font-bold uppercase tracking-widest font-mono">Session Live</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-glow text-white font-display">
                        {targetSession.session_name}
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 font-mono text-[9px] text-white/10 p-2 uppercase select-none">
                T-MINUS TELEMETRY
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[var(--f1-red)]">
                        <Timer className="w-4.5 h-4.5" />
                        <span className="text-xs font-bold uppercase tracking-widest font-mono">Next Session countdown</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-wide">
                        {targetSession.session_name}
                    </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:gap-4 justify-start md:justify-end">
                    <CountdownUnit value={timeRemaining.days} label="Days" />
                    <CountdownUnit value={timeRemaining.hours} label="Hours" />
                    <CountdownUnit value={timeRemaining.minutes} label="Mins" />
                    <CountdownUnit value={timeRemaining.seconds} label="Secs" />
                </div>
            </div>
        </div>
    );
}

function CountdownUnit({ value, label }) {
    return (
        <div className="countdown-digit flex flex-col items-center justify-center">
            <div className="text-2xl md:text-3.5xl font-black text-white font-mono tabular-nums leading-none tracking-tight">
                {String(value).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-[var(--f1-gray)] font-mono uppercase tracking-widest mt-1.5 font-bold">
                {label}
            </div>
        </div>
    );
}
