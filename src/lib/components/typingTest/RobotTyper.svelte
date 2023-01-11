<script lang="ts">
	import { isRunning, isFinished } from '$lib/stores/TypingTest.store';
	import type { RobotKeypressType } from '$lib/utils/keypress/keypress.util.definition';
	import { Timeline } from '$lib/utils/timeline.util';
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let keypresses: RobotKeypressType[] = [];

	const timeline = new Timeline();
	const dispatch = createEventDispatcher();

	let keypressesLocal = keypresses;

	// Subscribe to key events to update the event log.
	const keyEvents = timeline.events.keys.subscribe((keyEvent: RobotKeypressType) => {
		dispatch('type', {
			key: keyEvent.key,
			index: keyEvent.index
		});
	});

	$: {
		if (timeline.started) timeline.stop();
		timeline.load(keypressesLocal);
	}

	$: if ($isRunning) {
		timeline.start();
	}

	$: if ($isFinished) timeline.stop();

	$: if (!timeline.started) keypressesLocal = keypresses;

	onDestroy(() => {
		keyEvents?.unsubscribe();
	});
</script>
