<script lang="ts">
	import TypingWrapper from '$lib/components/TypingWrapper.svelte';
	import { wordGenerator } from '$lib/stores/TypingTest.store';

	export let data;
	wordGenerator.initialize(data.seed);
</script>

<div class="my-auto flex h-full w-auto">
	<TypingWrapper />
</div>
