<script>
	import KbdButton from '$lib/components/common/Button/KbdButton.svelte';
	import { ButtonType } from '../common/Button/Button.definition';
	import StatusLight from '../common/StatusLight.svelte';
	import Toggle from '../common/Toggle.svelte';

	let capitalsChecked = false;
	let numbersChecked = false;
	let punctuationChecked = false;
	let symbolsChecked = false;
</script>

<div class="mx-8 my-4">
	<span class="text-3xl font-bold">customize</span>
	<div class="mt-8 w-full text-lg">
		<div class="flex flex-col gap-6">
			<div class="flex items-center justify-between gap-2">
				Capitals
				<Toggle bind:checked={capitalsChecked} />
			</div>
			<div class="flex items-center justify-between gap-2">
				<KbdButton
					on:click={() => (numbersChecked = !numbersChecked)}
					type={ButtonType.Primary}
					bgClass={'bg-surface-800'}
					textClass={'text-token'}>Numbers</KbdButton
				>
				<div class="h-4 w-4">
					<StatusLight checked={numbersChecked} />
				</div>
			</div>
			<div class="flex items-center justify-between gap-2">
				<KbdButton
					on:click={() => (punctuationChecked = !punctuationChecked)}
					type={ButtonType.Primary}
					bgClass={'bg-surface-800'}
					textClass={'text-token'}>Punctuation</KbdButton
				>
				<div class="h-4 w-4">
					<StatusLight checked={punctuationChecked} />
				</div>
			</div>
			<div class="flex items-center justify-between gap-2">
				<KbdButton
					on:click={() => (symbolsChecked = !symbolsChecked)}
					type={ButtonType.Primary}
					bgClass={'bg-surface-800'}
					textClass={'text-token'}>Symbols</KbdButton
				>
				<div class="h-4 w-4">
					<StatusLight checked={symbolsChecked} />
				</div>
			</div>
		</div>
	</div>
</div>
