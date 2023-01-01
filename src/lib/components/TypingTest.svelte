<script lang="ts">
	import type { TypingData } from '$lib/definitions/TypingTest.definition';
	import { animationId, wordGenerator } from '$lib/stores/TypingTest.store';
	import type { AnimationIdStore } from '$lib/stores/TypingTest.store.definition';
	import { getTypingInputType, TypingInputType } from '$lib/utils/typingTest.util';
	import { MIN_WORDS_AHEAD } from '$lib/utils/wordGenerator/wordGenerator.config';
	import Word from './Word.svelte';

	export let sourceText: string[];

	let typed: string[] = [''];
	let typingContainer: HTMLElement;

	function generateTypeData(sourceText: string[], typed: string[]) {
		return sourceText.map((expected, i) => {
			return {
				expected,
				actual: typed[i] || ''
			} as TypingData;
		});
	}

	function getNextActiveId(
		typedCharacter: string,
		currentWord: string,
		activeIndex: number
	): AnimationIdStore {
		const type = getTypingInputType(typedCharacter, currentWord);
		if (type === TypingInputType.BACKSPACE) {
			if (currentWord === '' && activeIndex > 0) {
				return {
					letter: `${activeIndex - 1}${typed[activeIndex - 1].length}`,
					word: activeIndex - 1
				};
			} else if (currentWord !== '') {
				return {
					letter: `${activeIndex}${currentWord.length - 1}`,
					word: activeIndex
				};
			}
		} else if (type === TypingInputType.SPACE) {
			return {
				letter: `${activeIndex + 1}0`,
				word: activeIndex + 1
			};
		} else if (type === TypingInputType.SINGLE_CHARACTER) {
			return {
				letter: `${activeIndex}${currentWord.length + 1}`,
				word: activeIndex
			};
		}

		return {
			letter: `${activeIndex}${currentWord.length}`,
			word: activeIndex
		};
	}

	function handleKeyDown(e: KeyboardEvent) {
		const activeIndexLocal = typed.length - 1;
		animationId.set(getNextActiveId(e.key, typed[activeIndexLocal], activeIndexLocal));

		// update input value
		const type = getTypingInputType(e.key, typed[activeIndexLocal]);
		if (type === TypingInputType.BACKSPACE) {
			if (typed[activeIndexLocal].length > 0) {
				typed[activeIndexLocal] = typed[activeIndexLocal].slice(0, -1);
			} else if (activeIndexLocal > 0) {
				typed = typed.slice(0, -1);
			}
		} else if (type === TypingInputType.SPACE) {
			typed = [...typed, ''];
		} else if (type === TypingInputType.SINGLE_CHARACTER) {
			typed[activeIndexLocal] += e.key;
		}
	}

	$: typeTestData = generateTypeData(sourceText, typed);
	$: activeIndex = typed.length - 1;
	$: if (activeIndex > sourceText.length - MIN_WORDS_AHEAD) {
		wordGenerator.generate();
	}
</script>

<div class="relative flex-col">
	<div
		bind:this={typingContainer}
		class="no-scrollbar relative -z-10 max-h-72 select-none overflow-hidden bg-transparent"
	>
		{#each typeTestData as { expected, actual }, i (i)}
			<Word
				active={i === activeIndex}
				passed={i < activeIndex}
				id={i}
				{expected}
				{actual}
				{typingContainer}
			/>
		{/each}
	</div>

	<input
		type="text"
		placeholder="Type here"
		class="absolute left-0 top-0 z-10 h-full w-full opacity-0"
		on:keydown|preventDefault|trusted={handleKeyDown}
	/>
</div>
