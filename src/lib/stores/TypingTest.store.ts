import { WordGenerator } from '$lib/utils/wordGenerator/wordGenerator';
import type { optionFlags } from '$lib/utils/wordGenerator/wordGenerator.definition';
import { writable } from 'svelte/store';
import type {
	TypingStateStore,
	CursorStore,
	KeypressStore,
	SourceTextStore
} from './TypingTest.store.definition';

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

export const keypressesList = writable<KeypressStore[]>([
	{
		id: 'default',
		keypresses: [],
		interval: undefined
	}
]);

export const animationId = writable<number>(0);

export const gameState = writable({
	isRunning: false,
	startTime: 0,
	isFinished: false,
	isEditing: false,
	isReplay: false
});

export function createTypingStateList() {
	const { subscribe, set, update } = writable<TypingStateStore[]>([
		{
			id: 'default',
			typed: [''],
			cursor: {
				x: 0,
				y: 0,
				incorrect: false
			}
		}
	]);

	return {
		subscribe,
		set,
		update,
		forceUpdate: () => {
			update((store) => [...store]);
		},
		updateCursor: (id: string, newCursor: CursorStore) => {
			update((store) => {
				const target = store.find((s) => s.id === id);
				if (!target) return store;
				target.cursor = newCursor;
				return [...store.filter((s) => s.id !== id), { ...target }];
			});
		}
	};
}

export const typingStateList = createTypingStateList();

export const typingContainer = writable<HTMLElement | null>(null);

// export function createCursorStateList() {
// 	const { subscribe, set, update } = writable<CursorStore[]>([
// 		{
// 			id: 'default',
// 			x: 0,
// 			y: 0,
// 			incorrect: false
// 		}
// 	]);

// 	return {
// 		subscribe,
// 		set,
// 		update,
// 		forceUpdate: () => {
// 			update((store) => [...store]);
// 		},
// 		updateCursor(id: string, newCursor: Omit<CursorStore, 'id'>) {
// 			update((store) => {
// 				return [...store.filter((cursor) => cursor.id !== id), { id, ...newCursor }];
// 			});
// 		}
// 	};
// }

// export const cursorList = createCursorStateList();
