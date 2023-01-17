<script lang="ts">
	import { getOffset } from '$lib/utils/offset.util';
	import { typingContainer } from '$lib/stores/TypingTest.store';
	import cx from 'classnames';
	import { createEventDispatcher } from 'svelte';
	import type { ActiveIdType } from '$lib/stores/TypingTest.store.definition';

	export let letter: string;
	export let actual: string;
	export let wordIncorrect: boolean;
	export let wordPerfect: boolean;
	export let passed: boolean;
	export let wordId: number;
	export let letterId: number;
	export let allActive: ActiveIdType[];

	const dispatch = createEventDispatcher();

	let actualMemo = actual;
	let allActiveMemo: ActiveIdType[] = [];
	let letterRef: HTMLElement;

	$: if (actual) actualMemo = actual;

	$: if (
		letterRef &&
		$typingContainer &&
		JSON.stringify(allActive) != JSON.stringify(allActiveMemo)
	) {
		allActiveMemo = allActive;
		allActiveMemo.forEach((id, i) => {
			if (id.word === wordId && id.letter === letterId) {
				const offset = getOffset(letterRef, $typingContainer as HTMLElement);
				dispatch('active', {
					index: i,
					cursor: {
						x: offset.left,
						y: offset.top,
						incorrect: wordIncorrect
					}
				});
			}
		});
	}
</script>

<span
	bind:this={letterRef}
	class={cx({
		'max-w spacing relative inline-block h-full pt-3 tracking-wider': true
	})}
>
	<span
		style="--letter: '{actualMemo}'"
		class={cx({
			'letter inline-block h-full overflow-hidden transition-all duration-200 ease-in-out': true,
			'after:text-token after:absolute after:left-0 after:top-1/2 after:w-full after:text-center after:text-base after:opacity-0 after:transition-all after:ease-in': true,
			'opacity-60': !actual && !passed,
			'': actual && letter === actual && !wordPerfect,
			'animate-springWiggle text-error-500': actual && letter !== actual,
			'after:top-3/4 after:opacity-60': actual && letter && letter !== actual,
			'animate-springWiggle text-error-500 opacity-60': !actual && passed,
			'line-through': !letter && actual && letter !== actual,
			'animate-wordBounce text-primary-500': wordPerfect
		})}
	>
		{letter || actual}
	</span>
</span>

<style>
	.letter:after {
		content: var(--letter);
	}
</style>
