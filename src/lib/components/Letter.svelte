<script lang="ts">
	import cx from 'classnames';
	export let letter: String;
	export let typed: String;
</script>

<span
	class={cx({
		'text-red-700': typed && letter !== typed,
		'line-through': letter && typed && letter !== typed
	})}>{letter || typed}</span
>
