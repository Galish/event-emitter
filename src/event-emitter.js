import { createHandler, isEventNameValid } from './handler'
import { matchesPattern } from './pattern'
import { singleValueOrIter } from './utils'

class EventEmitter {
	#listeners

	constructor() {
		this.#listeners = new Map()
	}

	#addListener(handler) {
		for (const pattern of handler) {
			if (!this.#listeners.has(pattern)) {
				this.#listeners.set(
					pattern,
					new Map()
				)
			}

			this.#listeners
				.get(pattern)
				.set(handler.fn, handler)
		}
	}

	on(...args) {
		this.#addListener(createHandler(...args))
	}

	once(...args) {
		this.#addListener(createHandler(...args).executeOnce(true))
	}

	off(...args) {
		const handler = createHandler(...args)

		for (const pattern of handler) {
			if (!this.#listeners.has(pattern)) {
				continue
			}

			if (handler.fn == null) {
				this.#listeners
					.get(pattern)
					.clear()

				continue
			}

			this.#listeners
				.get(pattern)
				.delete(handler.fn)
		}
	}

	emit(eventName, ...args) {
		if (!isEventNameValid(eventName)) {
			throw new Error('Invalid event name format: ' + eventName)
		}

		for (const [ pattern, handlers ] of this.#listeners.entries()) {
			if (!matchesPattern(pattern, eventName)) {
				continue
			}

			for (const handler of handlers.values()) {
				handler.execute(pattern, ...args)

				if (handler.isDone) {
					this.off(...handler, handler.fn)
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
