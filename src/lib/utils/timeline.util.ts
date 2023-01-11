import { Subject } from 'rxjs';
import { tick } from 'svelte';
import type { RobotKeypressType } from './keypress/keypress.util.definition';

export type PlayState = 'started' | 'stopped' | 'paused' | 'resumed' | 'reset';

type TimelineEventType = keyof TimelineEvents;
type TimelineEventPayload = PlayState | RobotKeypressType;

interface TimelineEvents {
	keys: Subject<RobotKeypressType>;
	playback: Subject<PlayState>;
}

export class Timeline {
	events: TimelineEvents = {
		keys: new Subject(),
		playback: new Subject()
	} as const;
	//  Pseudo nested svelte sugar.
	get $events() {
		return {
			keys: this.events.keys.asObservable(),
			playback: this.events.playback.asObservable()
		};
	}

	data: RobotKeypressType[] = [];
	load(data: RobotKeypressType[]) {
		// this.data = JSON.parse(JSON.stringify(data))
		this.data = data;
		this.reset();
	}

	loadMore(data: RobotKeypressType[]) {
		this.data = [...this.data, ...data];
		this.reset();
	}

	queue: RobotKeypressType[] = [];
	next() {
		const event = this.queue.shift();
		if (event) {
			this.dispatchEvent('keys', event);
			// activeKey.set(event.key);
		} else {
			this.stop();
		}
	}

	// Time
	refreshRate = 1;
	startTime = 0;
	lastTick = 0;
	lastPause = 0;
	get elapsed() {
		return this.lastTick - this.startTime;
	}

	// Playback
	_state: PlayState = 'stopped';
	get state() {
		return this._state;
	}
	set state(value: PlayState) {
		this._state = value;
		this.dispatchEvent('playback', value);
	}

	get started() {
		return this.state === 'started';
	}
	get stopped() {
		return this.state === 'stopped';
	}
	get paused() {
		return this.state === 'paused';
	}

	async dispatchEvent(type: TimelineEventType, value: TimelineEventPayload) {
		await tick();
		switch (type) {
			case 'keys':
				this.events.keys.next(value as RobotKeypressType);
				break;
			case 'playback':
				this.events.playback.next(value as PlayState);
				break;
		}
	}

	// Controls
	start() {
		if (this.started) return;
		if (this.paused) return this.resume();

		this.queue = this.data;
		this.queue.sort((a, b) => a.timestamp - b.timestamp);
		console.log(this.queue);
		this.state = 'started';
		this.startTime = Date.now();
		this.lastTick = Date.now();
		this.tick();
	}
	stop() {
		this.reset();
		this.startTime = 0;
		this.state = 'stopped';
	}
	pause() {
		if (!this.started) return;
		this.lastPause = Date.now();
		this.state = 'paused';
	}
	private resume() {
		if (!this.paused) return;
		const lastStartTime = this.startTime;
		this.startTime = lastStartTime + (Date.now() - this.lastPause);
		this.state = 'started';
		this.tick();
	}
	private reset() {
		this.queue = [];
		this.startTime = 0;
		this.lastTick = 0;
		this.lastPause = 0;
		this.events.playback.next('reset');
	}

	// Render loop
	private tick() {
		if (this.state !== 'started') return;

		requestAnimationFrame(this.tick.bind(this));

		const now = Date.now();

		const elapsed = now - this.lastTick;

		if (elapsed < this.refreshRate) return;

		this.lastTick += elapsed;

		// Check if we need to play the next event
		if (this.queue.length > 0) {
			const nextEvent = this.queue[0];
			if (nextEvent.timestamp <= this.elapsed) {
				this.next();
			}
		} else this.stop();
	}
}
