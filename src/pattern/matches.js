import patternToRegExp from './to-regexp'

export default function matchesPattern(pattern = '', str = '') {
	return patternToRegExp(pattern).test(str)
}
