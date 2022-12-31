import { cubicInOut } from 'svelte/easing';
import { noop, loop, now } from 'svelte/internal';
import type { ScrollToGlobalOptions, ScrollToOptions } from './ScrollTo.definition';
import _ from './ScrollTo.util';

const defaultOptions: ScrollToGlobalOptions = {
	container: 'body',
	duration: 500,
	delay: 0,
	offset: 0,
	easing: cubicInOut,
	onStart: noop,
	onDone: noop,
	onAborting: noop,
	scrollX: false,
	scrollY: true,
	x: 0,
	y: 0
};

const _scrollTo = (options: ScrollToOptions) => {
	const {
		duration,
		delay,
		easing,
		x = 0,
		y = 0,
		scrollX,
		scrollY,
		onStart,
		onDone,
		container,
		onAborting,
		element
	} = options;
	let offset = options.offset;

	if (!element) throw new Error('Element is not defined');

	if (typeof offset === 'function') {
		offset = offset();
	}

	const cumulativeOffsetContainer = _.cumulativeOffset(_.$(container));
	const cumulativeOffsetTarget = element ? _.cumulativeOffset(element) : { top: y, left: x };

	const initialX = _.scrollLeft(_.$(container));
	const initialY = _.scrollTop(_.$(container));

	const targetX = cumulativeOffsetTarget.left - cumulativeOffsetContainer.left + offset;
	const targetY = cumulativeOffsetTarget.top - cumulativeOffsetContainer.top + offset;

	const diffX = targetX - initialX;
	const diffY = targetY - initialY;

	if (diffY === 0 || (targetY < 0 && initialY === 0)) return;

	let scrolling = true;
	let started = false;
	const start_time = now() + delay;
	const end_time = start_time + duration;

	function scrollToTopLeft(element: HTMLElement, top: number, left: number) {
		if (scrollX) _.scrollLeft(element, left);
		if (scrollY) _.scrollTop(element, top);
	}

	function start(delayStart: number) {
		if (!delayStart) {
			started = true;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			onStart(element!, { x, y });
		}
	}

	function tick(progress: number) {
		scrollToTopLeft(_.$(container), initialY + diffY * progress, initialX + diffX * progress);
	}

	function stop() {
		scrolling = false;
	}

	loop((now) => {
		if (!started && now >= start_time) {
			start(0);
		}

		if (started && now >= end_time) {
			tick(1);
			stop();
			onDone(element, { x, y });
		}

		if (!scrolling) {
			onAborting(element, { x, y });
			return false;
		}
		if (started) {
			const p = now - start_time;
			const t = 0 + 1 * easing(p / duration);
			tick(t);
		}

		return true;
	});

	start(delay);

	tick(0);

	return stop;
};

const proceedOptions = (options: Partial<ScrollToOptions>): ScrollToOptions => {
	const opts = _.extend({}, defaultOptions, options);
	opts.container = _.$(opts.container);
	opts.element = _.$(opts.element);
	return opts;
};

const scrollContainerHeight = (containerElement: HTMLElement) => {
	if (containerElement && containerElement !== document.body) {
		return containerElement.scrollHeight - containerElement.offsetHeight;
	} else {
		const body = document.body;
		const html = document.documentElement;

		return Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);
	}
};

export const setGlobalOptions = (options: Partial<ScrollToGlobalOptions>) => {
	_.extend(defaultOptions, options || {});
};

export const scrollTo = (options: Partial<ScrollToOptions>) => {
	return _scrollTo(proceedOptions(options));
};

export const scrollToBottom = (options: Partial<ScrollToOptions>) => {
	const safeOptions = proceedOptions(options);

	return _scrollTo(
		_.extend(options, {
			element: null,
			y: scrollContainerHeight(_.$(safeOptions.container))
		})
	);
};

export const scrollToTop = (options: Partial<ScrollToOptions>) => {
	options = proceedOptions(options);

	return _scrollTo(
		_.extend(options, {
			element: null,
			y: 0
		})
	);
};

// export const makeScrollToAction = (scrollToFunc) => {
// 	return (node, options) => {
// 		let current = options;
// 		const handle = (e) => {
// 			e.preventDefault();
// 			scrollToFunc(typeof current === 'string' ? { element: current } : current);
// 		};
// 		node.addEventListener('click', handle);
// 		node.addEventListener('touchstart', handle);
// 		return {
// 			update(options) {
// 				current = options;
// 			},
// 			destroy() {
// 				node.removeEventListener('click', handle);
// 				node.removeEventListener('touchstart', handle);
// 			}
// 		};
// 	};
// };

// export const scrollto = makeScrollToAction(scrollTo);
// export const scrolltotop = makeScrollToAction(scrollToTop);
// export const scrolltobottom = makeScrollToAction(scrollToBottom);
