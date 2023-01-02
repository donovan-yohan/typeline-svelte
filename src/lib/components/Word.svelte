<script lang="ts">
	import { isScrolling, animationId } from '$lib/stores/TypingTest.store';
	import cx from 'classnames';
	import { send, receive } from '$lib/styles/highlightTransition';
	import Letter from './Letter.svelte';

	export let id: number;
	export let expected: string;
	export let actual: string;
	export let active: boolean;
	export let typingContainer: HTMLElement;
	export let passed: boolean;

	let ref: HTMLElement;
	let numOfCharsTyped = 0;

	$: if (ref && typingContainer && active && !$isScrolling) {
		const offset = ref.offsetTop > ref.offsetHeight ? `calc(-${ref.offsetTop}px + 7rem)` : 0;
		typingContainer.style.transform = `translateY(${offset})`;
	}

	$: if (actual) {
		numOfCharsTyped++;
	}
</script>

<span
	bind:this={ref}
	class={cx({
		'relative z-20 mx-2 my-4 inline-flex h-16 text-4xl ': true,
		'animate-springWiggle': passed && actual !== expected
	})}
>
	{#each expected.split('') as letter, j (id + '' + j)}
		<Letter
			{letter}
			actual={actual.split('')[j] || ''}
			active={active && actual.length === j}
			wordIncorrect={actual !== expected.slice(0, actual.length)}
			wordPerfect={actual === expected && numOfCharsTyped === expected.length && passed}
			{passed}
		/>
	{/each}
	{#each [...actual
			.split('')
			.slice(expected.length), ''] as letter, j (id + '' + (j + expected.length))}
		<Letter
			letter={''}
			actual={letter}
			active={active && actual.length === j + expected.length}
			wordIncorrect={actual !== expected}
			wordPerfect={false}
			{passed}
		/>
	{/each}
	{#if active}
		<span
			in:receive={{ key: id }}
			out:send={{ key: $animationId }}
			class={cx({
				'absolute left-0 top-0 -z-10 h-full w-full rounded-md bg-primary opacity-25 transition-colors duration-300 ease-out': true,
				'bg-error': actual !== expected.slice(0, actual.length)
			})}
		/>
	{/if}
</span>
