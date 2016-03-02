import {Page, NavController} from 'ionic-framework';
import {NewListingPage} from '../new-listing/new-listing';
import {ListingOffersPage} from '../listing-offers/listing-offers';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services';


/*
  Generated class for the ListingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/listings/listings.html',
})
export class ListingsPage {
  constructor(nav: NavController, FireBaseServices: FireBaseServices) {
    this.nav = nav;
    this.fbdb = FireBaseServices;
  }
  newListing() {
    this.nav.push(NewListingPage);
  }

  viewOffers(data) {
    this.fbdb.getListingOffers(data.key());
    this.nav.push(ListingOffersPage, {name: data.val().title, listingkey: data.key()});
  }
  getKeys (yourlist){
    return Object.keys(yourlist);
  }

}
