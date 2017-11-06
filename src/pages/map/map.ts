import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
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

  constructor(public screenShoot: Screenshot ,public navCtrl: NavController, public navParams: NavParams, public geoLoc: Geolocation, public toastCtrl: ToastController, public neoGeocoder: NativeGeocoder, public socialShare: SocialSharing) {
    
  }

  pinnedMaps = [
    {
      lat: 4.775712,
      lng: 100.938608 
    },
    {
      lat: 4.767952,
      lng: 100.934802 
    }
  ];

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    this.geoLoc.getCurrentPosition().then(resp => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);

      this.neoGeocoder.reverseGeocode(resp.coords.latitude,resp.coords.longitude)
      .then((result: NativeGeocoderReverseResult) => {
        this.place = result.locality + "" + result.subLocality;
      }).catch((err) => {
        console.log(err);
      });

      let latLng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      
         let mapOptions = {
           center: latLng,
           zoom: 15,
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
        lat: this.pinnedMaps[0].lat,
        lng: this.pinnedMaps[0].lng
       }
     });
    
     let content = "<h4>Information!</h4>";         
    
     this.addInfoWindow(marker, content);
    
   }

   addInfoWindow(marker, content){
    
     let infoWindow = new google.maps.InfoWindow({
       content: content
     });
    
     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });
    
   }

   getShare(){
     this.toastCtrl.create({
       message: "I'm At"+this.place,
       duration: 5000 
     });

     this.screenShoot.URI(80).then(res => {
       this.screen = res.URI;
     },(err) => {
       console.log(err);
     });
   }
}
