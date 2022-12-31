import type { WordGenerator } from '$lib/utils/wordGenerator/wordGenerator';

export interface WordStore {
	generator: WordGenerator;
	words: string[];
}
