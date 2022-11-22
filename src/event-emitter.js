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
		const queue = []
		let isWaitinigToCancel = false

		const handler = (...args) => {
			queue.push(args)
			promise.resolve?.()
		}

		this.on(...events, handler)

		const generator = (async function *() {
			while (true) {
				while (true) {
					if (queue.length === 0) {
						break
					}

					yield singleValueOrIter(...queue.shift())
				}

				if (isWaitinigToCancel === true) {
					return
				}

				await new Promise(resolve => promise.resolve = resolve)
			}
		})()

		const cancel = () => {
			this.off(...events, handler)
			isWaitinigToCancel = true
			promise.resolve?.()
		}

		Object.defineProperty(
			generator,
			'cancel',
			{
				value: cancel
			}
		)

		return generator
	}
}

export default EventEmitter
