export interface KeypressType {
	key: string;
	timestamp: number;
}

export interface RobotKeypressType extends KeypressType {
	index: number;
}

export const BACKSPACE_CHAR = '⌫';
