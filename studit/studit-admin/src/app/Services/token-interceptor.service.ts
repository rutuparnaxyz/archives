import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  


  constructor() { }

  intercept(req, next){
    let token = 'Bearer ' +localStorage.getItem('token');
    if(localStorage.getItem('auth')){
        token=localStorage.getItem('auth')
        localStorage.removeItem('auth')
      }
        
    
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization:  token
      }
    })

    return next.handle(tokenizedReq)
  }
}
