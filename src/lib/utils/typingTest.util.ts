import { BACKSPACE_CHAR } from './keypress/keypress.util.definition';

export enum TypingInputType {
	BACKSPACE = 'Backspace',
	SPACE = ' ',
	SINGLE_CHARACTER = 'SingleCharacter',
	INVALID = 'Invalid'
}

export function getTypingInputType(key: string, currentInput: string): TypingInputType {
	if (key === 'Backspace' || key === BACKSPACE_CHAR) {
		return TypingInputType.BACKSPACE;
	} else if (key === ' ' && currentInput !== '') {
		return TypingInputType.SPACE;
	} else if (key.length === 1 && key !== ' ') {
		return TypingInputType.SINGLE_CHARACTER;
	} else {
		return TypingInputType.INVALID;
	}
}

export function getNextActiveId(
	typedCharacter: string,
	currentWord: string,
	activeIndex: number
): number {
	const type = getTypingInputType(typedCharacter, currentWord);
	if (type === TypingInputType.BACKSPACE) {
		if (currentWord === '' && activeIndex > 0) {
			return activeIndex - 1;
		} else if (currentWord !== '') {
			return activeIndex;
		}
	} else if (type === TypingInputType.SPACE) {
		return activeIndex + 1;
	} else if (type === TypingInputType.SINGLE_CHARACTER) {
		return activeIndex;
	}
	return activeIndex;
}
