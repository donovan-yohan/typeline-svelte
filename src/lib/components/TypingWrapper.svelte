<script lang="ts">
	import { wordGenerator } from './../stores/TypingTest.store';
	import { MIN_WORDS_AHEAD } from './../utils/wordGenerator/wordGenerator.config';
	import Button from './common/Button/Button.svelte';
	import Timer from './Timer.svelte';
	import TypingTest from './TypingTest/TypingTest.svelte';

	wordGenerator.generate(MIN_WORDS_AHEAD);
</script>

<div class="mt-[36vh] flex flex-col justify-center">
	<TypingTest sourceText={$wordGenerator.words} />
	<Timer class="mt-4" />
	<span><Button class="mt-4">Customize</Button><kbd class="mx-2 align-text-top">_</kbd></span>
</div>
