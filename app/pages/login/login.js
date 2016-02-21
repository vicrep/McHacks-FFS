import {Page, NavController} from 'ionic-framework/ionic';
import {SignupPage} from '../signup/signup';
import {MainViewPage} from '../main-view/main-view';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services'


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  constructor(nav: NavController, fireBaseServices: FireBaseServices) {
    this.fireBaseServices = fireBaseServices ;
    this.nav = nav;
    this.login = {};
    this.submitted = false;

    this.firebaseUrl = "https://ffsdb.firebaseio.com/";
  }

   onLogin(form) {

      this.submitted = true;
      if (form.valid) {       
        /* Authenticate User */  
        this.fireBaseServices.login(form.controls.username.value , form.controls.password.value)
        .then(() => {
      console.log("Sign In succeeded");
            this.nav.setRoot(MainViewPage);
        })
        .catch(() => {
          console.log("Sign IN failed");
        });
      }
    }

  onSignup() {
    this.nav.push(SignupPage);
  }

  // signin() {
  //   this.nav.setRoot(MainViewPage)
  // }
  // signup() {
  //   this.nav.push(SignupPage);
  // }
}
