<script lang="ts">
	import { wordGenerator } from './../stores/TypingTest.store';
	import { MIN_WORDS_AHEAD } from './../utils/wordGenerator/wordGenerator.config';
	import Timer from './Timer.svelte';
	import TypingTest from './typingTest/TypingTest.svelte';

	wordGenerator.generate(MIN_WORDS_AHEAD);
</script>

<div class="flex h-screen flex-col justify-center">
	<TypingTest sourceText={$wordGenerator.words} />
	<Timer class="mt-4" />
</div>
