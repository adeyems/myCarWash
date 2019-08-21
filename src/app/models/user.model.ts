export class UserModel {
    public surname: string;
    public name: string;

    constructor(
        public id: string,
        public email: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    get isAuth() {
        return !!this.token;
    }

    get token() {
        if (!this._token) {
            return null;
        }
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

    get timeToExpiry() {
        return this._tokenExpirationDate.getTime() - new Date().getTime();
    }

    get fullName() {
        return this.surname + " " + this.name;
    }
}
