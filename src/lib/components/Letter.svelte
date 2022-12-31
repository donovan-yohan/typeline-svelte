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

	$: showCursorOnRight = (active && isLast && actual) || !letter;
</script>

<span class={'relative inline-block h-full py-1'}>
	<span
		class={cx({
			'inline-block transition-all duration-300': true,
			'text-base-content opacity-60': !actual && !passed,
			'text-base-content': actual && letter === actual && !wordPerfect,
			'text-error': actual && letter !== actual,
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
