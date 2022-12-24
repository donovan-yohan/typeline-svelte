<script lang="ts">
	import { send, receive } from '$lib/styles/highlightTransition';
	import Letter from './Letter.svelte';

	export let sourceText: String;
	let typed: String = '';
	let isForward = true;

	function generateTypeData(sourceText: String, typed: String) {
		return sourceText.split(' ').map((expected, i) => {
			return {
				id: expected + i,
				expected,
				typed: typed.split(' ')[i] || ''
			};
		});
	}

	function generateActiveIndex(typed: String) {
		return typed.split(' ').length;
	}

	function getCursorDirection(e: KeyboardEvent) {
		if (e.key === 'Backspace') {
			isForward = false;
		} else {
			isForward = true;
		}
	}

	$: typeTestData = generateTypeData(sourceText, typed);
	$: activeIndex = generateActiveIndex(typed);
</script>

<div class="flex-col">
	<div class="rounded-box  bg-slate-400 p-8">
		<span>
			{#each typeTestData as { expected, typed, id }, i (id)}
				<span class="relative z-20 inline-block p-2 text-2xl text-slate-300">
					{#if typed.length > expected.length}
						{#each typed.split('') as letter, j (id + letter + j + 'typed')}
							<Letter letter={expected.split('')[j] || ''} typed={letter} />
						{/each}
					{:else}
						{#each expected.split('') as letter, j (id + letter + j)}
							<Letter {letter} typed={typed.split('')[j] || ''} />
						{/each}
					{/if}
					{#if activeIndex === i + 1}
						<span
							in:receive={{ key: id }}
							out:send={{ key: isForward ? typeTestData[i + 1]?.id : typeTestData[i - 1]?.id }}
							class="absolute left-0 top-0 -z-10 h-full w-full rounded-2xl bg-blue-400"
						/>
					{/if}
				</span>
			{/each}
		</span>
	</div>

	<input
		type="text"
		placeholder="Type here"
		class="input-primary input mt-4 w-full "
		bind:value={typed}
		on:keydown={getCursorDirection}
	/>
</div>
