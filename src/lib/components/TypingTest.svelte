<script lang="ts">
	import { isFinished, isRunning, startTime } from '$lib/stores/GameState.store';
	import cx from 'classnames';
	import type { TypingData } from '$lib/definitions/TypingTest.definition';
	import { animationId, wordGenerator, cursorRef, keypresses } from '$lib/stores/TypingTest.store';
	import { getTypingInputType, TypingInputType } from '$lib/utils/typingTest.util';
	import { MIN_WORDS_AHEAD } from '$lib/utils/wordGenerator/wordGenerator.config';
	import Word from './Word.svelte';
	import { BACKSPACE_CHAR } from '$lib/utils/keypress/keypress.util.definition';

	export let sourceText: string[];

	let typed: string[] = [''];
	let typingContainer: HTMLElement;

	function generateTypeData(typed: string[]) {
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
	): number {
		const type = getTypingInputType(typedCharacter, currentWord);
		if (type === TypingInputType.BACKSPACE) {
			if (currentWord === '' && activeIndex > 0) {
				return activeIndex - 1;
			} else if (currentWord !== '') {
				return activeIndex;
			}
		} else if (type === TypingInputType.SPACE) {
			return activeIndex + 1;
		} else if (type === TypingInputType.SINGLE_CHARACTER) {
			return activeIndex;
		}
		return activeIndex;
	}

	function addKeypress(key: string) {
		keypresses.update((keys) => {
			return [...keys, { key, timestamp: Date.now() - $startTime }];
		});
	}

	function start() {
		isRunning.set(true);
		startTime.set(Date.now());
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
			addKeypress(BACKSPACE_CHAR);
		} else if (type === TypingInputType.SPACE) {
			typed = [...typed, ''];
			addKeypress(' ');
		} else if (type === TypingInputType.SINGLE_CHARACTER) {
			if (!$isRunning) start();
			typed[activeIndexLocal] += e.key;
			addKeypress(e.key);
		}
	}

	$: typeTestData = generateTypeData(typed);
	$: activeIndex = typed.length - 1;
	$: if (activeIndex > sourceText.length - MIN_WORDS_AHEAD) {
		wordGenerator.generate();
	}
</script>

<div class="relative max-h-72 flex-col overflow-hidden">
	<div
		bind:this={typingContainer}
		class="no-scrollbar relative -z-10 select-none scroll-smooth bg-transparent transition-all duration-500 ease-out"
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
		<span
			bind:this={$cursorRef}
			class={cx({
				'ease absolute top-0 left-0 inline-block h-16 w-[3px] bg-primary transition-all duration-200': true
			})}
		/>
	</div>

	<input
		type="text"
		disabled={$isFinished}
		class="absolute left-0 top-0 z-10 h-full w-full opacity-0"
		on:keydown|preventDefault|trusted={handleKeyDown}
	/>
</div>
