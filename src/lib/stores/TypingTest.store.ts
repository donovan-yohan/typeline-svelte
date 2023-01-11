import { WordGenerator } from '$lib/utils/wordGenerator/wordGenerator';
import type { optionFlags } from '$lib/utils/wordGenerator/wordGenerator.definition';
import { writable } from 'svelte/store';
import type {
	TypingStateStore,
	CursorType,
	KeypressStore,
	SourceTextStore
} from './TypingTest.store.definition';

export const defaultKeypressStore: KeypressStore = {
	id: 'default',
	keypresses: [],
	interval: false,
	timeout: 0,
	activeIndex: 0
};

export const defaultCursor: CursorType = {
	x: 0,
	y: 0,
	incorrect: false
};

export const defaultTypingState: TypingStateStore = {
	id: 'default',
	typed: [''],
	keypresses: [],
	cursor: { ...defaultCursor }
};

function createWordGenerator() {
	const { subscribe, set, update } = writable<SourceTextStore>({
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

export const isRunning = writable(false);
export const isFinished = writable(false);
export const isEditing = writable(false);
export const isReplay = writable(false);
export const startTime = writable(0);

export const animationId = writable<number>(0);

export const typingContainer = writable<HTMLElement | null>(null);
