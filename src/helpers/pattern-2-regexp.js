export default function pattern2RegExp(pattern = '') {
	if (typeof pattern !== 'string') {
		throw new Error('Pattern must be a string')
	}

	const regExpBody = pattern.replaceAll(/\./g, '\\.')
		.replaceAll(/(?<=^|\\.)[*]{2}(?=$)/g, '[^$]+')
		.replaceAll(/(?<=^|\\.)[*]{1}(?=\\.|$)/g, '[^.]+')

	try {
		return new RegExp(`^${regExpBody}$`)
	} catch {
		throw new Error('Invalid pattern')
	}
}
