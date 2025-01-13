import { Component, inject } from '@angular/core';
import { RegistrationRequestModel } from '../../models/registration-request.Model';
import { AuthenticationService } from '../../authentication.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  
  registerForm: RegistrationRequestModel = {username: '', password: '', email: ''};
  errorsMsg: Array<string> = [];

  protected readonly authenticationService = inject(AuthenticationService);
  protected readonly router = inject(Router);

  register(){
    this.errorsMsg = [];

    this.authenticationService.registrarUsuario(this.registerForm).subscribe( {
      next: (res) => {
        this.redirectToLogin();
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

  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
