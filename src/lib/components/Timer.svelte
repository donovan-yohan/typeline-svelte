<script lang="ts">
	import { gameState } from '$lib/stores/TypingTest.store';
	import { formatTime } from '$lib/utils/time.util';
	import cx from 'classnames';
	import Range from './Range.svelte';

	let time = 15;

	let timer: NodeJS.Timer;

	$: if ($gameState.isRunning && !timer) {
		timer = setInterval(() => {
			time--;
		}, 1000);
	}

	$: if (timer && time === 0) {
		clearInterval(timer);
		gameState.update((s) => ({ ...s, isFinished: true }));
	}
</script>

<div class={cx({ [$$props.class]: true, 'flex items-center gap-2': true })}>
	<Range class={'w-full'} value={time} />
	<span class="font-bold text-primary-600">{formatTime(time)}</span>
</div>
