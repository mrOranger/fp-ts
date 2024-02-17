export class FrozenAccountException extends Error {
	public constructor(message : string) {
		super(message);
	}
}