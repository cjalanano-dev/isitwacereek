'use client';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-[var(--f1-dark)] border-t-[var(--f1-red)] animate-spin" />
            </div>
            <p className="text-[var(--f1-gray)] animate-pulse">
                Loading race data...
            </p>
        </div>
    );
}
