import { createListener, isEventNameValid } from './listener'
import { matchesPattern } from './pattern'
import { singleValueOrIter } from './utils'

class EventEmitter {
	#listeners

	constructor() {
		this.#listeners = new Map()
	}

	#addListener(listener) {
		for (const pattern of listener) {
			if (!this.#listeners.has(pattern)) {
				this.#listeners.set(
					pattern,
					new Map()
				)
			}

			this.#listeners
				.get(pattern)
				.set(listener.fn, listener)
		}
	}

	on(...args) {
		this.#addListener(createListener(...args))
	}

	once(...args) {
		this.#addListener(createListener(...args).executeOnce(true))
	}

	off(...args) {
		const listener = createListener(...args)

		for (const pattern of listener) {
			if (!this.#listeners.has(pattern)) {
				continue
			}

			if (listener.fn == null) {
				this.#listeners
					.get(pattern)
					.clear()

				continue
			}

			this.#listeners
				.get(pattern)
				.delete(listener.fn)
		}
	}

	emit(eventName, ...args) {
		if (!isEventNameValid(eventName)) {
			throw new Error('Invalid event name format: ' + eventName)
		}

		for (const [ pattern, listeners ] of this.#listeners.entries()) {
			if (!matchesPattern(pattern, eventName)) {
				continue
			}

			for (const listener of listeners.values()) {
				listener.execute(pattern, ...args)

				if (listener.isDone) {
					this.off(...listener, listener.fn)
				}
			}
		}
	}

	stream(...events) {
		const promise = {}

		const handler = (...args) => setTimeout(() => (
			promise.resolve(singleValueOrIter(...args))
		), 0)

		this.on(...events, handler)

		const generator = (async function *() {
			while (true) {
				yield await new Promise(resolve => promise.resolve = resolve)
			}
		})()

		Object.defineProperty(
			generator,
			'cancel',
			{
				value: () => this.off(...events, handler)
			}
		)

		return generator
	}
}

export default EventEmitter
