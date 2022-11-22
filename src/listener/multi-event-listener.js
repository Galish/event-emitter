import EventListener from './listener'
import { singleValueOrIter } from '../utils'

export default class MultiEventListener extends EventListener {
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

		this.#data.set(
			pattern,
			singleValueOrIter(...args)
		)

		for (const data of this.#data.values()) {
			if (data === this.#empty) {
				return
			}

			results.push(data)
		}

		this.isExecuted = true

		return this.fn(...results)
	}

	[ Symbol.iterator ]() {
		return this.#data.keys()
	}
}
