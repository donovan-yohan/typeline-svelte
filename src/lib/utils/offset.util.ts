export interface OffsetType {
	top: number;
	left: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
}

export function getOffset(el: HTMLElement, parent?: HTMLElement): OffsetType {
	if (parent && window.getComputedStyle(parent).position === 'static') {
		throw new Error(
			'parent must have a position other than static! https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent'
		);
	}

	if (!parent) parent = document.body;

	let current: HTMLElement | null | undefined = el;
	let xAcc = 0;
	let yAcc = 0;
	while (current && !current.isEqualNode(parent)) {
		xAcc += current.offsetLeft;
		yAcc += current.offsetTop;
		current = current.offsetParent as HTMLElement | null;
	}

	if (!current) console.warn('Could not find parent from child.');

	return {
		left: xAcc,
		top: yAcc,
		right: xAcc + el.offsetWidth,
		bottom: yAcc + el.offsetHeight,
		width: el.offsetWidth,
		height: el.offsetHeight
	};
}
