'use client';

import { useState, useEffect } from 'react';
import { formatLocalDateTime, formatLocalTime, isSessionLive, isSessionEnded, getTimezoneAbbr } from '@/utils/time';
import { formatInTimeZone } from 'date-fns-tz';
import { Clock, CheckCircle2, Radio, CalendarDays, ExternalLink } from 'lucide-react';

export default function SessionSchedule({ sessions, timezoneMode, gmtOffset }) {
    const [timezone, setTimezone] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (timezoneMode === 'local') {
            setTimezone(getTimezoneAbbr());
        } else {
            setTimezone(`Track (UTC${gmtOffset ? (gmtOffset.startsWith('-') ? '' : '+') + gmtOffset.substring(0, 5) : ''})`);
        }
    }, [timezoneMode, gmtOffset]);

    if (!mounted || !sessions || sessions.length === 0) {
        return (
            <div className="glass-card p-6">
                <p className="text-[var(--f1-gray)] text-center font-mono text-sm uppercase">No sessions scheduled</p>
            </div>
        );
    }

    // Helper to format track local time
    const formatSessionTime = (utcDateString, formatStr = 'HH:mm') => {
        const date = new Date(utcDateString);
        if (timezoneMode === 'local') {
            return formatLocalTime(utcDateString, formatStr);
        } else {
            if (!gmtOffset) return formatLocalTime(utcDateString, formatStr);
            
            const sign = gmtOffset.startsWith('-') ? -1 : 1;
            const cleanOffset = gmtOffset.replace(/^[+-]/, '');
            const parts = cleanOffset.split(':');
            const hours = parseInt(parts[0], 10);
            const minutes = parseInt(parts[1], 10);
            const seconds = parts[2] ? parseInt(parts[2], 10) : 0;
            
            const offsetMs = sign * ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000;
            const adjustedDate = new Date(date.getTime() + offsetMs);
            return formatInTimeZone(adjustedDate, 'UTC', formatStr);
        }
    };

    const formatSessionDate = (utcDateString, formatStr = 'EEE, MMM d') => {
        const date = new Date(utcDateString);
        if (timezoneMode === 'local') {
            return formatLocalDateTime(utcDateString, formatStr);
        } else {
            if (!gmtOffset) return formatLocalDateTime(utcDateString, formatStr);
            
            const sign = gmtOffset.startsWith('-') ? -1 : 1;
            const cleanOffset = gmtOffset.replace(/^[+-]/, '');
            const parts = cleanOffset.split(':');
            const hours = parseInt(parts[0], 10);
            const minutes = parseInt(parts[1], 10);
            const seconds = parts[2] ? parseInt(parts[2], 10) : 0;
            
            const offsetMs = sign * ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000;
            const adjustedDate = new Date(date.getTime() + offsetMs);
            return formatInTimeZone(adjustedDate, 'UTC', formatStr);
        }
    };

    // Google Calendar Link generator helper
    const getGoogleCalendarLink = (session) => {
        const formatUTC = (dateStr) => {
            const date = new Date(dateStr);
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        const title = encodeURIComponent(`F1: ${session.session_name} - ${session.circuit_short_name || 'Grand Prix'}`);
        const dates = `${formatUTC(session.date_start)}/${formatUTC(session.date_end)}`;
        const details = encodeURIComponent(`Formula 1 session: ${session.session_name}. Track local timezone offset: UTC+${session.gmt_offset || 'N/A'}`);
        
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}`;
    };

    return (
        <div className="glass-card p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[var(--f1-red)]" />
                    <h2 className="text-xl font-bold font-display tracking-wide text-white">Event Schedule</h2>
                </div>
                <span className="text-[10px] font-bold text-[var(--f1-red)] bg-red-950/20 border border-red-900/30 px-3 py-1 rounded-full font-mono uppercase">
                    {timezone}
                </span>
            </div>

            <div className="space-y-4">
                {sessions.map((session, index) => {
                    const live = isSessionLive(session);
                    const ended = isSessionEnded(session);
                    
                    return (
                        <div
                            key={session.session_key || index}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl transition-all duration-300 gap-4 ${
                                live 
                                  ? 'session-live glow-red' 
                                  : ended 
                                    ? 'session-completed' 
                                    : 'session-upcoming bg-zinc-900/40 border border-zinc-800/40 hover:border-zinc-700/60'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    {live ? (
                                        <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                                    ) : ended ? (
                                        <CheckCircle2 className="w-5 h-5 text-zinc-500" />
                                    ) : (
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className={`font-bold font-display tracking-wide text-base ${ended ? 'text-zinc-500' : 'text-white'}`}>
                                            {session.session_name}
                                        </p>
                                        {live && (
                                            <span className="text-[9px] font-black uppercase bg-white text-[var(--f1-red)] px-2 py-0.5 rounded font-mono animate-pulse">
                                                Live
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-[var(--f1-gray)] font-mono">
                                        {formatSessionDate(session.date_start, 'EEEE, MMM d')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-6 sm:text-right">
                                <div className="space-y-0.5">
                                    <span className={`font-mono text-xl font-bold tracking-tight ${
                                        live ? 'text-white' : ended ? 'text-zinc-500' : 'text-white'
                                    }`}>
                                        {formatSessionTime(session.date_start)} - {formatSessionTime(session.date_end)}
                                    </span>
                                </div>

                                {!ended && (
                                    <a
                                        href={getGoogleCalendarLink(session)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-[var(--f1-red)] text-zinc-400 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center shadow-inner hover:scale-105"
                                        title="Add to Google Calendar"
                                    >
                                        <CalendarDays className="w-4.5 h-4.5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
