import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController,Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

export class SessionDetail {
	constructor(private file: File,public  platform: Platform,){
	    this.platform = platform; 
		this.file = file; 
	}
	download(){
		if(this.platform.is('android')) {
			this.file.checkDir(this.file.dataDirectory, 'mydir').then(
				response => console.log(response)
			).catch(err => console.log(JSON.stringify(err)));
		}
	}
}
const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'cam-login',
  templateUrl: './cam.page.html',
  styleUrls: ['./cam.page.scss'],
})
export class CamPage implements OnInit {
mediaFiles = [];
  captureVideoUrl : string;
  test = firebase.storage()
  @ViewChild('myvideo',{static:false}) myVideo: any;
  constructor(private camera: Camera,public navCtrl: NavController, private mediaCapture: MediaCapture,private afStorage: Storage, private file: File, private media: Media) { }

  ngOnInit() {
  }

  async takePhoto(){
    try{
    const options: CameraOptions={
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    const result = await this.camera.getPicture(options);
    const image = await `data:image/jpeg;base64,${result}`;
    const pictures = await this.test.ref('pictures');
    await pictures.putString(image,'data_url'); 
  }catch(e){
    alert(e);
  }
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
    // let fpath = "D:\\Dev\\safeher\\SafeHer";
    // let name = 'saveme';
    // let path = fpath.replace(name, '');
    
    let capturedFile = res[0];
    let fileName = capturedFile.name;
    let dir = capturedFile['./'].split('/');
    dir.pop();
    let fromDirectory = dir.join('/');
    var toDirectory = this.file.dataDirectory;

    this.file.copyFile(fromDirectory,fileName,toDirectory,fileName).then((res)=>{
      this.storeMediaFiles([{name:fileName,size:capturedFile.size}]);
      alert(res);
    },
    (err)=>{
      alert(err);
    });
  },
    (err:CaptureError)=>{
      alert(err);
    });
  }
//     this.file.readAsDataURL(path, name).then(dataText=>{
//    //set the var
//       this.captureVideoUrl = dataText;
//       let uploadtask = this.uploadVideo('Victor456');
//         uploadtask.on('state_changed', (snapshot) => {
//           alert('Video Successfully Uploaded')
//         }, (error: Error) =>{
//           alert('Failed')
//       }, () =>{
//           let url = uploadtask.snapshot.downloadURL;          
//       })
//     }).catch(err =>{
//     });
//   }).catch(err=>{
//   })
// }

uploadVideo(userId: string): firebase.storage.UploadTask{
  
  // Create a timestamp as filename
  let StorageRef = firebase.storage().ref();
  const filename = userId;
  return StorageRef.child(`videos/${filename}.mp4`).putString(this.captureVideoUrl, firebase.storage.StringFormat.DATA_URL);
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

  storeMediaFiles(files) {
    alert(files);
    this.afStorage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.afStorage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.afStorage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
}
}
