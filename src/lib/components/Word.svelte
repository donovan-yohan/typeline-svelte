<script lang="ts">
	import type { AnimationId } from '$lib/definitions/TypingTest.definition';
	import { send, receive } from '$lib/styles/cursorTransition';
	import Letter from './Letter.svelte';

	export let id: number;
	export let expected: string;
	export let actual: string;
	export let active: boolean;
	export let animationId: AnimationId;
</script>

<span class="relative z-20 inline-flex p-2 text-2xl text-slate-400">
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
			class="absolute left-0 top-0 -z-10 h-full w-full rounded-2xl bg-blue-600 opacity-50"
		/>
	{/if}
</span>
