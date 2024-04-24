import { browser } from '$app/environment';

export function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatDateTime(date: Date | number): string {
    const temp = new Date(date);
    return temp.toLocaleString(window.navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getItemLocalStorageFromLocalStorage<T = any>(key: string) {
    if (!browser) return;
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value) as T;
    return null;
}

export function setItemToLocalStorage<T = unknown>(key: string, data: T) {
    if (!browser || data == null) return;
    const value = JSON.stringify(data);
    localStorage.setItem(key, value);
}

export function normalizeError(error: unknown): Error {
    if (error instanceof Error) return error;
    if (typeof error === 'string') return new Error(error);
    return new Error(JSON.stringify(error));
}
