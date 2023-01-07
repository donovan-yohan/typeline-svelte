<script lang="ts">
	import WpmChart from '$lib/components/charts/WPMChart.svelte';
	import Button from '$lib/components/common/Button/Button.svelte';
	import TypingWrapper from '$lib/components/TypingWrapper.svelte';
	import { wordGenerator } from '$lib/stores/TypingTest.store';

	export let data;
	wordGenerator.initialize(data.seed);
</script>

<div class="my-auto h-full w-auto">
	<TypingWrapper />
	<div class="flex h-screen items-center">
		<div class="w-full">
			<div class="h-[33vh]">
				<WpmChart />
			</div>
			<Button class="mt-16">hello world</Button>
		</div>
	</div>
</div>
