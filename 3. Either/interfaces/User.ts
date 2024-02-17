export class User {

	public constructor(
		private _firstName : string,
		private _lastName : string,
	) { }

	public get firstName () : string {
		return this._firstName;
	}

	public get lastName () : string {
		return this._lastName;
	}

	public set firstName (value : string) {
		if (value.length > 1) {
			this._firstName = value;
		}
	}

	public set lastName (value : string) {
		if (value.length > 1) {
			this._lastName = value
		}
	}
}