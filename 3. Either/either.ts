import { Either, left, match, right } from "fp-ts/lib/Either";
import { FrozenAccountException, InsufficientCreditException } from "./exceptions";
import { CreditCard } from "./interfaces";
import { pipe } from "fp-ts/lib/function";

const creditCard : CreditCard = {
	total : 3000,
	frozen : false,
};

const pay = (total : number) => (card : CreditCard) : Either<FrozenAccountException | InsufficientCreditException, CreditCard> => {
	if (card.total < total) {
		return left(new InsufficientCreditException("Insufficient credit."));
	}
	if (card.frozen) {
		return left(new FrozenAccountException("Frozen card."));
	}
	card.total = card.total - total;
	return right(card);
}

pipe (
	creditCard,
	pay(3500),
	match(
		(error : FrozenAccountException | InsufficientCreditException) => error.message,
		(card : CreditCard) => "Payment accepted.",
	)
)
