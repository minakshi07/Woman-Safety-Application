import { Component, OnInit } from '@angular/core';
const validator = require('aadhaar-validator')

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ans: boolean;

  constructor() { }

  ngOnInit() {
  }

  register()
  {
    this.ans=validator.isValidNumber('234123412346')
    console.log(this.ans)
    alert(this.ans)
  }
  

}
