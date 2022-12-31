export default {
	$(selector: string | HTMLElement): HTMLElement {
		if (typeof selector === 'string') {
			const element = document.querySelector(selector);
			if (!element) throw new Error(`Element not found: ${selector}`);
			return element as HTMLElement;
		}
		return selector;
	},
	extend<T extends object>(target: T | object, ...sources: Partial<T>[]) {
		return Object.assign(target, ...sources);
	},
	cumulativeOffset(element: HTMLElement) {
		let current: HTMLElement | null = element;
		let top = 0;
		let left = 0;

		do {
			top += current.offsetTop || 0;
			left += current.offsetLeft || 0;
			current = current.offsetParent as HTMLElement;
		} while (current);

		return {
			top: top,
			left: left
		};
	},
	directScroll(element: HTMLElement) {
		return element && element !== document.body;
	},
	scrollTop(element: HTMLElement, value?: number) {
		const inSetter = value !== undefined;
		if (this.directScroll(element)) {
			return inSetter ? (element.scrollTop = value) : element.scrollTop;
		} else {
			return inSetter
				? (document.documentElement.scrollTop = document.body.scrollTop = value)
				: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		}
	},
	scrollLeft(element: HTMLElement, value?: number) {
		const inSetter = value !== undefined;
		if (this.directScroll(element)) {
			return inSetter ? (element.scrollLeft = value) : element.scrollLeft;
		} else {
			return inSetter
				? (document.documentElement.scrollLeft = document.body.scrollLeft = value)
				: window.pageXOffset ||
						document.documentElement.scrollLeft ||
						document.body.scrollLeft ||
						0;
		}
	}
};
