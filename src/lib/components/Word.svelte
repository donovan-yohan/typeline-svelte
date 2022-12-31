<script lang="ts">
	import { isScrolling } from '$lib/stores/TypingTest.store';
	import { scrollTo } from '$lib/utils/ScrollTo/ScrollTo';
	import cx from 'classnames';
	import type { AnimationId } from '$lib/definitions/TypingTest.definition';
	import { send, receive } from '$lib/styles/cursorTransition';
	import Letter from './Letter.svelte';
	import { quartOut } from 'svelte/easing';

	export let id: number;
	export let expected: string;
	export let actual: string;
	export let active: boolean;
	export let animationId: AnimationId;
	export let typingContainer: HTMLElement;

	let ref: HTMLElement;

	$: if (ref && typingContainer && active && !$isScrolling) {
		scrollTo({
			element: ref,
			container: typingContainer,
			easing: quartOut,
			offset: -ref.clientHeight * 2,
			delay: 0,
			duration: 700,
			onStart: () => isScrolling.set(true),
			onDone: () => isScrolling.set(false)
		});
	}
</script>

<span bind:this={ref} class="relative z-20 my-4 mx-2 inline-flex text-4xl text-slate-400">
	{#each expected.split('') as letter, j (id + '' + j)}
		<Letter
			wordId={id}
			letterId={j}
			{letter}
			actual={actual.split('')[j] || ''}
			active={active &&
				(actual.length === j || (actual.length == expected.length && actual.length === j + 1))}
			isLast={j === expected.length - 1}
			{animationId}
		/>
	{/each}
	{#if actual.length > expected.length}
		{#each actual.split('').slice(expected.length) as letter, j (id + '' + (j + expected.length))}
			<Letter
				wordId={id}
				letterId={j + expected.length}
				letter={expected.split('')[j + expected.length] || ''}
				actual={letter}
				active={active &&
					(actual.length === j + expected.length ||
						(actual.length == expected.length && actual.length === j + expected.length + 1))}
				isLast={j + expected.length === actual.length - 1}
				{animationId}
			/>
		{/each}
	{/if}
	{#if active}
		<span
			in:receive={{ key: id }}
			out:send={{ key: animationId.word }}
			class={cx({
				'absolute left-0 top-0 -z-10 h-full w-full rounded-md bg-blue-500 opacity-25 transition-colors duration-300': true,
				'bg-red-600': actual !== expected.slice(0, actual.length)
			})}
		/>
	{/if}
</span>
