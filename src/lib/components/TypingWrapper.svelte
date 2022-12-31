<script lang="ts">
	import { wordGenerator } from './../stores/TypingTest.store';
	import { MIN_WORDS_AHEAD } from './../utils/wordGenerator/wordGenerator.config';
	import TypingTest from './TypingTest.svelte';

	wordGenerator.generate(MIN_WORDS_AHEAD);
</script>

<div>
	<TypingTest sourceText={$wordGenerator.words} />
	<input type="range" class="range range-xs mt-4" />
</div>
