<!-- svelte component that extends the default button -->
<script lang="ts">
	import cx from 'classnames';
	export let disabled: boolean = false;
	export let onClick: () => void = () => {};
	export let type: 'primary' | 'error' = 'primary';

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
</script>

{#if $$slots.default}
	<span class={'inline-block text-lg ' + $$props.class}>
		<button
			{disabled}
			on:click={onClick}
			class={cx({
				// base style
				'relative z-10 whitespace-nowrap py-0.5 px-1 font-bold uppercase tracking-[0.25rem] transition-all duration-300 focus:outline-none': true,
				[classes[type].textClass]: true,
				'hover:text-surface-900 focus:text-surface-900': true,
				// before style
				'before: ease-out before:absolute before:left-0 before:bottom-0 before:-z-10 before:inline-block before:h-full before:w-0 before:transition-all before:duration-300': true,
				[classes[type].bgClass]: true,
				'before:hover:w-[98%] before:focus:w-[98%]': true,
				// after style
				'after:absolute after:left-0 after:bottom-0 after:inline-block after:h-full after:w-0.5 after:animate-blink after:bg-surface-900 after:opacity-0 after:transition-all after:duration-300': true,
				'after:hover:left-[95%] after:hover:opacity-100 after:focus:left-[95%] after:focus:opacity-100': true
			})}><slot /></button
		>
	</span>
{/if}
