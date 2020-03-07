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
  textMessage =  "Hi please help me. It's an emergency. My location details are attached ";
  constructor(private toast: ToastController, public navCtrl: NavController, private sms: SMS,private connection:ConnectionService) { }

  ngOnInit() {
  }
  async sendTextMessage()
  {
    try{
      await this.sms.send(String(this.connection.GuardianList[0].PhoneNumber),this.textMessage);
      console.log("sent")
      const toast = this.toast.create({
        message:'text was sent!',
        duration: 3000
      });
      (await toast).present();

    }
    catch(err){
      console.log(this.textMessage)
      const toast= this.toast.create({
        message:String(this.phoneNumber),
        duration: 3000
      });
      (await toast).present();
    }
  }
}
