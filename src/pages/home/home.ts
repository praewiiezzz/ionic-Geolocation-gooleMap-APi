import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  latitude = 0;
  longitude = 0;

  // Get #map element
  @ViewChild('map') mapElement: ElementRef;

  // Google Map object
  map: any;

  constructor(public navCtrl: NavController
    , public loadingCtrl: LoadingController
    , public geolocation: Geolocation) {

  }

  getLocation() {

    let loadOption = {
      spinner: 'circles'  // อันที่เราเลือก
      , content: 'รอพี่ก่อนหนา ออเจ้า'
    }

    let loader = this.loadingCtrl.create(loadOption);
    loader.present();


    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      let accuracy = resp.coords.accuracy;

      alert(this.latitude + ' ' + this.longitude + ', accuracy: ' + accuracy);

      let latLng = new google.maps.LatLng(this.latitude, this.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP  // แล้วแต่ว่าอยากเห็นแผนที่อะไร
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      // 59-63 call marker
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      // https://developers.google.com/maps/documentation/javascript/examples/layer-traffic
      let trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(this.map);

      loader.dismiss();
    });
  }
}

