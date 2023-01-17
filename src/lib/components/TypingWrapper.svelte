<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { wordGenerator } from './../stores/TypingTest.store';
	import { MIN_WORDS_AHEAD } from './../utils/wordGenerator/wordGenerator.config';
	import Button from './common/Button/Button.svelte';
	import Timer from './Timer.svelte';
	import TypingTest from './TypingTest/TypingTest.svelte';

	wordGenerator.generate(MIN_WORDS_AHEAD);

	function openCustomize() {
		drawerStore.open({ id: 'customize' });
	}
</script>

<div class="w- mt-[36vh] flex flex-col justify-center">
	<TypingTest sourceText={$wordGenerator.words} />
	<Timer class="mt-4" />
	<span
		><Button on:click={() => openCustomize()} class="mt-4">Customize</Button><kbd
			class="mx-2 align-text-top">_</kbd
		></span
	>
</div>
