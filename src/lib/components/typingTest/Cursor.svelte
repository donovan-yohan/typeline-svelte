<script lang="ts">
	import cx from 'classnames';
	import type { CursorStore } from '$lib/stores/TypingTest.store.definition';

	export let cursor: CursorStore;
	let cursorRef: HTMLElement;

	$: if (cursor && cursorRef) {
		cursorRef.classList.remove('animate-blink');
		void cursorRef.offsetWidth;
		cursorRef.classList.add('animate-blink');
	}
</script>

<span
	bind:this={cursorRef}
	class={cx({
		'ease absolute top-0 left-0 z-20 inline-block h-16 w-[3px] animate-blink transition-all duration-150': true,
		'bg-error-500': cursor.incorrect,
		'bg-primary-500': !cursor.incorrect
	})}
	style={`transform: translate(${cursor.x}px, ${cursor.y}px)`}
/>
