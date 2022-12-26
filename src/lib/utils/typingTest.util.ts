export enum TypingInputType {
	BACKSPACE = 'Backspace',
	SPACE = ' ',
	SINGLE_CHARACTER = 'SingleCharacter',
	INVALID = 'Invalid'
}

export function getTypingInputType(
	key: string,
	currentInput: string,
): TypingInputType {
	if (key === 'Backspace') {
		return TypingInputType.BACKSPACE;
	} else if (key === ' ' && currentInput !== '') {
		return TypingInputType.SPACE;
	} else if (key.length === 1 && key !== ' ') {
		return TypingInputType.SINGLE_CHARACTER;
	} else {
		return TypingInputType.INVALID;
	}
}
