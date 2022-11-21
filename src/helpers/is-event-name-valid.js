export default function isEventNamePatternValid(input = '') {
	return (
		typeof input === 'string'
		&&
		/^([^.*]+|[*]|[*]{2}$)(\.([^.*]+|[*]|[*]{2}$))*$/g.test(input)
	)
}
