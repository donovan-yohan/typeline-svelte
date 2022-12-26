import { crossfade } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

export const [send, receive] = crossfade({
	duration: 200,
	easing: cubicOut,
	fallback(node, _) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 600,
			easing: cubicOut,
			css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`
		};
	}
});
