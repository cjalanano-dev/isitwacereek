import { formatDistanceToNow } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

// get users timezone
export function getUserTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// convert utc to local time
export function toLocalTime(utcDateString) {
    const date = new Date(utcDateString);
    return date;
}

// format date and time for display
export function formatLocalDateTime(utcDateString, formatStr = 'EEE, MMM d • HH:mm') {
    const date = new Date(utcDateString);
    const timezone = getUserTimezone();
    return formatInTimeZone(date, timezone, formatStr);
}

// format just the time
export function formatLocalTime(utcDateString, formatStr = 'HH:mm') {
    const date = new Date(utcDateString);
    const timezone = getUserTimezone();
    return formatInTimeZone(date, timezone, formatStr);
}

// format just the date
export function formatLocalDate(utcDateString, formatStr = 'EEEE, MMMM d') {
    const date = new Date(utcDateString);
    const timezone = getUserTimezone();
    return formatInTimeZone(date, timezone, formatStr);
}

// get relative time like "in 2 days"
export function getRelativeTime(dateString) {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
}

// calculate countdown to target date
export function getTimeRemaining(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: diff };
}

// check if session is happening now
export function isSessionLive(session) {
    const now = new Date();
    const start = new Date(session.date_start);
    const end = new Date(session.date_end);
    return now >= start && now <= end;
}

// check if session already happened
export function isSessionEnded(session) {
    const now = new Date();
    const end = new Date(session.date_end);
    return now > end;
}

// get timezone abbreviation like PST or EST
export function getTimezoneAbbr() {
    const date = new Date();
    const timezone = getUserTimezone();
    return formatInTimeZone(date, timezone, 'zzz');
}
