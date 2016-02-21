import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

/*
  Generated class for the FireBaseServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FireBaseServices {
  constructor(http: Http) {
    this.http = http;
    this.data = null;
    this.firebaseUrl = "https://ffsdb.firebaseio.com/";
    this.dbRef = new Firebase(this.firebaseUrl);
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

  login(emailV, passwordV){

    return new Promise((resolve, reject) => {
          this.dbRef.authWithPassword({
          email     : emailV,
          password  : passwordV
        }, (error, userData) => {
        if (error) {
          console.log("Error logging user:", error);
          reject();
        } else {
          console.log("Successfully logged user with uid:", userData.uid);
          resolve();
        }
    });
        })
  }

  signup(emailV, passwordV){

        return new Promise((resolve, reject) => {
          this.dbRef.createUser({
        email    : emailV,
        password : passwordV
      }, (error, userData) => {
        if (error) {
          console.log("Error creating user:", error);
          reject();
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          resolve();
        }
    });
        })

  }

  getFireBaseRef(){
    return this.dbRef;
  }
}

