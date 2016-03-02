import {Page, NavController, NavParams} from 'ionic-framework';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services';

/*
  Generated class for the CustomSearchResultsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/custom-search-results/custom-search-results.html',
})
export class CustomSearchResultsPage {
  constructor(nav: NavController, params: NavParams, fbdb: FireBaseServices) {
    this.nav = nav;
    this.params = params;
    this.items = this.params.get('items');
    this.fbdb = fbdb;
  }
}
