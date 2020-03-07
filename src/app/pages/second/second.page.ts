import { Component, OnInit } from '@angular/core';

import { NavController, ToastController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { ConnectionService } from 'src/app/services/connection.service';


@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  phoneNumber = this.connection.GuardianList[0].PhoneNumber;
  textMessage =  "Hi I need your urgent help! my location details are as follows";
  public onlineOffline: boolean = navigator.onLine;
  constructor(private toast: ToastController, public navCtrl: NavController, private sms: SMS,private connection:ConnectionService) { 
    console.log(this.onlineOffline)
  }

  ngOnInit() {
  }
  sendTextMessage()
  {
    if(this.onlineOffline)
    {
      console.log("Internet hai")
    }
    else
    {
      try{
        this.sms.send(String(this.connection.GuardianList[0].PhoneNumber),this.textMessage);
        console.log("sent")
  
      }
      catch(err){
        console.log(this.textMessage)
      }
    }
    
  }
}
