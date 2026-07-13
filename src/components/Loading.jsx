'use client';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-zinc-900 border-t-[var(--f1-red)] animate-spin shadow-lg" />
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-red-500 blur-sm animate-spin" />
            </div>
            <p className="text-[var(--f1-gray)] font-mono text-xs uppercase tracking-widest animate-pulse font-semibold">
                Retrieving Telemetry...
            </p>
        </div>
    );
}
