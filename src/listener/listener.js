export default class EventListener {
	#eventNamePattern
	_isExecuted = false
	_isExecuteOnce = false

	constructor(pattern, fn) {
		this.#eventNamePattern = Array.isArray(pattern)
			? pattern[ 0 ]
			: pattern

		this.fn = fn
	}

	get isDone() {
		return this._isExecuteOnce && this._isExecuted
	}

	execute(pattern, ...args) {
		if (
			pattern !== this.#eventNamePattern
			||
			this.isDone === true
		) {
			return
		}

		this._isExecuted = true

		return this.fn(...args)
	}

	executeOnce(value = true) {
		this._isExecuteOnce = value

		return this
	}

	values() {
		return [ this.#eventNamePattern ].values()
	}
}
