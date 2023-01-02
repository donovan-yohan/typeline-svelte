import { writable } from 'svelte/store';

export const isRunning = writable(false);
export const isFinished = writable(false);
export const isEditing = writable(false);
