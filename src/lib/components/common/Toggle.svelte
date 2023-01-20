<script lang="ts">
	import cx from 'classnames';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let checked = false;
	export let id: string | null = null;
</script>

<input
	{id}
	type="checkbox"
	class={cx({
		'appearnce-none': true,
		'outline-none outline-4 focus-visible:outline-primary-500': true,
		'relative h-[2em] w-[3.5em] appearance-none rounded-md border-2 text-base text-transparent outline-none transition-all duration-200 ease-in-out': true,
		'border-primary-500 bg-primary-500 opacity-100': checked,
		'bg-default/30 border-[rgb(calc(var(--theme-font-color-dark)/30))]': !checked,
		'shadow-[inset_-1.5rem_0_0_0.25em_rgb(var(--color-surface-900)),inset_0_0_0_0.25em_rgb(var(--color-surface-900)),0_0]': true,
		'shadow-[inset_1.5rem_0_0_0.25em_rgb(var(--color-surface-900)),inset_0_0_0_0.25em_rgb(var(--color-surface-900))]':
			checked
	})}
	bind:checked
/>
