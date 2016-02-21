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
        this.userEmail = null;
        this.firebaseUrl = "https://ffsdb.firebaseio.com/";
        this.dbRef = new Firebase(this.firebaseUrl);
        this.usersRef = this.dbRef.child("users");
        this.itemsRef = this.dbRef.child("items");
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
                    this.userEmail = emailV;
                    console.log("Successfully logged user with uid:", userData.uid);
                    resolve();
                }
            });
        })
    }

    signup(emailV, passwordV, universityV){


        return new Promise((resolve, reject) => {
            this.dbRef.createUser({
                email    : emailV,
                password : passwordV
            }, (error, userData) => {
                if (error) {
                    console.log("Error creating user:", error);
                    reject();
                } else {
                    this.usersRef.push().set({
                        email : emailV,
                        university : universityV
                      });
                    console.log("Successfully created user account with uid:", userData.uid);
                    resolve();
                }
            });
        })

    }

    signOut() {
        this.dbRef.unauth();
    }

    addItem(title, category, intitialPrice, isBid, description){
        this.itemsRef.push().set({
            title : title,
            category : category ,
            intitialPrice : intitialPrice,
            isBid : isBid,
            description : description,
            seller : this.userEmail
        });
    }
    addFreeItem(title, category, description){
        this.itemsRef.push().set({
            title : title,
            category : category ,
            intitialPrice : 0,
            isBid : false,
            description : description,
            seller : this.userEmail
        });
    }
    getMyListings(){
        
    }

}

