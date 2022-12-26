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

	$: showCursorOnRight = (active && isLast && actual) || !letter;
</script>

<span
	class={cx({
		'relative inline-block': true,
		'text-white': actual && letter === actual,
		'text-red-700': actual && letter !== actual,
		'line-through': letter && actual && letter !== actual
	})}
>
	{letter || actual}
	{#if active}
		<span
			in:receive={{ key: wordId + '' + letterId }}
			out:send={{ key: animationId.letter }}
			class={cx({
				'absolute inline-block transition-all duration-200': true,
				'left-full': showCursorOnRight,
				' -left-1': !showCursorOnRight
			})}>|</span
		>
	{/if}
</span>
