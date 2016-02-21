import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services';


/*
  Generated class for the ListingOffersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/listing-offers/listing-offers.html',
})
export class ListingOffersPage {
    constructor(nav: NavController, FireBaseServices: FireBaseServices) {
    this.nav = nav;
    this.fbdb = FireBaseServices;
  }
}
