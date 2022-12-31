<script lang="ts">
	import type { AnimationId, TypingData } from '$lib/definitions/TypingTest.definition';
	import { getTypingInputType, TypingInputType } from '$lib/utils/typingTest.util';
	import Word from './Word.svelte';

	export let sourceText: string;

	let typed: string[] = [''];
	let animationId: AnimationId = {
		letter: '00',
		word: 0
	};
	let typingContainer: HTMLElement;

	function generateTypeData(sourceText: string, typed: string[]) {
		return sourceText.split(' ').map((expected, i) => {
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
	): AnimationId {
		const type = getTypingInputType(typedCharacter, currentWord);
		if (type === TypingInputType.BACKSPACE) {
			if (currentWord === '' && activeIndex > 0) {
				return {
					letter: `${activeIndex - 1}${typed[activeIndex - 1].length - 1}`,
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
		animationId = getNextActiveId(e.key, typed[activeIndexLocal], activeIndexLocal);

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
</script>

<div class="flex-col">
	<div bind:this={typingContainer} class="no-scrollbar max-h-60 overflow-y-scroll bg-slate-600">
		<span>
			{#each typeTestData as { expected, actual }, i (i)}
				<Word
					active={i === activeIndex}
					id={i}
					{expected}
					{actual}
					{animationId}
					{typingContainer}
				/>
			{/each}
		</span>
	</div>

	<input
		type="text"
		placeholder="Type here"
		class="input-primary input mt-4 w-full"
		on:keydown|preventDefault|trusted={handleKeyDown}
	/>
</div>
