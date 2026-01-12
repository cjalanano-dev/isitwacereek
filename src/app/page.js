'use client';

import { useState, useEffect } from 'react';
import { getMeetings, getSessionsByYear, getWeather, findNextMeeting, isRaceWeek, findNextSession, getSessionsForMeeting } from '@/services/openf1';
import Hero from '@/components/Hero';
import CountdownTimer from '@/components/CountdownTimer';
import SessionSchedule from '@/components/SessionSchedule';
import TrackInfo from '@/components/TrackInfo';
import WeatherWidget from '@/components/WeatherWidget';
import Loading from '@/components/Loading';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [raceData, setRaceData] = useState({
    meeting: null,
    sessions: [],
    nextSession: null,
    weather: null,
    isRaceWeekNow: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const currentYear = new Date().getFullYear();

        // get meetings and sessions
        const [meetings, allSessions] = await Promise.all([
          getMeetings(currentYear),
          getSessionsByYear(currentYear).catch(() => []),
        ]);

        const nextMeeting = findNextMeeting(meetings);

        if (!nextMeeting) {
          // try next year if no races left
          const nextYearMeetings = await getMeetings(currentYear + 1);
          const nextYearMeeting = findNextMeeting(nextYearMeetings);

          if (nextYearMeeting) {
            const nextYearSessions = await getSessionsByYear(currentYear + 1).catch(() => []);
            const meetingSessions = getSessionsForMeeting(nextYearSessions, nextYearMeeting.meeting_key);
            const nextSession = findNextSession(meetingSessions);

            setRaceData({
              meeting: nextYearMeeting,
              sessions: meetingSessions,
              nextSession,
              weather: null,
              isRaceWeekNow: isRaceWeek(nextYearMeeting),
            });
          }
        } else {
          const meetingSessions = getSessionsForMeeting(allSessions, nextMeeting.meeting_key);
          const nextSession = findNextSession(meetingSessions);

          // try to get weather if its race week
          let weather = null;
          if (isRaceWeek(nextMeeting)) {
            try {
              weather = await getWeather(nextMeeting.meeting_key);
            } catch (e) {
              console.log('Weather not available');
            }
          }

          setRaceData({
            meeting: nextMeeting,
            sessions: meetingSessions,
            nextSession,
            weather,
            isRaceWeekNow: isRaceWeek(nextMeeting),
          });
        }
      } catch (err) {
        console.error('Failed to fetch race data:', err);
        setError('Failed to load race data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="container-main">
        <Loading />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container-main">
        <div className="text-center py-16">
          <p className="text-[var(--f1-red)] text-xl mb-4">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[var(--f1-red)] rounded-lg hover:bg-[var(--f1-red-dark)] transition-colors"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  const { meeting, sessions, nextSession, weather, isRaceWeekNow } = raceData;

  return (
    <main className="container-main">
      <Hero meeting={meeting} isRaceWeek={isRaceWeekNow} />

      <section className="my-8 md:my-12">
        <CountdownTimer targetSession={nextSession} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SessionSchedule sessions={sessions} />
        </div>

        <div className="space-y-6">
          <TrackInfo meeting={meeting} />
          <WeatherWidget weather={weather} />
        </div>
      </section>

      <footer className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.1)] text-center">
        <p className="text-sm text-[var(--f1-gray)]">
          Data provided by{' '}
          <a
            href="https://openf1.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--f1-red)] hover:underline"
          >
            OpenF1 API
          </a>
        </p>
        <p className="text-xs text-[var(--f1-gray)] mt-2">
          All times displayed in your local timezone
        </p>
      </footer>
    </main>
  );
}
