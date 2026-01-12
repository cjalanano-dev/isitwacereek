'use client';

import { Cloud, Thermometer, Droplets, Wind, CloudRain, Sun } from 'lucide-react';

export default function WeatherWidget({ weather }) {
    if (!weather) {
        return (
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Cloud className="w-5 h-5 text-[var(--f1-red)]" />
                    <h2 className="text-xl font-bold">Track Weather</h2>
                </div>
                <p className="text-[var(--f1-gray)] text-center py-8">
                    Weather data will be available during race week
                </p>
            </div>
        );
    }

    const getWeatherIcon = () => {
        if (weather.rainfall > 0) {
            return <CloudRain className="w-12 h-12 text-blue-400 weather-icon" />;
        }
        if (weather.humidity > 70) {
            return <Cloud className="w-12 h-12 text-gray-400 weather-icon" />;
        }
        return <Sun className="w-12 h-12 text-yellow-400 weather-icon" />;
    };

    const getConditionText = () => {
        if (weather.rainfall > 0) return 'Rainy';
        if (weather.humidity > 70) return 'Cloudy';
        return 'Clear';
    };

    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
                <Cloud className="w-5 h-5 text-[var(--f1-red)]" />
                <h2 className="text-xl font-bold">Track Weather</h2>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    {getWeatherIcon()}
                    <div>
                        <p className="text-4xl font-bold">
                            {Math.round(weather.air_temperature)}°C
                        </p>
                        <p className="text-[var(--f1-gray)]">{getConditionText()}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--f1-darker)] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-[var(--f1-gray)]">Track Temp</span>
                    </div>
                    <p className="text-xl font-bold">{Math.round(weather.track_temperature)}°C</p>
                </div>

                <div className="bg-[var(--f1-darker)] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-[var(--f1-gray)]">Humidity</span>
                    </div>
                    <p className="text-xl font-bold">{weather.humidity}%</p>
                </div>

                <div className="bg-[var(--f1-darker)] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Wind className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-[var(--f1-gray)]">Wind</span>
                    </div>
                    <p className="text-xl font-bold">{weather.wind_speed} m/s</p>
                </div>

                <div className="bg-[var(--f1-darker)] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Cloud className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-[var(--f1-gray)]">Pressure</span>
                    </div>
                    <p className="text-xl font-bold">{Math.round(weather.pressure)} hPa</p>
                </div>
            </div>

            {weather.rainfall > 0 && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center gap-3">
                    <CloudRain className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-blue-300">Rain detected on track</span>
                </div>
            )}
        </div>
    );
}
