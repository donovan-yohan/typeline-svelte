import { writable } from 'svelte/store';

export const isRunning = writable(false);
export const startTime = writable(0);
export const isFinished = writable(false);
export const isEditing = writable(false);
