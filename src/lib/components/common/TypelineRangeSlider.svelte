<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';

	// https://www.npmjs.com/package/svelte-range-slider-pips
	export let values = [50];
	export let min = 0;
	export let max = 100;
	export let step = 1;
	export let range: boolean | 'min' | 'max' = false;
	export let pushy = false;
	export let float = false;
	export let vertical = false;
	export let pips = false;
	export let pipstep = 1;
	export let first: boolean | 'label' = false;
	export let last: boolean | 'label' = false;
	export let rest: boolean | 'label' = false;
	export let all: boolean | string = false;
</script>

<div class="customRangeSlider">
	<RangeSlider
		{values}
		{min}
		{max}
		{step}
		{range}
		{pushy}
		{float}
		{vertical}
		{pips}
		{pipstep}
		{first}
		{last}
		{rest}
		{all}
		on:start
		on:change
		on:stop
	/>
</div>

<style lang="scss">
	.customRangeSlider {
		--range-slider: rgb(var(--color-surface-900)); /* slider main background color */
		--range-handle-inactive: rgb(var(--color-surface-500)); /* inactive handle color */
		--range-handle: rgb(var(--color-primary-500)); /* non-focussed handle color */
		--range-handle-focus: rgb(var(--color-primary-500)); /* focussed handle color */
		--range-handle-border: var(--range-handle);
		--range-range-inactive: var(--range-handle-inactive); /* inactive range bar background color */
		--range-range: var(--range-handle-focus); /* active range bar background color */
		--range-float-inactive: var(
			--range-handle-inactive
		); /* inactive floating label background color */
		--range-float: var(--range-handle-focus); /* floating label background color */
		--range-float-text: rgb(var(--theme-font-color-dark)); /* text color on floating label */
		--range-pip: rgb(var(--theme-font-color-dark));
		--range-pip-text: var(--range-float-text); /* text color on pip label */
		--range-pip-active-text: var(--range-pip-text);
		--range-pip-active: var(--range-pip);
	}
</style>
