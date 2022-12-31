<script lang="ts">
	import cx from 'classnames';
	import { send, receive } from '$lib/styles/cursorTransition';
	import type { AnimationId } from '$lib/definitions/TypingTest.definition';

	export let letterId: number;
	export let wordId: number;
	export let isLast: boolean;
	export let letter: string;
	export let actual: string;
	export let active: boolean;
	export let animationId: AnimationId;
	export let wordIncorrect: boolean;
	export let wordPerfect: boolean;
	export let passed: boolean;

	let actualMemo = actual;

	$: showCursorOnRight = (active && isLast && actual) || !letter;
	$: if (actual) actualMemo = actual;
	$: if (active && actual) console.log(letterId, animationId);
</script>

<span class={'relative inline-block h-full py-1'}>
	<span
		style="--letter: '{actualMemo}'"
		class={cx({
			'letter inline-block transition-all duration-300': true,
			'after:absolute after:left-0 after:top-1/2 after:w-full after:text-center after:text-base after:text-base-content after:opacity-0 after:transition-all after:ease-in ': true,
			'text-base-content opacity-60': !actual && !passed,
			'text-base-content': actual && letter === actual && !wordPerfect,
			'text-error': actual && letter !== actual,
			'after:top-3/4 after:opacity-60': actual && letter && letter !== actual,
			'text-error opacity-60': !actual && passed,
			'line-through': !letter && actual && letter !== actual,
			'animate-wordBounce text-primary': wordPerfect
		})}
	>
		{letter || actual}
	</span>
	{#if active}
		<span
			in:receive={{ key: wordId + '' + letterId }}
			out:send={{ key: animationId.letter }}
			class={cx({
				'absolute top-0 inline-block h-full w-0.5 animate-blink bg-primary transition-all duration-100': true,
				'left-full': showCursorOnRight,
				' -left-0.5': !showCursorOnRight,
				'bg-error': wordIncorrect
			})}
		/>
	{/if}
</span>

<style>
	.letter:after {
		content: var(--letter);
	}
</style>
