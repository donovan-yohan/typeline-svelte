import { BACKSPACE_CHAR, type KeypressType } from './keypress.util.definition';

export const keypressToString = (keypresses: KeypressType[]): string => {
	const keys = keypresses.map((keypress) => keypress.key);

	return keys.reduce((acc, key) => {
		if (key === BACKSPACE_CHAR) {
			return acc.slice(0, -1);
		}

		return `${acc}${key}`;
	}, '');
};

export const keypressToArray = (keypresses: KeypressType[]): string[] => {
	return keypressToString(keypresses).split(' ');
};

export const keypressesToKeypressArray = (keypresses: KeypressType[]): KeypressType[][] => {
	const keypressesArray: KeypressType[][] = [[]];
	let index = 0;
	let letters = 0;

	keypresses.forEach((keypress) => {
		if (keypress.key === ' ') {
			// push keypress to current word
			keypressesArray[index].push(keypress);

			index++;
			if (!keypressesArray[index]) keypressesArray.push([]);
			letters = 0;
		} else if (keypress.key === BACKSPACE_CHAR) {
			if (letters === 0) {
				index--;
				letters = keypressesToLength(keypressesArray[index]);
			} else letters--;

			// push keypress to current word, or previous if empty
			keypressesArray[index].push(keypress);
		} else {
			keypressesArray[index].push(keypress);
			letters++;
		}
	});

	return keypressesArray;
};

const keypressesToLength = (keypresses: KeypressType[]): number => {
	let length = 0;

	keypresses.forEach((keypress) => {
		if (keypress.key === BACKSPACE_CHAR) length--;
		else length++;
	});

	return length;
};
