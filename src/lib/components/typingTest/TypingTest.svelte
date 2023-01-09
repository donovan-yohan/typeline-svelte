<script lang="ts">
	import Cursor from './Cursor.svelte';
	import {
		wordGenerator,
		keypressesList,
		typingStateList,
		animationId,
		typingContainer,
		gameState
	} from '$lib/stores/TypingTest.store';
	import { getNextActiveId, getTypingInputType, TypingInputType } from '$lib/utils/typingTest.util';
	import { MIN_WORDS_AHEAD } from '$lib/utils/wordGenerator/wordGenerator.config';
	import Word from './Word.svelte';
	import { BACKSPACE_CHAR } from '$lib/utils/keypress/keypress.util.definition';
	import { sampleKeypresses } from '../charts/data';
	import Button from '../common/Button/Button.svelte';
	import type { TypingStateStore } from '$lib/stores/TypingTest.store.definition';

	export let sourceText: string[];

	function addKeypress(key: string) {
		activeKeypresses.keypresses = [
			...activeKeypresses.keypresses,
			{ key, timestamp: Date.now() - $gameState.startTime }
		];
	}

	function start() {
		gameState.update((s) => ({ ...s, isRunning: true }));
		gameState.update((s) => ({ ...s, startTime: Date.now() }));
		activeKeypresses.keypresses = [];
		activeTypingState.typed = [''];
	}

	function handleKeyDown(e: KeyboardEvent) {
		typeCharacter(e.key);
	}

	function typeCharacter(
		c: string,
		isRobot = false,
		typingState: TypingStateStore = activeTypingState
	) {
		const localActiveIndex = typingState.typed.length - 1;
		const type = getTypingInputType(c, typingState.typed[localActiveIndex]);

		animationId.set(getNextActiveId(c, typingState.typed[localActiveIndex], localActiveIndex));

		if (type === TypingInputType.BACKSPACE) {
			if (typingState.typed[localActiveIndex].length > 0) {
				typingState.typed[localActiveIndex] = typingState.typed[localActiveIndex].slice(0, -1);
			} else if (localActiveIndex > 0) {
				typingState.typed = typingState.typed.slice(0, -1);
			}

			if (!isRobot) addKeypress(BACKSPACE_CHAR);
		} else if (type === TypingInputType.SPACE) {
			typingState.typed = [...typingState.typed, ''];

			if (!isRobot) addKeypress(' ');
		} else if (type === TypingInputType.SINGLE_CHARACTER) {
			if (!$gameState.isRunning) start();
			typingState.typed[localActiveIndex] += c;

			if (!isRobot) addKeypress(c);
		}

		// force refresh of components
		typingStateList.forceUpdate();
		sourceText = sourceText;
	}

	function startReplay() {
		gameState.update((s) => ({ ...s, isReplay: true }));

		start();
	}

	function tickReplay(currentTime: number, nextTime?: number) {
		if (!nextTime) return 0;

		return nextTime - currentTime;
	}

	$: activeTypingState = $typingStateList[0];

	$: if (activeTypingState.typed.length > sourceText.length - MIN_WORDS_AHEAD) {
		wordGenerator.generate(activeTypingState.typed.length - (sourceText.length - MIN_WORDS_AHEAD));
	}

	let activeInterval: NodeJS.Timer | undefined;
	$: offset = 0;
	$: replayIndex = 0;

	$: {
		if ($gameState.isReplay && $gameState.isRunning && !$gameState.isFinished) {
			clearInterval(activeInterval);

			activeInterval = setInterval(() => {
				typeCharacter(sampleKeypresses[replayIndex].key);
				replayIndex++;
				offset = tickReplay(
					sampleKeypresses[replayIndex - 1].timestamp,
					sampleKeypresses[replayIndex].timestamp
				);
			}, offset);
		} else {
			clearInterval(activeInterval);
		}
	}

	$: activeKeypresses = $keypressesList[0];

	// TODO: remove this
	$: if ($gameState.isFinished) console.log(activeKeypresses.keypresses);
</script>

<Button on:click={startReplay}>Play Replay</Button>
<div class="relative max-h-72 flex-col overflow-hidden">
	<div
		bind:this={$typingContainer}
		class="no-scrollbar relative -z-10 select-none scroll-smooth bg-transparent transition-all duration-500 ease-out"
	>
		{#each $typingStateList as state}
			<Cursor cursor={state.cursor} />
		{/each}

		{#each sourceText as expected, i (i)}
			<Word
				active={i === activeTypingState.typed.length - 1}
				passed={i < activeTypingState.typed.length - 1}
				id={i}
				{expected}
				actual={activeTypingState.typed[i] || ''}
				animationId={$animationId}
			/>
		{/each}
	</div>

	<input
		type="text"
		disabled={$gameState.isFinished || $gameState.isReplay}
		class="absolute left-0 top-0 z-10 h-full w-full opacity-0 disabled:border-none disabled:bg-transparent"
		on:keydown|preventDefault|trusted={handleKeyDown}
	/>
</div>
