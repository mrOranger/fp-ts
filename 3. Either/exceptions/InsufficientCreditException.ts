export class InsufficientCreditException extends Error {
	public constructor(message : string) {
		super(message);
	}
}