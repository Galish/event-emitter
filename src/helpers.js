export function isEventNamePatternValid(template = '') {
	return (
		typeof template === 'string'
		&&
		/^[^.]+(\.[^.]+)*$/g.test(template)
	)
}

export function pattern2RegExp(template = '') {
	if (typeof template !== 'string') {
		throw new Error('Pattern must be a string')
	}

	const regExpBody = template.replaceAll(/\./g, '\\.')
		.replaceAll(/(?<=^|\\.)[*]{2}(?=$)/g, '[^$]+')
		.replaceAll(/(?<=^|\\.)[*]{1}(?=\\.|$)/g, '[^.]+')

	try {
		return new RegExp(`^${regExpBody}$`)
	} catch {
		throw new Error('Invalid pattern')
	}
}
