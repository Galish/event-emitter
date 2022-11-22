import Handler from './handler'

export default class MultipleEventHandler extends Handler {
	#empty = Symbol('empty')
	#data = new Map()

	constructor(patterns, fn) {
		super(patterns, fn)

		for (const pattern of patterns) {
			this.#data.set(pattern, this.#empty)
		}

		this.fn = fn
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

		this.isExecuted = true

		return this.fn(...results)
	}

	[ Symbol.iterator ]() {
		return this.#data.keys()
	}
}
