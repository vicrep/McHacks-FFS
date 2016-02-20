import {NavController, Page} from 'ionic-framework/ionic';
import {HomePage} from '../home/home';
import {FindPage} from '../find/find';
import {BidsPage} from '../bids/bids';
import {ListingsPage} from '../listings/listings';
import {ProfilePage} from '../profile/profile';


@Page({
  templateUrl: 'build/pages/main-view/main-view.html'
})
export class MainViewPage {
  constructor(nav: NavController) {
    // set the root pages for each tab
    this.tab1Root = HomePage;
    this.tab2Root = FindPage;
    this.tab3Root = BidsPage;
    this.tab4Root = ListingsPage;
    this.tab5Root = ProfilePage;
    
  }
}
