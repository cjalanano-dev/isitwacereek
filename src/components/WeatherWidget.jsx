'use client';

import { Cloud, Thermometer, Droplets, Wind, CloudRain, Sun, Gauge } from 'lucide-react';

export default function WeatherWidget({ weather }) {
    if (!weather) {
        return (
            <div className="glass-card p-6 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                    <Cloud className="w-5 h-5 text-[var(--f1-red)]" />
                    <h2 className="text-xl font-bold font-display text-white">Track Weather</h2>
                </div>
                <p className="text-[var(--f1-gray)] text-center py-10 font-mono text-xs uppercase tracking-wider">
                    Weather telemetry will be active during race week
                </p>
            </div>
        );
    }

    const getWeatherIcon = () => {
        if (weather.rainfall > 0) {
            return <CloudRain className="w-14 h-14 text-blue-400 weather-icon animate-pulse" />;
        }
        if (weather.humidity > 70) {
            return <Cloud className="w-14 h-14 text-gray-400 weather-icon" />;
        }
        return <Sun className="w-14 h-14 text-yellow-400 weather-icon animate-spin-slow" style={{ animationDuration: '20s' }} />;
    };

    const getConditionText = () => {
        if (weather.rainfall > 0) return 'Rainy / Damp';
        if (weather.humidity > 70) return 'Overcast';
        return 'Clear / Dry';
    };

    return (
        <div className="glass-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 font-mono text-[9px] text-white/10 p-2 uppercase select-none">
                Live Telemetry // WX
            </div>
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <Cloud className="w-5 h-5 text-[var(--f1-red)]" />
                <h2 className="text-xl font-bold font-display text-white">Track Weather</h2>
            </div>

            <div className="flex items-center gap-6 mb-6">
                <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl">
                    {getWeatherIcon()}
                </div>
                <div className="space-y-1">
                    <p className="text-4xl md:text-5xl font-black text-white font-mono tracking-tighter">
                        {Math.round(weather.air_temperature)}°C
                    </p>
                    <p className="text-xs text-[var(--f1-red)] font-mono font-bold uppercase tracking-wider">
                        {getConditionText()}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 transition-colors hover:border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="w-4 h-4 text-orange-400" />
                        <span className="text-xs text-[var(--f1-gray)] font-mono font-semibold uppercase">Track Temp</span>
                    </div>
                    <p className="text-xl font-black text-white font-mono">{Math.round(weather.track_temperature)}°C</p>
                </div>

                <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 transition-colors hover:border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-[var(--f1-gray)] font-mono font-semibold uppercase">Humidity</span>
                    </div>
                    <p className="text-xl font-black text-white font-mono">{weather.humidity}%</p>
                </div>

                <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 transition-colors hover:border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Wind className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-[var(--f1-gray)] font-mono font-semibold uppercase">Wind Speed</span>
                    </div>
                    <p className="text-xl font-black text-white font-mono">{weather.wind_speed} m/s</p>
                </div>

                <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 transition-colors hover:border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Gauge className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs text-[var(--f1-gray)] font-mono font-semibold uppercase">Pressure</span>
                    </div>
                    <p className="text-xl font-black text-white font-mono">{Math.round(weather.pressure)} hPa</p>
                </div>
            </div>

            {weather.rainfall > 0 && (
                <div className="mt-4 p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center gap-3 animate-pulse">
                    <CloudRain className="w-5 h-5 text-blue-400" />
                    <span className="text-xs text-blue-300 font-mono font-semibold uppercase tracking-wider">Precipitation detected on track</span>
                </div>
            )}
        </div>
    );
}
