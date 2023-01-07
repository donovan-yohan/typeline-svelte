import { BACKSPACE_CHAR, type KeypressType } from '$lib/utils/keypress/keypress.util.definition';
import { EmptyStatType } from '../chart.utils';
import type { StatType } from '../chart.utils.definition';
import { addCorrect, addCorrected, addIncorrect, addIncorrectWord } from './statsGenerator.utils';

export const generateStats = (
	keypresses: KeypressType[],
	expected: string[],
	totalTime: number
): StatType[] => {
	// check keypress against expected
	// add to actual string array
	// update expected index when space or backspace on empty actual
	// add to Math.floor(time) stat

	const actual = new Array(expected.length).fill('');
	const stats = new Array<StatType>(totalTime).fill(EmptyStatType);
	let actualIndex = 0;

	keypresses.forEach((keypress) => {
		const { key, timestamp } = keypress;
		const timeIndex = Math.floor(timestamp / 1000);

		const curr = actual[actualIndex];

		if (timeIndex < totalTime) {
			if (key === ' ') {
				if (curr === expected[actualIndex]) stats[timeIndex] = addCorrect(stats[timeIndex]);
				else stats[timeIndex] = addIncorrect(stats[timeIndex]);

				actualIndex++;
			} else if (key === BACKSPACE_CHAR) {
				if (curr) {
					if (curr.slice(-1) !== expected[actualIndex][curr.length - 1])
						stats[timeIndex] = addCorrected(stats[timeIndex]);

					actual[actualIndex] = actual[actualIndex].slice(0, -1);
				} else {
					const lastActual = actual[actualIndex - 1];
					const lastExpected = expected[actualIndex - 1];
					if (lastActual && lastExpected && lastActual !== lastExpected)
						stats[timeIndex] = addCorrected(stats[timeIndex]);

					actualIndex--;
				}
			} else {
				if (
					curr.length < expected[actualIndex].length &&
					key === expected[actualIndex][curr.length]
				)
					stats[timeIndex] = addCorrect(stats[timeIndex]);
				else {
					stats[timeIndex] = addIncorrect(stats[timeIndex]);
					stats[timeIndex] = addIncorrectWord(stats[timeIndex], expected[actualIndex]);
				}
				actual[actualIndex] += key;
			}
		}
	});
	return stats;
};
