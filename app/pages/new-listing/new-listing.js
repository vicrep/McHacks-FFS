import {Page, NavController} from 'ionic-framework/ionic';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services';
import {Camera} from 'ionic-native/dist';

/*
  Generated class for the NewListingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/new-listing/new-listing.html'
})
export class NewListingPage {
  constructor(nav: NavController, fireBaseServices: FireBaseServices, Camera: Camera) {
    this.nav = nav;
    this.fireBaseServices = fireBaseServices;
    this.newlisting = {
      listingType: 'free'
    };
    this.camera = Camera;

  }

  onAddingItem(form) {
    this.submitted = true;

    console.log(form);
       if (form.valid) {       
        /* Authenticate User */  
        if(form.controls.listingType.value == "free") this.newlisting.initialprice = 0;
           this.fireBaseServices.addItem(this.newlisting);

           this.nav.pop();
      }
  }

    addImg() {
        Camera.getPicture({destinationType: 0, correctOrientation: true}).then(data => this.newlisting.img = 'data:image/jpeg;base64,' + data);
    }
}
