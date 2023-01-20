<script>
	import KbdButton from '$lib/components/common/Button/KbdButton.svelte';
	import { ButtonType } from '../common/Button/Button.definition';
	import StatusLight from '../common/StatusLight.svelte';
	import Toggle from '../common/Toggle.svelte';
	import { LONGEST_WORD_LENGTH } from '$lib/utils/wordGenerator/wordGenerator.config';
	import TypelineRangeSlider from '../common/TypelineRangeSlider.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	let capitalsChecked = false;
	let numbersChecked = false;
	let punctuationChecked = false;
	let symbolsChecked = false;

	const storeTab = writable('a');
</script>

<div class="mx-8 my-4">
	<span class="text-3xl font-bold">customize</span>

	<div class="mt-8 mb-16 w-full text-lg">
		<div class="flex flex-col gap-6">
			<div class="flex items-center justify-between gap-2">
				<label class="text-2xl" for="capitals">Seed</label>
				<input />
			</div>
			<div class="flex items-center justify-between gap-2">
				<label class="text-2xl" for="capitals">Capitals</label>
				<Toggle id="capitals" bind:checked={capitalsChecked} />
			</div>
			<div class="flex items-center justify-between gap-2">
				<label class="text-2xl" for="numbers">Numbers</label>
				<Toggle id="numbers" bind:checked={numbersChecked} />
			</div>
			<div class="flex items-center justify-between gap-2">
				<label class="text-2xl" for="numbers">Punctuation</label>
				<Toggle id="numbers" bind:checked={punctuationChecked} />
			</div>
			<div class="flex items-center justify-between gap-2">
				<label class="text-2xl" for="numbers">Symbols</label>
				<Toggle id="numbers" bind:checked={symbolsChecked} />
			</div>
			<div class="flex items-center justify-between gap-2">
				<label class="text-2xl" for="numbers">Word Length</label>
				<div class="flex-1">
					<TypelineRangeSlider
						min={1}
						max={LONGEST_WORD_LENGTH}
						step={1}
						values={[1, 7]}
						float
						range
						pushy
					/>
				</div>
			</div>
		</div>
	</div>
	<span class="text-3xl font-bold">share</span>
</div>
