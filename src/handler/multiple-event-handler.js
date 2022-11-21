export default class MultipleEventHandler {
	#empty = Symbol('empty')
	#data = new Map()
	#isExecuted = false
	#isExecuteOnce = false

	constructor(patterns, fn) {
		for (const pattern of patterns) {
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
