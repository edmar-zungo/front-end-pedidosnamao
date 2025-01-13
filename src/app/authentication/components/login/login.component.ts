import { Component, inject, NgModule } from '@angular/core';
import { AuthenticationRequestModel } from '../../models/authentication-request.model';
import { AuthenticationService } from '../../authentication.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [NgModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: AuthenticationRequestModel = {password: '', username: ''};
  errorsMsg: Array<string> = [];

  protected readonly authenticationService = inject(AuthenticationService);
  protected readonly router = inject(Router);
  login(){
    this.errorsMsg = [];

    this.authenticationService.login(this.loginForm).subscribe( {
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['cardapios']);
      },
      error: (err) => {
       if(err.error.validationErrors){
        this.errorsMsg = err.error.validationErrors;
       } else {
       
        this.errorsMsg.push(err.error.error);
       }


       setInterval(() => { this.errorsMsg = [] }, 5000);
      }
    })

  }

  redirectToRegister() {
    this.router.navigate(['register']);
  }
}
