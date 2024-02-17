import { Either, tryCatch } from "fp-ts/lib/Either";

import { FrozenAccountException, InsufficientCreditException } from "../exceptions";
import { Account } from "../interfaces/Account";

export class PaymentOption {
	public pay (amout : number) : (account : Account) => Either<string, Account> {
		return (account : Account) => {
			return tryCatch(
				() => {
					if (account.balance > amout) {
						if (!account.isFrozen) {	
							account.balance = account.balance - amout;
							return account;
						}
						throw new FrozenAccountException('Frozen account.');
					}
					throw new InsufficientCreditException('Insufficient credit');
				},
				(exception) => {
					if (exception instanceof InsufficientCreditException || exception instanceof FrozenAccountException) {
						return exception.message;
					}
					return 'Unknown exception.';
				}
			);
		}
	}
}