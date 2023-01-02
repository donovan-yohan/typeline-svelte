export function formatTime(time: number): string {
	return `${Math.floor(time / 60)}:${(time % 60).toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false
	})}`;
}
