import * as O from 'fp-ts/Option';
import { pipe, not } from 'fp-ts/function';

export const valid: Predicate<Date> = x => not(Number.isNaN)(x.getTime());

export const fromString = (x: string): Option<Date> => pipe(
	new Date(x),
	O.fromPredicate(valid),
);

