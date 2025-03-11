export class AuthService {

  loggedIn: boolean = false;

  isAutenticado():Promise<boolean> {
    
    const promise = new Promise<boolean>(
      (resolve, reject) => {
        setTimeout(
          () => {resolve(this.loggedIn)}
        ,800)
      }
    )

    return promise;
  }

  login(){
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }

  constructor() { }
}
