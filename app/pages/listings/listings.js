import {Page, NavController} from 'ionic-framework/ionic';
import {NewListingPage} from '../new-listing/new-listing';

/*
  Generated class for the ListingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/listings/listings.html',
})
export class ListingsPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
  newListing() {
    this.nav.push(NewListingPage);
  }
}
