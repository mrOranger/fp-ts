import { Option } from "fp-ts/lib/Option";
import { CreditCard } from "./CreditCard";
import { User } from "./User";
import { Either, tryCatch } from "fp-ts/lib/Either";

export class Account {

	public constructor (
		private user : User,
		private creditCard : CreditCard,
	) {}

	public get balance () : number {
		return this.creditCard.total;
	}

	public set balance (amout : number) {
		this.creditCard.total = this.creditCard.total - amout;
	}

	public get isFrozen () : boolean {
		return this.creditCard.frozen;
	}

	public get info () : string {
		return `
			${this.user.firstName} ${this.user.lastName} ${
				this.creditCard.frozen 
					? `Frozen account`
					: this.creditCard.total
			}
		`;
	}
}