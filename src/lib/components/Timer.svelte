<script lang="ts">
	import { isFinished, isRunning } from '$lib/stores/TypingTest.store';
	import { formatTime } from '$lib/utils/time.util';
	import cx from 'classnames';
	import Range from './Range.svelte';

	let time = 15;

	let timer: NodeJS.Timer;

	$: if ($isRunning && !timer) {
		timer = setInterval(() => {
			time--;
		}, 1000);
	}

	$: if (timer && time === 0) {
		clearInterval(timer);
		isFinished.set(true);
	}
</script>

<div class={cx({ [$$props.class]: true, 'flex items-center gap-2': true })}>
	<Range class={'w-full'} value={time} />
	<span class="text-default font-bold">{formatTime(time)}</span>
</div>
