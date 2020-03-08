import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from "@angular/common/http";

import * as firebase from 'firebase';

import { SMS } from '@ionic-native/sms/ngx'
import { environment } from 'src/environments/environment';
import { MediaCapture} from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from 'angularfire2/storage';

// firebase.initializeApp(environment.firebaseConfig)
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule, 
    HttpClientModule,AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    NativeGeocoder,
    SMS,
    BackgroundMode,
    MediaCapture,
    Media,
    File,
    AngularFireStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
