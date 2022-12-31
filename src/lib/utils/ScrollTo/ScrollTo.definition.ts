export interface ScrollToGlobalOptions {
	offset: number | (() => number);
	duration: number;
	delay: number;
	easing: (t: number) => number;
	x: number;
	y: number;
	scrollX: boolean;
	scrollY: boolean;
	onStart: (element: HTMLElement, coordinate: { x: number; y: number }) => void;
	onDone: (element: HTMLElement, coordinate: { x: number; y: number }) => void;
	container: HTMLElement | string;
	onAborting: (element: HTMLElement, coordinate: { x: number; y: number }) => void;
}

export interface ScrollToOptions extends ScrollToGlobalOptions {
	element: HTMLElement | null;
}
