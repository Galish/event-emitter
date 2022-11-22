import Handler from './handler'
import MultipleEventHandler from './multiple-event-handler'
import isEventNameValid from './is-event-name-valid'

export default function createHandler(...args) {
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
		return new MultipleEventHandler(events, fn)
	}

	return new Handler(events[ 0 ], fn)
}
