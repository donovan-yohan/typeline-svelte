<script lang="ts">
	import cx from 'classnames';

	export let value: number;
	export let min: number = 0;
	export let max: number = 15;
	export let disabled = false;

	$: thumbPosition = Math.round((100 / (max - min - 1)) * value - 100 / (max - min - 1));
</script>

<div class={$$props.class}>
	<div id="track" class="bg-base relative h-1 w-full overflow-x-hidden rounded bg-base-content/50">
		<span
			id="thumb"
			style={'transform: translateX(' + thumbPosition + '%)'}
			class="absolute -left-full top-0 h-full w-full bg-base-content transition-transform duration-1000 ease-linear"
		/>
	</div>
	<input bind:value type="range" {min} {max} {disabled} class="hidden" />
</div>
