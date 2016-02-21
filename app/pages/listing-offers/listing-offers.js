import {Page, NavController, NavParams} from 'ionic-framework/ionic';

/*
  Generated class for the ListingOffersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/listing-offers/listing-offers.html',
})
export class ListingOffersPage {
  constructor(nav: NavController, params: NavParams) {
    this.nav = nav;
    this.params = params;
    this.offers = this.params.get('offers');
  }
}
