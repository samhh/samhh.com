import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { not } from 'fp-ts/lib/function';

export const valid: Predicate<Date> = x => not(Number.isNaN)(x.getTime());

export const fromString = (x: string): Option<Date> => pipe(
	new Date(x),
	O.fromPredicate(valid),
);

