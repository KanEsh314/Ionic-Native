import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

	@ViewChild('map') mapElement: ElementRef;
  
  map: any;
  place: String;
  screen: any;

  lat: any;
  lng: any;

  constructor(public screenShoot: Screenshot ,public navCtrl: NavController, public navParams: NavParams, public geoLoc: Geolocation, public toastCtrl: ToastController, public neoGeocoder: NativeGeocoder, public socialShare: SocialSharing) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    this.geoLoc.getCurrentPosition().then(resp => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

      //Native GeoCoder
      this.neoGeocoder.reverseGeocode(resp.coords.latitude,resp.coords.longitude)
      .then((result: NativeGeocoderReverseResult) => {
        this.place = result.subLocality+" "+result.locality+" "+result.countryName;
      }).catch((err) => {
        console.log(err);
      });

      let latLng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      
         let mapOptions = {
           center: latLng,
           zoom: 17,
           mapTypeId: google.maps.MapTypeId.ROADMAP
         }
      
         this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    },(err) => {
      console.log(err);
    });
  }

  addMarker(){
    
     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: {
         lat : this.lat,
         lng : this.lng
       }
     });
    
     let content = "<h4>Information!</h4>";         
    
     let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'center_changed', () => {
      infoWindow.open(this.map, marker);
    });
    
   }

   getShare(){
     this.screenShoot.URI(80).then(res => {
       this.screen = res.URI;
       this.socialShare.shareViaWhatsApp("I'm at "+this.place,this.screen).then(() => {

       },(err) => {

       });
     },(err) => {
       console.log(err);
     });
   }
}
