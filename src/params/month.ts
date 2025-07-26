import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is string => {
	return /^(\d){2,2}$/.test(param)
}) satisfies ParamMatcher;
