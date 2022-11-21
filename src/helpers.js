export function isEventNamePatternValid(template = '') {
	return (
		typeof template === 'string'
		&&
		/^[^.]+(\.[^.]+)*$/g.test(template)
	)
}
