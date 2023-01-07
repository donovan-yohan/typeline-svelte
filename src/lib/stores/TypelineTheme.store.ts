import { writable } from 'svelte/store';

interface ThemeColor {
	'50': string;
	'100': string;
	'200': string;
	'300': string;
	'400': string;
	'500': string;
	'600': string;
	'700': string;
	'800': string;
	'900': string;
}

interface ThemeColors {
	primary: ThemeColor;
	secondary: ThemeColor;
	tertiary: ThemeColor;
	success: ThemeColor;
	warning: ThemeColor;
	error: ThemeColor;
	surface: ThemeColor;
}

interface Theme extends ThemeColors {
	id: string;
	name: string;
	default: string;
}

const defaultThemeColor: ThemeColor = {
	'50': '#000000',
	'100': '#000000',
	'200': '#000000',
	'300': '#000000',
	'400': '#000000',
	'500': '#000000',
	'600': '#000000',
	'700': '#000000',
	'800': '#000000',
	'900': '#000000'
};

const defaultThemeColors: ThemeColors = {
	primary: { ...defaultThemeColor },
	secondary: { ...defaultThemeColor },
	tertiary: { ...defaultThemeColor },
	success: { ...defaultThemeColor },
	warning: { ...defaultThemeColor },
	error: { ...defaultThemeColor },
	surface: { ...defaultThemeColor }
};

const defaultTheme: Theme = {
	id: 'default',
	name: 'Default',
	default: '#000000',
	...defaultThemeColors
};

function rgbToHex(r: number, g: number, b: number) {
	return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

// function hexToRgb(hex: string) {
// 	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
// 	return result
// 		? {
// 				r: parseInt(result[1], 16),
// 				g: parseInt(result[2], 16),
// 				b: parseInt(result[3], 16)
// 		  }
// 		: null;
// }

function objectMap<T extends object>(
	obj: T,
	fn: (v: T[keyof T], k: keyof T, i: number) => T[keyof T]
): T {
	return Object.fromEntries(
		Object.entries(obj).map(([k, v], i) => [k, fn(v, k as keyof T, i)])
	) as T;
}

function getColorFromCSS(varName: string) {
	const color = getComputedStyle(document.documentElement).getPropertyValue(varName);
	const colorRGB = color
		.split(' ')
		.filter((c) => !Number.isNaN(parseInt(c)))
		.map((c) => parseInt(c));
	return rgbToHex(colorRGB[0], colorRGB[1], colorRGB[2]);
}

function getColorsFromCSS() {
	return objectMap(defaultThemeColors, (themeColor, colorKey) => {
		return objectMap(themeColor, (_, colorValueKey) => {
			// known format of skeleton color library
			return getColorFromCSS(`--color-${colorKey}-${colorValueKey}`);
		});
	});
}

function createTypelineTheme() {
	const { subscribe, set } = writable<Theme>(defaultTheme);

	return {
		subscribe,
		initialize: () => {
			set({
				name: 'Default',
				id: 'default',
				default: getColorFromCSS('--theme-font-color-dark'),
				...getColorsFromCSS()
			});
		}
	};
}

export const typelineTheme = createTypelineTheme();
