import type { TooltipItem } from 'chart.js';

export const getLabelString = (context: TooltipItem<'line'>) => {
	const value = `${context.parsed.y}`;
	if (!context.dataset.label) return value;
	if (context.dataset.label.includes('WPM')) {
		return value + `wpm ${context.dataset.label.replace(' WPM', '').toLowerCase()}`;
	} else if (context.dataset.label.includes('Error')) {
		if (context.parsed.y == 1) {
			return value + ` error`;
		} else {
			return value + ` errors`;
		}
	} else {
		return value + ` ${context.dataset.label.toLowerCase()}`;
	}
};
