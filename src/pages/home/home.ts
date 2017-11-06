import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorePage} from '../store/store';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: any;
  options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

  

  constructor(public navCtrl: NavController, public camera: Camera) {

  }


  getShop(outlet){
    this.navCtrl.push(StorePage,outlet);
  }

  getCamera(){
    this.camera.getPicture(this.options).then(imageData => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
    }, (err) => {
      console.log(err);
    });
  }

  outlets = [
    {
      title : "NU Sentral",
      destination : "Kuala Lumpur",
      img : "http://images.says.com/uploads/brand/avatar/25/nusentralsaysprofile.jpg",
      shop : 
      [
        {
          img : "https://res-5.cloudinary.com/wlabs/image/fetch/c_pad,f_auto,q_auto/http://res.cloudinary.com/wlabs/image/upload/ogxlm9zwepnrxmdficjs.png",
          name : "4 Fingers Crispy Chicken",
          level : "CC 14"
        },
        {
          img : "https://www.a-saloon.com/wp-content/uploads/2017/08/gold-logo-2a.png",
          name : "A-Saloon",
          level : "L3 23"
        }
      ]
    }
  ];

}
