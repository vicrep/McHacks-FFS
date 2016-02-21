import {Page, NavController} from 'ionic-framework/ionic';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services'
import {MainViewPage} from '../main-view/main-view';
import {LoginPage} from '../login/login';




/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
  constructor(nav: NavController, fireBaseServices: FireBaseServices) {
    this.nav = nav;
    this.fireBaseServices = fireBaseServices;

    this.signup = {};
    this.submitted = false;
  }

  onSignup(form) {
    this.submitted = true;

    console.log(form);

    if (form.valid) {
    	 if (form.valid) {       
        /* Authenticate User */  
        this.fireBaseServices.signup(form.controls.emailaddress.value, form.controls.password.value , form.controls.university.value)
        .then(() => {
			console.log("SignUp Succeeded");
            this.nav.setRoot(LoginPage);
        })
        .catch(() => {
        	console.log("SignUp Failed");
        });
      }
    }
  }
}
