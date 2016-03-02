import {Page, NavController, NavParams} from 'ionic-framework';
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
  constructor(nav: NavController, params: NavParams, fbdb: FireBaseServices) {
    this.nav = nav;
    this.params = params;
    this.name = this.params.get('name');
    this.key = this.params.get('listingkey');
    this.fbdb = fbdb;
  }

  acceptOffer(offer, key) {
    this.fbdb.acceptOffer(offer, key);
    this.nav.pop();
  }
}
