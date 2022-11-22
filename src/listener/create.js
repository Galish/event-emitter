import EventListener from './listener'
import MultiEventListener from './multi-event-listener'
import isEventNameValid from './is-event-name-valid'

export default function createListener(...args) {
	const events = args.length > 1
		? args.slice(0, -1)
		: new Array(1)

	const fn = args[ args.length - 1 ]

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
