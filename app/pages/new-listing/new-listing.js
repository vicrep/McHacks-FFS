import {Page, NavController} from 'ionic-framework/ionic';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services'

/*
  Generated class for the NewListingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/new-listing/new-listing.html',
})
export class NewListingPage {
  constructor(nav: NavController, fireBaseServices: FireBaseServices) {
    this.nav = nav;
    this.fireBaseServices = fireBaseServices;
    this.newlisting = {
      listingType: 'free'
    };
  }

  onAddingItem(form) {
    this.submitted = true;

    console.log(form);
       if (form.valid) {       
        /* Authenticate User */  
        if(form.controls.itemname.value == "free"){
             this.fireBaseServices.addItem(form.controls.itemname.value, 
                                      form.controls.category.value , 
                                      form.controls.initialprice.value,
                                      form.controls.description.value);
        }
        else{
           this.fireBaseServices.addFreeItem(form.controls.itemname.value, 
                                      form.controls.category.value , 
                                      form.controls.description.value);
        }
        this.nav.pop();
      }
  }
}
