export function singleValueOrIter(...args) {
	return args.length > 1 ? args.values() : args[ 0 ]
}
