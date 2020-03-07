import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';


@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  constructor(public navCtrl: NavController,private smsVar: SMS) { }

  ngOnInit() {
  }
  sendUserData(){
    var options={
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
           intent: 'INTENT'  // Opens Default sms app
          //intent: '' // Sends sms without opening default sms app
        }
}
    this.smsVar.send('9819743332', 'Hello world!',options)
      .then((res)=>{
        alert("success");
      },(err)=>{
      alert(err);
      });
    }
 

}
