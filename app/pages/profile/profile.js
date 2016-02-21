import {Page, NavController} from 'ionic-framework/ionic';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services';
import {LoginPage} from '../login/login'

/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  constructor(nav: NavController, FireBaseServices: FireBaseServices) {
    this.nav = nav;
    this.fbdb = FireBaseServices;
    this.user = {
      name: 'Victor Repkow',
      email: 'victor.repkow@mail.mcgill.ca',
      rating: 4.2
    }
  }

  signOut() {
    this.fbdb.signOut();
    this.nav.rootNav.setRoot(LoginPage);
  }

}
