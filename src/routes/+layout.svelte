<script>
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { typelineTheme } from '$lib/stores/TypelineTheme.store';

	onMount(() => typelineTheme.initialize());
</script>

<div class="mx-16 flex min-h-screen flex-col">
	<header class="fixed left-0 z-50 w-full px-16 py-4">
		<div class="mx-auto max-w-5xl">
			<span class="text-3xl font-bold">typeline</span>
		</div>
	</header>

	<main class="mx-auto flex w-full max-w-5xl flex-1">
		<slot />
	</main>

	<footer class="fixed bottom-0 left-0 z-50 w-full px-16 py-4">
		<div class="mx-auto max-w-5xl">
			<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
		</div>
	</footer>
</div>
