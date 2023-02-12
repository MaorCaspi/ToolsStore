import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
  export class LoginComponent implements OnInit {

    user = new User();
    @Output() loginDone = new EventEmitter<boolean>();
    isLoginDone:boolean;
  
    constructor(private authService: AuthService) {
      this.loginDone.emit(false);
      this.isLoginDone = false;
    }
    ngOnInit(){
      var token = localStorage.getItem('authToken');
      if (token && !this.authService.isTokenExpired(token)) {
        this.loginDone.emit(true);
        this.isLoginDone = true;
      }
    }

    loginForm = new FormGroup({
      username: new FormControl('',[Validators.required , Validators.pattern('[a-zA-Z0-9]+$'), Validators.maxLength(20)]),
      password: new FormControl('',[Validators.required , Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$')])
    })

    get username(){
      return this.loginForm.get('username');
    }

    get password(){
      return this.loginForm.get('password');
    }
  
    register(user: User) {
      this.authService.register(user).subscribe((token: string) => {
        localStorage.setItem('authToken', token);
        this.ngOnInit();
      },error => console.log('Register failed, the error message:', error.message)
      );
    }
  
    login(user: User) {
      this.authService.login(user).subscribe(
        (token: string) => {
        localStorage.setItem('authToken', token);
        this.ngOnInit();
      },error => console.log('Login failed, the error message:', error.message)
      );
    }
  
    logout() {
      localStorage.removeItem('authToken');
      this.loginDone.emit(false);
      this.isLoginDone = false;
    }
  
  }
  