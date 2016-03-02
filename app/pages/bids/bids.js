import {Page, NavController, Alert} from 'ionic-framework';
import {FireBaseServices} from '../../providers/fire-base-services/fire-base-services';


/*
  Generated class for the BidsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/bids/bids.html',
})
export class BidsPage {
    constructor(nav: NavController, FireBaseServices: FireBaseServices) {
    this.nav = nav;
    this.fbdb = FireBaseServices;
  }

  editBid(item) {
    let prompt = Alert.create();
    prompt.setTitle('Edit offer');
    prompt.setSubTitle('Please enter your best offer');
    prompt.addInput({
      type: 'number',
      name: 'amount',
      value: 10

  });
    prompt.addButton({
      text: 'Cancel',
      handler: data => {
      }
    });
    prompt.addButton({
      text: 'Save',
      handler: data => {
        this.fbdb.editOffer(data.amount, item);
      }
    });
    this.nav.present(prompt);
  }


}
