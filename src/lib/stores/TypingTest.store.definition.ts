import type { KeypressType } from '$lib/utils/keypress/keypress.util.definition';
import type { WordGenerator } from '$lib/utils/wordGenerator/wordGenerator';

export interface SourceTextStore {
	generator: WordGenerator;
	words: string[];
}

export interface CursorType {
	x: number;
	y: number;
	incorrect: boolean;
	opacity?: number;
	color?: string;
}

export interface KeypressStore {
	id: string;
	keypresses: KeypressType[];
	interval: boolean;
	timeout: number;
	activeIndex: number;
}

export interface WordData {
	expected: string;
	actual: string;
}

export interface TypingStateStore {
	id: string;
	typed: string[];
	keypresses: KeypressType[];
	cursor: CursorType;
}

export interface ActiveIdType {
	word: number;
	letter: number;
}
