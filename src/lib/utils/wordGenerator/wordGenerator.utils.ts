import {
	MEDIUM_WORD_MAX_LENGTH,
	NEW_DATE_CHANCE,
	OLD_DATE_CHANCE,
	SHORT_WORD_MAX_LENGTH
} from './wordGenerator.config';
import { CharacterPlacement, SeedType, SeedTypeConstants } from './wordGenerator.definition';
import shortWords from '$lib/assets/words/short';
import mediumWords from '$lib/assets/words/medium';
import longWords from '$lib/assets/words/long';

export function generateSeed() {
	return (Math.random() + 1)
		.toString(36)
		.substring(2)
		.replace(/[0-9]+/g, '')
		.substring(0, 7);
}

export function getRandomWithBias(
	random: () => number,
	min: number,
	max: number,
	bias: number,
	influence: number
) {
	const num = random() * (max - min) + min;
	const mix = random() * influence;
	return num * (1 - mix) + bias * mix;
}

export const getRandom = (random: () => number, min: number, max: number): number => {
	return random() * (max - min) + min;
};

export function generateDate(r: number, random: () => number) {
	if (r < NEW_DATE_CHANCE) {
		// generate date from 1600 to present
		return Math.floor(getRandom(random, 1600, new Date().getFullYear())) + '';
	} else if (r >= NEW_DATE_CHANCE && r < NEW_DATE_CHANCE + OLD_DATE_CHANCE) {
		// generate BC date
		const date = Math.floor(getRandom(random, 100, 900));
		return date + 'BC';
	} else {
		// generate a placement number
		const number = Math.floor(getRandom(random, 1, 20));
		if (number === 1) {
			return '1st';
		} else if (number === 2) {
			return '2nd';
		} else if (number === 3) {
			return '3rd';
		} else {
			return number + 'th';
		}
	}
}

export function formatWord(word: string, symbol: string, placement: CharacterPlacement): string {
	if (placement === CharacterPlacement.BEFORE) {
		return symbol + word;
	} else if (placement === CharacterPlacement.AFTER) {
		return word + symbol;
	} else {
		if (symbol.length == 2) {
			return symbol.charAt(0) + word + symbol.charAt(1);
		} else {
			return symbol + word + symbol;
		}
	}
}

// combine n arrays with alternating values
export function combineArraysAlternating<T>(arrays: T[][]): T[] {
	const combined: T[] = [];
	const length = Math.max(...arrays.map((a) => a.length));
	for (let i = 0; i < length; i++) {
		arrays.forEach((a) => {
			if (a[i]) combined.push(a[i]);
		});
	}
	return combined;
}

export function filterWordBank(min: number, max: number): string[] {
	if (min === max) min = 0;

	let short = shortWords;
	let med = mediumWords;
	let long = longWords;

	if (min > SHORT_WORD_MAX_LENGTH) short = [];
	else if (max < SHORT_WORD_MAX_LENGTH)
		short = short.filter((w) => w.length <= max && w.length > min);

	if (min > MEDIUM_WORD_MAX_LENGTH || max <= SHORT_WORD_MAX_LENGTH) med = [];
	else med = med.filter((w) => w.length <= max && w.length > min);

	if (max <= MEDIUM_WORD_MAX_LENGTH) long = [];
	else if (min > MEDIUM_WORD_MAX_LENGTH)
		long = long.filter((w) => w.length <= max && w.length > min);

	return combineArraysAlternating([short, med]).concat(long);
}

const base61 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function toBase61(num: number) {
	let result = '';
	while (num > 0) {
		result = base61.charAt(num % 61) + result;
		num = Math.floor(num / 61);
	}
	return result;
}

export function fromBase61(str: string) {
	let result = 0;
	for (let i = 0; i < str.length; i++) {
		result = result * 61 + base61.indexOf(str.charAt(i));
	}
	return result;
}

export function createOptionsSeed(values: string[], type: SeedType) {
	if (
		values.length !== SeedTypeConstants[type].numValues ||
		values.join('').length !== SeedTypeConstants[type].totalLength
	)
		throw new Error(
			`Invalid values for advanced seed. Expected ${SeedTypeConstants[type].numValues} values with total length ${SeedTypeConstants[type].totalLength}. Received ${values}.`
		);

	try {
		if (SeedTypeConstants[type].totalLength > 15) {
			const bigNum = BigInt('1' + values.join(''));
			const hashFactor = BigInt('5'.repeat(SeedTypeConstants[type].numValues));
			console.log({ bigNum, hashFactor });

			const hash = bigNum / hashFactor;
			const remainder = bigNum % hashFactor;

			const hashNum = Number(hash);
			const remainderNum = Number(remainder);

			return toBase61(hashNum) + '-' + toBase61(remainderNum);
		} else {
			return toBase61(Number('1' + values.join('')));
		}
	} catch (e) {
		throw new Error(`Invalid values for advanced seed. Failed to parse from ${values}`);
	}
}

function parseHashedSeed(seed: string, type: SeedType) {
	const [hash, remainder] = seed.split('-');
	const hashNum = fromBase61(hash);
	const remainderNum = fromBase61(remainder);

	const bigNum =
		BigInt(hashNum) * BigInt('5'.repeat(SeedTypeConstants[type].numValues)) + BigInt(remainderNum);
	const valuesString = bigNum.toString().substring(1);

	return seedStringToArray(valuesString, type);
}

function seedStringToArray(seed: string, type: SeedType) {
	if (type === SeedType.ADVANCED) {
		const lastTwoChars = seed.substring(seed.length - 2);
		const str = seed.substring(0, seed.length - 2);

		const values: string[] = str.match(/.{1,2}/g) || [];

		return values.concat(lastTwoChars.split(''));
	} else {
		const values: string[] = seed.match(/.{1,2}/g) || [];
		return values;
	}
}

export function parseOptionsSeed(seed: string, type: SeedType) {
	if (seed.includes('-')) {
		return parseHashedSeed(seed, type);
	} else {
		return seedStringToArray(fromBase61(seed).toString().substring(1), type);
	}
}
