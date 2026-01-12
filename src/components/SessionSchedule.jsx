'use client';

import { useState, useEffect } from 'react';
import { formatLocalDateTime, formatLocalTime, isSessionLive, isSessionEnded, getTimezoneAbbr } from '@/utils/time';
import { Clock, CheckCircle2, Radio } from 'lucide-react';

export default function SessionSchedule({ sessions }) {
    const [timezone, setTimezone] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setTimezone(getTimezoneAbbr());
    }, []);

    if (!mounted || !sessions || sessions.length === 0) {
        return (
            <div className="glass-card p-6">
                <p className="text-[var(--f1-gray)] text-center">No sessions scheduled</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[var(--f1-red)]" />
                    <h2 className="text-xl font-bold">Session Schedule</h2>
                </div>
                <span className="text-sm text-[var(--f1-gray)] bg-[var(--f1-dark)] px-3 py-1 rounded-full">
                    {timezone}
                </span>
            </div>

            <div className="space-y-3">
                {sessions.map((session, index) => (
                    <SessionItem key={session.session_key || index} session={session} />
                ))}
            </div>
        </div>
    );
}

function SessionItem({ session }) {
    const live = isSessionLive(session);
    const ended = isSessionEnded(session);

    const getStatusClass = () => {
        if (live) return 'session-live';
        if (ended) return 'session-completed';
        return 'session-upcoming';
    };

    const getStatusIcon = () => {
        if (live) return <Radio className="w-4 h-4 animate-pulse" />;
        if (ended) return <CheckCircle2 className="w-4 h-4" />;
        return null;
    };

    return (
        <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${getStatusClass()}`}>
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${live ? 'bg-white' : ended ? 'bg-[var(--f1-gray)]' : 'bg-green-500'}`} />

                <div>
                    <p className={`font-semibold ${ended ? 'text-[var(--f1-gray)]' : 'text-[var(--f1-white)]'}`}>
                        {session.session_name}
                    </p>
                    <p className="text-sm text-[var(--f1-gray)]">
                        {formatLocalDateTime(session.date_start, 'EEE, MMM d')}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className={`font-mono text-lg ${live ? 'text-white font-bold' : ended ? 'text-[var(--f1-gray)]' : 'text-[var(--f1-white)]'}`}>
                    {formatLocalTime(session.date_start)}
                </span>
            </div>
        </div>
    );
}
