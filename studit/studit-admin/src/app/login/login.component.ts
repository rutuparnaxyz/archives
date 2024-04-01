import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  loginModel = {
    "email":"",
    "password":""
}

 
  hide = true;
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(private auth: AuthService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigateByUrl('/dashboard');

    console.log('login model is',this.loginModel);
    // this.auth.login(this.loginModel).subscribe((data)=>{
    //   console.log(data);
    //   this.router.navigateByUrl('/dashboard');
    //   let judgeName = localStorage.getItem('judgename')
    //   this.toastr.success('Welcome Mr. '+judgeName);
      
    // },(error)=>{
    //   console.log(error);
      
    // })
    
  }
}
