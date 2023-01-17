<script lang="ts">
	import cx from 'classnames';
	import { createEventDispatcher } from 'svelte';
	import { ButtonType } from './Button.definition';

	export let type: ButtonType;
	export let bgClass: string;
	export let textClass: string;

	const dispatch = createEventDispatcher();

	const KbdButtonClasses = {
		[ButtonType.Default]: ['btn-default'],
		[ButtonType.Primary]: ['bg-primary-600', 'border-primary-700']
	};

	function onClick() {
		dispatch('click');
	}

	$: colorClasses = KbdButtonClasses[type];
</script>

<button
	class={cx({
		'kbdButton mt-[0.33rem] rounded-lg font-mono tracking-widest [&:hover>div]:translate-y-[-0.33rem] [&:active>div]:translate-y-0 [&:focus-visible>div]:translate-y-[-0.33rem]': true,
		[colorClasses[0]]: true,
		[textClass]: true
	})}
	on:click={onClick}
>
	<div
		class={cx({
			'w-full -translate-y-2 rounded-lg border-2 px-3 py-2 transition-transform ': true,
			[bgClass]: true,
			[colorClasses[1]]: true
		})}
	>
		<slot />
	</div>
</button>

<style lang="scss">
	.kbdButton {
		&:active {
			> div {
				transform: translateY(0rem);
			}
		}
	}
</style>
