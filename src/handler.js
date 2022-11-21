import { isEventNamePatternValid } from './helpers'

export default class EventEmitterHandler {
	#empty = Symbol('empty')
	#data = new Map()
	#isExecuted = false
	#isExecuteOnce = false

	constructor(...args) {
		for (const pattern of args.slice(0, -1)) {
			if (!isEventNamePatternValid(pattern)) {
				throw new Error('Invalid event name pattern: ' + pattern)
			}

			this.#data.set(pattern, this.#empty)
		}

		this.fn = args.at(-1)
	}

	get isDone() {
		return this.#isExecuteOnce && this.#isExecuted
	}

	execute(pattern, ...args) {
		const results = []

		this.#data.set(pattern, args)

		for (const data of this.#data.values()) {
			if (data === this.#empty) {
				return
			}

			results.push(...data)
		}

		this.#isExecuted = true

		return this.fn(...results)
	}

	executeOnce(value = true) {
		this.#isExecuteOnce = value

		return this
	}

	[ Symbol.iterator ]() {
		return this.#data.keys()
	}
}
