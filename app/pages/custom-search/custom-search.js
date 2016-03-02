import {Page, NavController} from 'ionic-framework';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services';
import {CustomSearchResultsPage} from '../custom-search-results/custom-search-results';

/*
  Generated class for the CustomSearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/custom-search/custom-search.html',
})
export class CustomSearchPage {
  constructor(nav: NavController, fbdb: FireBaseServices) {
    this.nav = nav;
    this.fbdb = fbdb;
    this.searchdata = {
      type: 'all',
      category: 'all',
      minprice: 0,
      maxprice: 0,
      searchstr: '',
      sort: 'newest'
    };
  }
  initializeItems() {
    this.items = this.fbdb.toprecentItems;
  }
  getItems() {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the search query
    var q = this.searchdata;

    this.items = this.items.filter((v) => {
      switch(q.type) {
        case 'all': break;
        case 'free': if(v.val().askingprice != 0) return false;
        case 'forsale': if(v.val().askingprice == 0) return false;
      };
      if(q.minprice > v.val().askingprice) return false;
      if(q.maxprice != 0 && q.maxprice < v.val().askingprice) return false;

      if (v.val().title.toLowerCase().indexOf(q.searchstr.toLowerCase()) < -1
          || v.val().description.toLowerCase().indexOf(q.searchstr.toLowerCase()) < -1) {
        return false;
      }
      return true;
    });
    this.nav.push(CustomSearchResultsPage, {items: this.items});
  }
}
