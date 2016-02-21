import {Page, NavController, Alert} from 'ionic-framework/ionic';

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
    this.listingType = 'all';
  }
  makeBid(item) {
    let prompt = Alert.create();
    prompt.setTitle('Make a Bid');
    prompt.setSubTitle('Please enter your best offer for: ' + item);
    prompt.setMessage('Current highest offer: $10 (asking: $15)');
    prompt.addInput({
      type: 'number',
      name: 'amount',
      placeholder: 'Amount (whole)'
    });
    prompt.addButton({
      text: 'Cancel',
      handler: data => {
        console.log('Cancel clicked');
      }
    });
    prompt.addButton({
      text: 'Save',
      handler: data => {
        console.log('Saved clicked');
      }
    });
    this.nav.present(prompt);
  }
}
