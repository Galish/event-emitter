import { isEventNamePatternValid } from './helpers'

export default function createHandler(...args) {
	if (args.length < 2) {
		throw new Error('Insufficient arguments')
	}

	const events = args.slice(0, -1)
	const fn = args[ args.length - 1 ]

	if (events.length > 1) {
		return new MultipleEventHandler(events, fn)
	}

	return new Handler(events[ 0 ], fn)
}

export class Handler {
	#isExecuted = false
	#isExecuteOnce = false

	constructor(pattern, fn) {
		if (!isEventNamePatternValid(pattern)) {
			throw new Error('Invalid event name pattern: ' + pattern)
		}

		this.eventNamePattern = pattern
		this.fn = fn
	}

	get isDone() {
		return this.#isExecuteOnce && this.#isExecuted
	}

	execute(pattern, ...args) {
		if (pattern !== this.eventNamePattern) {
			return
		}

		this.#isExecuted = true

		return this.fn(...args)
	}

	executeOnce(value = true) {
		this.#isExecuteOnce = value

		return this
	}

	[ Symbol.iterator ]() {
		return [ this.eventNamePattern ].values()
	}
}

export class MultipleEventHandler {
	#empty = Symbol('empty')
	#data = new Map()
	#isExecuted = false
	#isExecuteOnce = false

	constructor(patterns, fn) {
		for (const pattern of patterns) {
			if (!isEventNamePatternValid(pattern)) {
				throw new Error('Invalid event name pattern: ' + pattern)
			}

			this.#data.set(pattern, this.#empty)
		}

		this.fn = fn
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
