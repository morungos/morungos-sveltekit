import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is string => {
	return /^(\d){4,4}$/.test(param)
}) satisfies ParamMatcher;
