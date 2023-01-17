<script>
	import cx from 'classnames';
	export let checked = false;
</script>

<div
	class={cx({
		'h-full w-full rounded-md bg-primary-500 shadow-[0_0_0.75rem_0px] shadow-primary-500 transition-all': true,
		'bg-surface-900 shadow-none': !checked
	})}
/>
