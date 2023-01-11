<!-- svelte component that extends the default button -->
<script lang="ts">
	import cx from 'classnames';
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean = false;
	export let type: 'primary' | 'error' = 'primary';

	const dispatch = createEventDispatcher();

	const classes = {
		primary: {
			textClass: 'text-primary-500',
			bgClass: 'before:bg-primary-500'
		},
		error: {
			textClass: 'text-error-500',
			bgClass: 'before:bg-error-500'
		}
	};

	function onClick() {
		if (disabled) return;
		dispatch('click');
	}
</script>

{#if $$slots.default}
	<span class={'inline-block text-lg ' + $$props.class}>
		<button
			on:click={onClick}
			{disabled}
			class={cx({
				// base style
				'relative z-10 whitespace-nowrap py-0.5 pl-1 font-bold uppercase tracking-[0.25rem] transition-all duration-300 focus-visible:outline-none': true,
				[classes[type].textClass]: true,
				'hover:text-surface-900 focus-visible:text-surface-900': true,
				// before style
				'before: ease-out before:absolute before:left-0 before:bottom-0 before:-z-10 before:inline-block before:h-full before:w-0 before:transition-all before:duration-300': true,
				[classes[type].bgClass]: true,
				'before:hover:w-[100%] before:focus-visible:w-[100%]': true,
				// after style
				'after:absolute after:left-0 after:bottom-0 after:inline-block after:h-full after:w-0.5 after:animate-blink after:bg-surface-900 after:opacity-0 after:transition-all after:duration-300': true,
				'after:hover:left-[calc(100%-0.3rem)] after:hover:opacity-100 after:focus-visible:left-[95%] after:focus-visible:opacity-100': true
			})}><slot /></button
		>
	</span>
{/if}
