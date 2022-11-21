import pattern2RegExp from './pattern-2-regexp'

export default function matchesPattern(pattern = '', str = '') {
	return pattern2RegExp(pattern).test(str)
}
