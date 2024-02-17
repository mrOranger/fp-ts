import { match } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { Account } from "./interfaces/Account";
import { PaymentOption } from "./interfaces/PaymentOption";
import { User } from "./interfaces/User";

export class TryCatch {

	public constructor (
		private account : Account,
		private paymentOption : PaymentOption,
	) {}

	public run () : string {
		return pipe(
			this.account,
			this.paymentOption.pay(1000),
			match(
				(exception : string) => `An exception has been thrown ... ${exception}`,
				(account : Account) => account.info,
			)
		)
	}
}

const component = new TryCatch(
	new Account(
		new User ('Mario', 'Rossi'),
		{
			total : 10000,
			frozen : false,
		}
	),
	new PaymentOption()
);

console.log(component.run());