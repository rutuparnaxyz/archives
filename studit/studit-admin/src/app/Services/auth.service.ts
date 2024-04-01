import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url =  environment.apiUrl;

  constructor(
    private http:HttpClient,
    private _router: Router) { }


  
  login(loginmodel):Observable<any>{
    return this.http.post(this.url+'judge/login',loginmodel) .pipe(
      map(user => {           

        console.log(`login user is `,user);        
        // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('token',  user["token"].toString());
         localStorage.setItem('id',  user["data"].id.toString());
         localStorage.setItem('judgename',  user["data"].name.toString());


        return user;


      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('judgename');
    this._router.navigate(['/login']);
  }


  updateProfile(body){
    return this.http.put(this.url+'judge/update-profile',body)
  }

}
