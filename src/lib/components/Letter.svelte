<script lang="ts">
	import { animationId } from '$lib/stores/TypingTest.store';
	import cx from 'classnames';
	import { send, receive } from '$lib/styles/cursorTransition';

	export let letterId: number;
	export let wordId: number;
	export let letter: string;
	export let actual: string;
	export let active: boolean;
	export let wordIncorrect: boolean;
	export let wordPerfect: boolean;
	export let passed: boolean;

	let actualMemo = actual;

	$: if (actual) actualMemo = actual;
</script>

<span
	class={cx({
		'max-w spacing relative inline-block h-full pt-3 tracking-wider': true
	})}
>
	<span
		style="--letter: '{actualMemo}'"
		class={cx({
			'letter inline-block h-full max-w-0 overflow-hidden transition-all duration-200 ease-in-out': true,
			'max-w-[3rem]': actual || letter,
			'after:absolute after:left-0 after:top-1/2 after:w-full after:text-center after:text-base after:text-base-content after:opacity-0 after:transition-all after:ease-in ': true,
			'text-base-content opacity-60': !actual && !passed,
			'text-base-content': actual && letter === actual && !wordPerfect,
			'animate-springWiggle text-error': actual && letter !== actual,
			'after:top-3/4 after:opacity-60': actual && letter && letter !== actual,
			'animate-springWiggle text-error opacity-60': !actual && passed,
			'line-through': !letter && actual && letter !== actual,
			'animate-wordBounce text-primary': wordPerfect
		})}
	>
		{letter || actualMemo}
	</span>
	{#if active}
		<span
			in:receive={{ key: wordId + '' + letterId }}
			out:send={{ key: $animationId.letter }}
			class={cx({
				'absolute top-0 -left-0.5 inline-block h-full w-0.5 animate-blink bg-primary': true,
				'transition-all duration-100': !!letter,
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
