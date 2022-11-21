export default class Handler {
	#isExecuted = false
	#isExecuteOnce = false

	constructor(pattern, fn) {
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
