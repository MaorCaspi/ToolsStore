import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoginDone:boolean = false;

  loginDone(val: boolean) {
    this.isLoginDone = val;
  }
}
