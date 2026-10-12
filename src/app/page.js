'use client';

import { useState, useEffect } from 'react';
import { getMeetings, getSessionsByYear, getWeather, findNextMeeting, isRaceWeek, findNextSession, getSessionsForMeeting } from '@/services/openf1';
import Hero from '@/components/Hero';
import CountdownTimer from '@/components/CountdownTimer';
import SessionSchedule from '@/components/SessionSchedule';
import TrackInfo from '@/components/TrackInfo';
import WeatherWidget from '@/components/WeatherWidget';
import Loading from '@/components/Loading';
import { Globe, Clock, Flag } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // App state
  const [meetings, setMeetings] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [nextSession, setNextSession] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isRaceWeekNow, setIsRaceWeekNow] = useState(false);
  
  // Timezone preference: 'local' or 'track'
  const [timezoneMode, setTimezoneMode] = useState('local');

  // Initial load of calendar meetings and all sessions
  useEffect(() => {
    async function fetchCalendarData() {
      try {
        setLoading(true);
        setError(null);

        const currentYear = new Date().getFullYear();

        const [fetchedMeetings, fetchedSessions] = await Promise.all([
          getMeetings(currentYear),
          getSessionsByYear(currentYear).catch(() => []),
        ]);

        // Filter out cancelled meetings
        const activeMeetings = fetchedMeetings.filter(m => !m.is_cancelled);
        setMeetings(activeMeetings);
        setAllSessions(fetchedSessions);

        let initialMeeting = findNextMeeting(activeMeetings);

        // If no upcoming meeting for this year, try next year
        if (!initialMeeting) {
          const nextYearMeetings = await getMeetings(currentYear + 1).catch(() => []);
          const activeNextYearMeetings = nextYearMeetings.filter(m => !m.is_cancelled);
          if (activeNextYearMeetings.length > 0) {
            setMeetings(activeNextYearMeetings);
            
            const nextYearSessions = await getSessionsByYear(currentYear + 1).catch(() => []);
            setAllSessions(nextYearSessions);
            
            initialMeeting = findNextMeeting(activeNextYearMeetings) || activeNextYearMeetings[0];
          } else {
            // Fallback to the last meeting of this year
            initialMeeting = activeMeetings[activeMeetings.length - 1];
          }
        }

        setSelectedMeeting(initialMeeting);
      } catch (err) {
        console.error('Failed to fetch race calendar data:', err);
        setError('Failed to load F1 calendar. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCalendarData();
  }, []);

  // Effect to load sessions and weather for the selected meeting
  useEffect(() => {
    if (!selectedMeeting) return;

    async function loadMeetingDetails() {
      try {
        const meetingSessions = getSessionsForMeeting(allSessions, selectedMeeting.meeting_key);
        setSelectedSessions(meetingSessions);
        
        const next = findNextSession(meetingSessions);
        setNextSession(next);

        const isWeek = isRaceWeek(selectedMeeting);
        setIsRaceWeekNow(isWeek);

        // Fetch weather
        setWeather(null);
        if (isWeek) {
          try {
            const w = await getWeather(selectedMeeting.meeting_key);
            setWeather(w);
          } catch (e) {
            console.log('Weather not available for this meeting key');
          }
        }
      } catch (err) {
        console.error('Error loading meeting details:', err);
      }
    }

    loadMeetingDetails();
  }, [selectedMeeting, allSessions]);

  const handleMeetingChange = (meetingKey) => {
    const meeting = meetings.find(m => m.meeting_key === Number(meetingKey));
    if (meeting) {
      setSelectedMeeting(meeting);
    }
  };

  if (loading) {
    return (
      <main className="container-main min-h-screen flex items-center justify-center">
        <Loading />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container-main flex items-center justify-center min-h-screen">
        <div className="text-center py-16 glass-card p-8 max-w-md w-full border-[rgba(225,6,0,0.3)]">
          <p className="text-[var(--f1-red)] text-xl font-bold mb-4">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[var(--f1-red)] rounded-lg hover:bg-[var(--f1-red-dark)] transition-all font-semibold shadow-lg glow-red"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container-main space-y-5 md:space-y-7">
      {/* Top Header controls: Calendar Selector & Timezone Toggle */}
      <header className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-3 md:py-4">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--f1-red)]"><Flag className="h-4 w-4" /></span>
          <div>
            <span className="block font-display font-bold text-lg tracking-tight">Is it race week?</span>
            <span className="block text-[10px] uppercase tracking-[.2em] text-[var(--f1-gray)]">Formula 1 weekend guide</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full md:w-auto">
          {/* Race dropdown selector */}
          <div className="relative w-full sm:w-72">
            <select
              value={selectedMeeting?.meeting_key || ''}
              onChange={(e) => handleMeetingChange(e.target.value)}
              aria-label="Select a race weekend"
              className="w-full bg-[var(--f1-dark)] border border-[#2a2a2a] text-sm rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-[var(--f1-red)] transition-colors custom-select cursor-pointer font-medium"
            >
              {meetings.map((m) => (
                <option key={m.meeting_key} value={m.meeting_key}>
                  {m.meeting_name} ({m.circuit_short_name})
                </option>
              ))}
            </select>
          </div>

          {/* Timezone Preference Switcher */}
          <div className="flex bg-[var(--f1-dark)] border border-[#2a2a2a] rounded-lg p-1 w-full sm:w-auto" aria-label="Time display preference">
            <button
              onClick={() => setTimezoneMode('local')}
              aria-pressed={timezoneMode === 'local'}
              className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors w-1/2 sm:w-auto ${
                timezoneMode === 'local'
                  ? 'bg-white text-black'
                  : 'text-[var(--f1-gray)] hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              My time
            </button>
            <button
              onClick={() => setTimezoneMode('track')}
              aria-pressed={timezoneMode === 'track'}
              className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors w-1/2 sm:w-auto ${
                timezoneMode === 'track'
                  ? 'bg-white text-black'
                  : 'text-[var(--f1-gray)] hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Track time
            </button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <Hero meeting={selectedMeeting} isRaceWeek={isRaceWeekNow} />

      {/* Countdown timer */}
      <section className="relative">
        <CountdownTimer targetSession={nextSession} />
      </section>

      {/* Main dashboard content grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        <div className="lg:col-span-2">
          <SessionSchedule 
            sessions={selectedSessions} 
            timezoneMode={timezoneMode} 
            gmtOffset={selectedMeeting?.gmt_offset} 
          />
        </div>

        <div className="space-y-6 md:space-y-8">
          <TrackInfo meeting={selectedMeeting} />
          <WeatherWidget weather={weather} />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-2 pb-6">
        <p className="text-sm text-[var(--f1-gray)]">
          Data provided by{' '}
          <a
            href="https://openf1.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--f1-red)] hover:underline font-semibold"
          >
            OpenF1 API
          </a>
        </p>
        <p className="text-xs text-[var(--f1-gray)]">
          Session times follow your selected timezone.
        </p>
      </footer>
    </main>
  );
}
