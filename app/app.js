import {App, Platform} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {LoginPage} from './pages/login/login';
import {MainViewPage} from './pages/main-view/main-view';
import {FireBaseServices} from './providers/fire-base-services/fire-base-services';
import {Camera} from 'ionic-native/dist';
  
@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [FireBaseServices, Camera]

})
export class MyApp {
  constructor(@Inject(Platform) platform, FireBaseServices: FireBaseServices) {
    if(FireBaseServices.user) this.rootPage = MainViewPage;
    else this.rootPage = LoginPage;
    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });
  }
}
