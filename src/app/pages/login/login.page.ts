import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
const validator = require('aadhaar-validator')

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ans: boolean;
  registerForm:FormGroup;

  constructor(private fb:FormBuilder,private router:Router) {

   }

  ngOnInit() {
      this.registerForm = this.fb.group({
      Name:'',
      Email:'',
      phoneNumber:'',
      Anumber:'',
    });
  }

  onSubmit()
  {
    console.log(this.registerForm.controls['Anumber'].value)
    if(validator.isValidNumber(String(this.registerForm.controls['Anumber'].value)))
    {
      this.router.navigateByUrl('/guardiandetails')
    }
    else
    {
      alert('Aadhar No not identified')
      
    }

    var newPostKey = firebase.database().ref().child('posts').push().key;
    firebase.database().ref('enroll/'+ newPostKey).set({
      name:this.registerForm.controls['Name'].value,
      email:this.registerForm.controls['Email'].value
    })
    alert("Sent")
  }
  

}
