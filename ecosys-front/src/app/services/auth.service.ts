import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  
  loggedIn: boolean = false;
  
  constructor(private httpCliente: HttpClient) { }

  isAutenticado():Promise<boolean> {
    
    const promise = new Promise<boolean>(
      (resolve, reject) => {
        setTimeout(
          () => {resolve(this.loggedIn)}
        ,2)
      }
    )

    return promise;
  }

  login(data: any){
    return this.httpCliente.post<any>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwXFCCL9yibFpDMUf16u-h6hPWA25gFZo`,
        { email:	data.email,
          password:	data.password,
          returnSecureToken: true
        }
      )
      // this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }

}
