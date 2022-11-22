export default function isEventNameValid(input = '') {
	return (
		typeof input === 'string'
		&&
		/^([^.*]+|[*]|[*]{2}$)(\.([^.*]+|[*]|[*]{2}$))*$/g.test(input)
	)
}
