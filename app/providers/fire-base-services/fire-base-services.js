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
        this.user = this.dbRef.getAuth();
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

    signOut() {
        this.dbRef.unauth();
    }

}

