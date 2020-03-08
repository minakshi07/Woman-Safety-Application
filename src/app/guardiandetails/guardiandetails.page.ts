import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guardian } from '../models/Guardian';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-guardiandetails',
  templateUrl: './guardiandetails.page.html',
  styleUrls: ['./guardiandetails.page.scss'],
})
export class GuardiandetailsPage implements OnInit { 

  guardianForm : FormGroup;
  constructor(private fb:FormBuilder,private connection:ConnectionService) {
    this.guardianForm = this.fb.group({
      Name: '',
      Email: '',
      PhoneNumber:''
    })
   }

  ngOnInit() {
  }

  OnSubmit()
  {
    console.log(this.guardianForm)
    let val : Guardian = {
      Name : this.guardianForm.controls['Name'].value,
      Email : this.guardianForm.controls['Email'].value,
      PhoneNumber : this.guardianForm.controls['PhoneNumber'].value,
    }
    console.log(val)
    this.connection.GuardianList.push(val)
    console.log(this.connection.GuardianList)
  }
}
