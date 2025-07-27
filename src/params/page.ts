import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is string => {
	return /^page(\d+)$/.test(param)
}) satisfies ParamMatcher;
