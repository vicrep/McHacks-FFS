import {Page, NavController} from 'ionic-framework/ionic';

/*
  Generated class for the HomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}
