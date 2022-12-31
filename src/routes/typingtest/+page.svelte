<script>
	import TypingWrapper from '$lib/components/TypingWrapper.svelte';
	import { wordGenerator } from '$lib/stores/TypingTest.store';

	wordGenerator.initialize('test');
</script>

<div class="my-auto flex h-full w-auto">
	<TypingWrapper />
</div>
