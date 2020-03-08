import { Component, OnInit } from '@angular/core';

import { NavController, ToastController, Platform } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { ConnectionService } from 'src/app/services/connection.service';
// import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';




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
  textMessage =  "Hi I need your urgent help!";
  public onlineOffline: boolean = navigator.onLine;
  constructor(private toast: ToastController, public navCtrl: NavController, private sms: SMS,private connection:ConnectionService,
    // private backgroundMode: BackgroundMode
    private geolocation:Geolocation,
    private nativeGeocoder : NativeGeocoder,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundMode: BackgroundMode
    ) { 
    console.log(this.onlineOffline)
  }

  ngOnInit() {
  }
  async sendTextMessage()
  {
    try{

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

      await this.getGeolocation();
    }
    else
    {
      try{
        await this.sms.send(String(this.connection.GuardianList[0].PhoneNumber),this.textMessage);
      }
      catch(err){
        console.log(this.textMessage)
        alert(err)
      }
    }
  }catch(e){
    console.log(this.textMessage)
        alert(e)
  }
    
  }

  async sendTextMess()
  {
    try{
      await this.sms.send(String(this.connection.GuardianList[0].PhoneNumber),this.textMessage);
      alert(this.connection.GuardianList[0].PhoneNumber)
      alert(this.sms.send(String(this.connection.GuardianList[0].PhoneNumber),this.textMessage));
    }
    catch(err){
      console.log(this.textMessage)
      alert(err)
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

   async getGeolocation(){
      await this.geolocation.getCurrentPosition().then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      let x = this.textMessage + " my location details are as follows:     Latitude : "+ this.geoLatitude+",Longitude : "+this.geoLongitude;
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
  check()
  {
    this.initializeApp()
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backgroundMode.enable();
      if(this.backgroundMode.isActive){
        alert("background enabled");
        this.backgroundMode.moveToBackground()
        document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
      }
	
	function onVolumeDownKeyDown(){
    this.backgroundmode.moveToForeground();
    if(!this.backgroundMode.isActive){
      alert("background disabled");
    }
	}

    });
  }
}
