import {Page, NavController} from 'ionic-framework/ionic';
import {SignupPage} from '../signup/signup';
import {MainViewPage} from '../main-view/main-view';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }

  signin() {
    this.nav.setRoot(MainViewPage)
  }
  signup() {
    this.nav.push(SignupPage);
  }
}
