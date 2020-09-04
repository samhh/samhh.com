export const isString: Refinement<unknown, string> = (x): x is string =>
	typeof x === 'string';

export const isEmpty: Predicate<string> = x => x === '';

