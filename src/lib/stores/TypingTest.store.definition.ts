import type { KeypressType } from '$lib/utils/keypress/keypress.util.definition';
import type { WordGenerator } from '$lib/utils/wordGenerator/wordGenerator';

export interface SourceTextStore {
	generator: WordGenerator;
	words: string[];
}

export interface CursorStore {
	x: number;
	y: number;
	incorrect: boolean;
	opacity?: number;
	color?: string;
}

export interface KeypressStore {
	id: string;
	keypresses: KeypressType[];
	interval?: NodeJS.Timer;
}

export interface WordData {
	expected: string;
	actual: string;
}

export interface TypingStateStore {
	id: string;
	typed: string[];
	cursor: CursorStore;
}
