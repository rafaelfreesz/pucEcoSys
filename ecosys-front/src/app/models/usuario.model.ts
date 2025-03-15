export class Usuario{
    constructor(
        public login: string,
        public id: number,
        private _categoria: string,
        private _token: string,
        private _dt_hr_expira_token: Date
    ){}

    get token() {
        if(!this._dt_hr_expira_token || new Date() > this._dt_hr_expira_token){
            return null;
        }
        return this._token;
    }

    get categoria(){
        return this._categoria;
    }

    set categoria(cat){
        this._categoria = cat
    }
}