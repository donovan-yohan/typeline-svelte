<script>
	import Header from '$lib/components/Header.svelte';
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { typelineTheme } from '$lib/stores/TypelineTheme.store';

	onMount(() => typelineTheme.initialize());
</script>

<div class="flex min-h-screen flex-col ">
	<Header />

	<main class="mx-auto flex w-full max-w-5xl flex-1">
		<slot />
	</main>

	<footer class="fixed bottom-0 w-full py-4">
		<div class="flex justify-center">
			<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
		</div>
	</footer>
</div>
