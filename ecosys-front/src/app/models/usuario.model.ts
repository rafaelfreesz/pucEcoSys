export class Usuario{
    constructor(
        public login: string,
        public id: string,
        private _token: string,
        private _dt_hr_expira_token: Date
    ){}

    get token() {
        if(!this._dt_hr_expira_token || new Date() > this._dt_hr_expira_token){
            return null;
        }
        return this._token;
    }
}