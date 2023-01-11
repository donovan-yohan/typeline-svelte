<script lang="ts">
	import Cursor from './Cursor.svelte';
	import {
		wordGenerator,
		animationId,
		typingContainer,
		defaultCursor,
		defaultTypingState,
		isRunning,
		startTime,
		isReplay,
		isFinished
	} from '$lib/stores/TypingTest.store';
	import { getNextActiveId, getTypingInputType, TypingInputType } from '$lib/utils/typingTest.util';
	import { MIN_WORDS_AHEAD } from '$lib/utils/wordGenerator/wordGenerator.config';
	import Word from './Word.svelte';
	import { BACKSPACE_CHAR } from '$lib/utils/keypress/keypress.util.definition';
	import {
		sampleKeypresses,
		sampleKeypresses2,
		sampleKeypresses3,
		sampleKeypresses4
	} from '../charts/data';
	import Button from '../common/Button/Button.svelte';
	import type { TypingStateStore } from '$lib/stores/TypingTest.store.definition';
	import RobotTyper from './RobotTyper.svelte';

	export let sourceText: string[];

	const controller = new AbortController();

	let typingStateList: TypingStateStore[] = [{ ...defaultTypingState }];

	function addKeypress(key: string) {
		typingStateList[activeTypingStateIndex].keypresses = [
			...typingStateList[activeTypingStateIndex].keypresses,
			{ key, timestamp: Date.now() - $startTime }
		];
	}

	function start() {
		isRunning.set(true);
		startTime.set(Date.now());
	}

	function handleKeyDown(e: KeyboardEvent) {
		typeCharacter(e.key, false, 0);
	}

	function typeCharacter(c: string, isRobot = false, i: number) {
		const localActiveIndex = typingStateList[i].typed.length - 1;
		const type = getTypingInputType(c, typingStateList[i].typed[localActiveIndex]);

		if (i === activeTypingStateIndex)
			animationId.set(
				getNextActiveId(c, typingStateList[i].typed[localActiveIndex], localActiveIndex)
			);

		if (type === TypingInputType.BACKSPACE) {
			if (typingStateList[i].typed[localActiveIndex].length > 0) {
				typingStateList[i].typed[localActiveIndex] = typingStateList[i].typed[
					localActiveIndex
				].slice(0, -1);
			} else if (localActiveIndex > 0) {
				typingStateList[i].typed = typingStateList[i].typed.slice(0, -1);
			}

			if (!isRobot) addKeypress(BACKSPACE_CHAR);
		} else if (type === TypingInputType.SPACE) {
			typingStateList[i].typed = [...typingStateList[i].typed, ''];

			if (!isRobot) addKeypress(' ');
		} else if (type === TypingInputType.SINGLE_CHARACTER) {
			if (!$isRunning) start();
			typingStateList[i].typed[localActiveIndex] += c;

			if (!isRobot) addKeypress(c);
		}

		// force refresh of components

		sourceText = sourceText;
	}

	function startReplay() {
		isReplay.set(true);

		start();
	}

	let testIndex = 0;
	const testKeypresses = [
		sampleKeypresses,
		sampleKeypresses2,
		sampleKeypresses3,
		sampleKeypresses4
	];

	function addSecondaryInput() {
		const id = 'test' + testIndex;
		typingStateList = [
			...typingStateList,
			{ id, typed: [''], keypresses: testKeypresses[testIndex], cursor: { ...defaultCursor } }
		];
		testIndex++;
	}

	function tickReplay(currentTime: number, nextTime?: number) {
		if (!nextTime) return 0;

		return nextTime - currentTime;
	}

	$: if (activeWordIndex > sourceText.length - MIN_WORDS_AHEAD) {
		wordGenerator.generate(activeWordIndex - (sourceText.length - MIN_WORDS_AHEAD));
	}

	// determines which cursor to follow with the main UI
	$: activeTypingStateIndex = 0;
	$: activeWordIndex = typingStateList[activeTypingStateIndex].typed.length - 1;

	$: keypresses = typingStateList
		.slice(1)
		.map((ts, i) => ts.keypresses.map((k) => ({ ...k, index: i + 1 })))
		.flat();

	$: cursors = typingStateList.map((ts) => ts.cursor);

	$: if ($isFinished) {
		controller.abort();
	}
</script>

<Button on:click={startReplay}>Play Replay</Button>
<Button on:click={addSecondaryInput}>add secondary input</Button>
<div class="relative max-h-72 flex-col overflow-hidden">
	<div
		bind:this={$typingContainer}
		class="no-scrollbar relative -z-10 select-none scroll-smooth bg-transparent transition-all duration-500 ease-out"
	>
		{#each cursors as cursor}
			<Cursor {cursor} />
		{/each}

		<RobotTyper
			{keypresses}
			on:type={(e) => {
				typeCharacter(e.detail.key, true, e.detail.index);
			}}
		/>

		{#each sourceText as expected, i (i)}
			<Word
				active={i === activeWordIndex}
				passed={i < activeWordIndex}
				id={i}
				{expected}
				actual={typingStateList[activeTypingStateIndex].typed[i] || ''}
				animationId={$animationId}
				allActive={typingStateList.map((ts) => ({
					word: ts.typed.length - 1,
					letter: ts.typed[ts.typed.length - 1].length
				}))}
				on:active={(e) => {
					typingStateList[e.detail.index].cursor = e.detail.cursor;
				}}
			/>
		{/each}
	</div>

	<input
		type="text"
		disabled={$isFinished || $isReplay}
		class="absolute left-0 top-0 z-10 h-full w-full opacity-0 disabled:border-none disabled:bg-transparent"
		on:keydown|preventDefault|trusted={handleKeyDown}
	/>
</div>
