import { Component, OnInit } from '@angular/core';

import { NavController, ToastController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { ConnectionService } from 'src/app/services/connection.service';
// import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  geoLatitude: number;
  geoLongitude: number;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  phoneNumber = this.connection.GuardianList[0].PhoneNumber;
  textMessage =  "Hi I need your urgent help! my location details are as follows";
  public onlineOffline: boolean = navigator.onLine;
  constructor(private toast: ToastController, public navCtrl: NavController, private sms: SMS,private connection:ConnectionService,
    // private backgroundMode: BackgroundMode
    private geolocation:Geolocation,
    private nativeGeocoder : NativeGeocoder
    ) { 
    console.log(this.onlineOffline)
  }

  ngOnInit() {
  }
  sendTextMessage()
  {
    if(this.onlineOffline)
    {
      console.log("Internet hai")
      // try{
      //     console.log(this.connection.GuardianList[0].PhoneNumber)
      //     this.sms.send(String(this.connection.GuardianList[0].PhoneNumber),this.textMessage);
      //     alert("sent")
      //     console.log(this.geoLatitude)
      //     console.log(this.geoLongitude) 
      // }
      // catch(err){
      //   console.log(err)
      //   alert("Message Not Sent")
      //   console.log(this.geoLatitude)
      //   console.log(this.geoLongitude)
      // }

      this.getGeolocation();
    }
    else
    {
      try{
        this.sms.send(String(this.connection.GuardianList[0].PhoneNumber),this.textMessage);
        alert("sent")  
      }
      catch(err){
        console.log(this.textMessage)
        alert("Message Not Sent")
      }
    }
    
  }

  test(x)
  {
    try{
      this.sms.send(String(this.connection.GuardianList[0].PhoneNumber),x);
      alert(x)  
    }
    catch(err){
      console.log(this.textMessage)
      alert("Message Not Sent")
    }
  }

   getGeolocation(){
      this.geolocation.getCurrentPosition().then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      let x = this.textMessage + "     Latitude : "+ this.geoLatitude+",Longitude : "+this.geoLongitude;
      this.test(x);
     }).catch((error) => {
       alert('Error getting location'+ JSON.stringify(error));
     });
  }

  // getGeoencoder(latitude,longitude){
  //   this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
  //   .then((result: NativeGeocoderResult[]) => {
  //   })
  //   .catch((error: any) => {
  //     alert('Error getting location'+ JSON.stringify(error));
  //   });
  // }
  
}
