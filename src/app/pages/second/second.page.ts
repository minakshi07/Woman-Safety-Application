import { Component, OnInit } from '@angular/core';

import { NavController, ToastController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';


@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  phoneNumber: 981974333;
  textMessage: "Hi I need your urgent help! my location details are as follows";
  constructor(private toast: ToastController, public navCtrl: NavController, private sms: SMS) { }

  ngOnInit() {
  }
  async sendTextMessage()
  {
    try{
      await this.sms.send(String(this.phoneNumber),this.textMessage);
      const toast = this.toast.create({
        message:'text was sent!',
        duration: 3000
      });
      (await toast).present();

    }
    catch(e){
      const toast= this.toast.create({
        message:"Text not sent!",
        duration: 3000
      });
      (await toast).present();
    }
  }
}
