<script lang="ts">
	import { cursorRef } from '$lib/stores/TypingTest.store';
	import cx from 'classnames';

	export let letter: string;
	export let actual: string;
	export let active: boolean;
	export let wordIncorrect: boolean;
	export let wordPerfect: boolean;
	export let passed: boolean;

	let actualMemo = actual;
	let letterRef: HTMLElement;

	$: if (actual) actualMemo = actual;
	$: if (active && $cursorRef && letterRef) {
		const wordRef = letterRef.offsetParent as HTMLElement | null;
		const offsetX = `calc(${letterRef.offsetLeft}px + ${wordRef?.offsetLeft}px)`;
		const offsetY = `${wordRef?.offsetTop}px`;

		$cursorRef.style.transform = `translate(${offsetX}, ${offsetY})`;

		$cursorRef.classList.remove('animate-blink');
		$cursorRef.classList.remove('bg-error');
		void $cursorRef.offsetWidth;
		$cursorRef.classList.add('animate-blink');
		if (wordIncorrect) $cursorRef.classList.add('bg-error');
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
		{letter || actual}
	</span>
</span>

<style>
	.letter:after {
		content: var(--letter);
	}
</style>
