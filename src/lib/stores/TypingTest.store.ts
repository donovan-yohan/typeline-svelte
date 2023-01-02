import { WordGenerator } from '$lib/utils/wordGenerator/wordGenerator';
import type { optionFlags } from '$lib/utils/wordGenerator/wordGenerator.definition';
import { writable } from 'svelte/store';
import type { WordStore } from './TypingTest.store.definition';

export const isScrolling = writable(false);

function createWordGenerator() {
	const { subscribe, set, update } = writable<WordStore>({
		generator: new WordGenerator('a'),
		words: []
	});

	return {
		subscribe,
		initialize: (seed: string, options?: optionFlags, time?: number) =>
			set({
				generator: new WordGenerator(seed, options, time),
				words: []
			}),
		generate: (count = 1) =>
			update((store) => {
				for (let i = 0; i < count; i++) {
					store.words.push(store.generator.generateWord());
				}
				return store;
			})
	};
}
export const wordGenerator = createWordGenerator();

export const animationId = writable<number>(0);

export const cursorRef = writable<HTMLElement | null>(null);
