import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'cam-login',
  templateUrl: './cam.page.html',
  styleUrls: ['./cam.page.scss'],
})
export class CamPage implements OnInit {
mediaFiles = [];
  captureVideoUrl : String;
  @ViewChild('myvideo',{static:false}) myVideo: any;
  constructor(public navCtrl: NavController, private mediaCapture: MediaCapture, private db: AngularFireDatabase, private firebaseApp: AngularFireStorage,private afStorage: Storage, private file: File, private media: Media) { }

  ngOnInit() {
  }

  ionViewDidLoad() {
    this.afStorage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    })
  }

   captureAudio() {
     this.mediaCapture.captureAudio().then(res => {
   //    this.storeMediaFiles(res);
     });
   }

  captureVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 10
    }
  this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
    let fpath = "D:\\Dev\\safeher\\SafeHer";
    let name = 'saveme';
    let path = fpath.replace(name, '');
    
    this.file.readAsDataURL(path, name).then(dataText=>{
   //set the var
      this.captureVideoUrl = dataText;
      let uploadtask = this.uploadVideo('Victor456');
        uploadtask.on('state_changed', (snapshot) => {

        }, (error: Error) =>{
      }, () =>{
          let url = uploadtask.snapshot.downloadURL;          
      })
    }).catch(err =>{
    });
  }).catch(err=>{
  })
}

uploadVideo(userId: string): firebase.storage.UploadTask{
  
  // Create a timestamp as filename
  const filename = userId;
  return this.afStorage.ref(`videos/${filename}.mp4`).putString(this.captureVideoUrl, firebase.storage.StringFormat.DATA_URL);
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
