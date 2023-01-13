<script lang="ts">
	import WpmChart from '$lib/components/charts/WPMChart.svelte';
	import Button from '$lib/components/common/Button/Button.svelte';
	import ResultsWrapper from '$lib/components/ResultsWrapper.svelte';
	import TypingWrapper from '$lib/components/TypingWrapper.svelte';
	import { wordGenerator } from '$lib/stores/TypingTest.store';

	export let data;
	wordGenerator.initialize(data.seed);
</script>

<div class="h-full w-full">
	<TypingWrapper />
	<ResultsWrapper />
</div>
