import {Page, NavController} from 'ionic-framework';
import {CustomSearchPage} from '../custom-search/custom-search';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services';

/*
  Generated class for the FindPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/find/find.html',
})
export class FindPage {
  constructor(nav: NavController, fbdb: FireBaseServices) {
    this.nav = nav;
    this.searchQuery = '';
    this.fbdb = fbdb;
  }
  customSearch() {
    this.nav.push(CustomSearchPage);
  }
  initializeItems() {
    this.items = this.fbdb.toprecentItems;
  }
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    this.items = this.items.filter((v) => {
      if (v.val().title.toLowerCase().indexOf(q.toLowerCase()) > -1
      || v.val().description.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }
}
