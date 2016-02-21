import {Page, NavController} from 'ionic-framework/ionic';

/*
  Generated class for the NewListingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/new-listing/new-listing.html',
})
export class NewListingPage {
  constructor(nav: NavController) {
    this.nav = nav;
    this.data = {
      listingType: 'free'
    };
  }
}
