<script>
	import cx from 'classnames';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let checked = false;

	$: console.log(checked);
</script>

<label for="toggle" class="text-base">
	<input id="toggle" type="checkbox" class="hidden" bind:checked />
	<div
		class={cx({
			'relative h-[2em] w-[4em] appearance-none rounded-full border border-primary-500 bg-primary-500 text-transparent outline-none transition-all duration-200 ease-in-out': true,
			'shadow-[inset_-2rem_0_0_2px_rgb(var(--color-surface-800)),inset_0_0_0_2px_rgb(var(--color-surface-800)),0_0]': true,
			'shadow-[inset_2rem_0_0_2px_rgb(var(--color-surface-800)),inset_0_0_0_2px_rgb(var(--color-surface-800)),0_0]':
				checked
		})}
	/>
</label>
