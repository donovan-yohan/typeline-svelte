interface SpecialCharacter {
	char: string;
	probability: number;
	placement: CharacterPlacement;
}

export interface optionFlags {
	hasUppercase: boolean;
	hasNumbers: boolean;
	hasPunctuation: boolean;
	hasSymbols: boolean;
	minWordLength: number;
	maxWordLength: number;
	customSymbolsTable?: SpecialCharacter[];
	customPunctuationTable?: SpecialCharacter[];
	customWordBank?: string[];
}

export interface TestInfo {
	seed: string;
	options?: optionFlags;
	time: number;
}

export enum CharacterPlacement {
	BEFORE,
	AFTER,
	MIDDLE,
	WRAP,
	ALONE
}

export enum SeedType {
	ADVANCED,
	STANDARD,
	SYMBOLS,
	PUNCTUATION
}

interface SeedConstants {
	numValues: number;
	totalLength: number;
}

export const SeedTypeConstants: { [key in SeedType]: SeedConstants } = {
	[SeedType.ADVANCED]: {
		numValues: 7,
		totalLength: 12
	},
	[SeedType.STANDARD]: {
		numValues: 6,
		totalLength: 6
	},
	[SeedType.SYMBOLS]: {
		numValues: 6,
		totalLength: 12
	},
	[SeedType.PUNCTUATION]: {
		numValues: 8,
		totalLength: 16
	}
};
