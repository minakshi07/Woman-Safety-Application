import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'cam-login',
  templateUrl: './cam.page.html',
  styleUrls: ['./cam.page.scss'],
})
export class CamPage implements OnInit {
  mediaFiles = [];
  @ViewChild('myvideo',{static:false}) myVideo: any;
  constructor(public navCtrl: NavController, private mediaCapture: MediaCapture, private storage: Storage, private file: File, private media: Media) { }

  ngOnInit() {
  }


  // captureAudio() {
  //   this.mediaCapture.captureAudio().then(res => {
  //   });
  // }

  captureVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 10
    }
  this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
    let capturedFile = res[0];
    let fileName = capturedFile.name;
    let dir = capturedFile['localURL'].split('/');
    dir.pop();
    let fromDirectory = dir.join('/');      
    var toDirectory = this.file.dataDirectory;
    
    this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
    },err => {
      console.log('err: ', err);
    });
        },
  (err: CaptureError) => console.error(err));
}

play(myFile) {
  if (myFile.name.indexOf('.wav') > -1) {
    const audioFile: MediaObject = this.media.create(myFile.localURL);
    audioFile.play();
  } else {
    let path = this.file.dataDirectory + myFile.name;
    let url = path.replace(/^file:\/\//, '');
    let video = this.myVideo.nativeElement;
    video.src = url;
    video.play();
  }
  }
}
