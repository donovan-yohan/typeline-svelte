<script lang="ts">
	import { typingContainer } from '$lib/stores/TypingTest.store';
	import cx from 'classnames';
	import { send, receive } from '$lib/styles/highlightTransition';
	import Letter from './Letter.svelte';
	import type { ActiveIdType } from '$lib/stores/TypingTest.store.definition';

	export let id: number;
	export let expected: string;
	export let actual: string;
	export let active: boolean;
	export let passed: boolean;
	export let animationId: number;
	export let allActive: ActiveIdType[];

	let ref: HTMLElement;
	let numOfCharsTyped = 0;

	$: if (ref && $typingContainer && active) {
		const offset = ref.offsetTop > ref.offsetHeight ? `calc(-${ref.offsetTop}px + 7rem)` : 0;
		$typingContainer.style.transform = `translateY(${offset})`;
	}

	// TODO: move this into the main input component
	$: if (actual) {
		numOfCharsTyped++;
	}

	$: wordCorrect = actual === expected.slice(0, actual.length);
</script>

<span
	bind:this={ref}
	class={cx({
		'relative z-10 mx-2 my-4 inline-flex h-16 text-4xl ': true,
		'animate-springWiggle': passed && actual !== expected
	})}
>
	{#each expected.split('') as letter, j (id + '' + j)}
		<Letter
			{letter}
			actual={actual.split('')[j] || ''}
			wordIncorrect={actual !== expected.slice(0, actual.length)}
			wordPerfect={actual === expected && numOfCharsTyped === expected.length && passed}
			{passed}
			wordId={id}
			letterId={j}
			{allActive}
			on:active
		/>
	{/each}
	{#each [...actual
			.split('')
			.slice(expected.length), ''] as letter, j (id + '' + (j + expected.length))}
		<Letter
			letter={''}
			actual={letter}
			wordIncorrect={actual !== expected}
			wordPerfect={false}
			{passed}
			wordId={id}
			letterId={j + expected.length}
			{allActive}
			on:active
		/>
	{/each}
	{#if active}
		<span
			in:receive={{ key: id }}
			out:send={{ key: animationId }}
			class={cx({
				'absolute left-0 top-0 -z-10 h-full w-full rounded-md transition-colors duration-300 ease-out': true,
				'bg-primary-900': wordCorrect,
				'bg-error-900': !wordCorrect
			})}
		/>
	{/if}
</span>
