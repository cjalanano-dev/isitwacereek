const BASE_URL = 'https://api.openf1.org/v1';

// get all race weekends for a year
export async function getMeetings(year) {
    const response = await fetch(`${BASE_URL}/meetings?year=${year}`);
    if (!response.ok) {
        throw new Error('Failed to fetch meetings');
    }
    return response.json();
}

// get sessions for a specific meeting
export async function getSessions(meetingKey) {
    const response = await fetch(`${BASE_URL}/sessions?meeting_key=${meetingKey}`);
    if (!response.ok) {
        throw new Error('Failed to fetch sessions');
    }
    return response.json();
}

// get all sessions for a year
export async function getSessionsByYear(year) {
    const response = await fetch(`${BASE_URL}/sessions?year=${year}`);
    if (!response.ok) {
        throw new Error('Failed to fetch sessions');
    }
    return response.json();
}

// get weather for a meeting
export async function getWeather(meetingKey) {
    const response = await fetch(`${BASE_URL}/weather?meeting_key=${meetingKey}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather');
    }
    const data = await response.json();
    return data.length > 0 ? data[data.length - 1] : null;
}

// find the next upcoming race
export function findNextMeeting(meetings, now = new Date()) {
    const upcomingMeetings = meetings.filter(meeting => {
        const endDate = new Date(meeting.date_end);
        return endDate >= now;
    });

    upcomingMeetings.sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
    return upcomingMeetings[0] || null;
}

// check if its race week
export function isRaceWeek(meeting, now = new Date()) {
    if (!meeting) return false;

    const startDate = new Date(meeting.date_start);
    const endDate = new Date(meeting.date_end);

    // race week starts on the Monday of the race weekend
    // openf1 date_start is usually Thursday or Friday. 
    // Let's set the start of race week to 4 days before the start date, at 00:00 UTC.
    const raceWeekStart = new Date(startDate.getTime());
    raceWeekStart.setUTCDate(raceWeekStart.getUTCDate() - 4);
    raceWeekStart.setUTCHours(0, 0, 0, 0);

    // End of race week is the end of the Sunday (or meeting end date) at 23:59 UTC
    const raceWeekEnd = new Date(endDate.getTime());
    raceWeekEnd.setUTCHours(23, 59, 59, 999);

    const current = new Date(now.getTime());

    return current >= raceWeekStart && current <= raceWeekEnd;
}

// find next session thats coming up
export function findNextSession(sessions, now = new Date()) {
    const upcomingSessions = sessions.filter(session => {
        const sessionStart = new Date(session.date_start);
        return sessionStart > now;
    });

    upcomingSessions.sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
    return upcomingSessions[0] || null;
}

// get sessions for a specific meeting
export function getSessionsForMeeting(sessions, meetingKey) {
    return sessions
        .filter(session => session.meeting_key === meetingKey)
        .sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
}
