import EventListener from './listener'
import MultiEventListener from './multi-event-listener'
import isEventNameValid from './is-event-name-valid'

export default function createListener(...args) {
	let events = [ ...args ]
	let fn

	if (typeof args?.[ args.length - 1 ] === 'function') {
		fn = events.pop()
	}

	if (events.length === 0) {
		events = new Array(1)
	}

	for (const pattern of events) {
		if (!isEventNameValid(pattern)) {
			throw new Error('Invalid event name pattern: ' + pattern)
		}
	}

	if (events.length > 1) {
		return new MultiEventListener(events, fn)
	}

	return new EventListener(events[ 0 ], fn)
}
