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
        this.mylistings = [];
        this.toprecentItems = [];
        if (this.user) this.initQueries();
    }


    login(data){
        return new Promise((resolve, reject) => {
            this.dbRef.authWithPassword({
                email     : data.email,
                password  : data.password
            }, (error, userData) => {
                if (error) {
                    console.log("Error logging user:", error);
                    reject();
                } else {
                    this.userEmail = data.email;
                    console.log("Successfully logged user with uid:", userData.uid);
                    this.user = this.dbRef.getAuth();
                    this.initQueries();
                    resolve();
                }
            });
        })
    }

    signup(data){
        return new Promise((resolve, reject) => {
            this.dbRef.createUser({
                email    : data.email,
                password : data.password
            }, (error, userData) => {
                if (error) {
                    console.log("Error creating user:", error);
                    reject();
                } else {
                    this.usersRef.push().set({
                        name: data.name,
                        email : data.email,
                        phone: data.phone,
                        university : data.university,
                        rating: {
                            count: 0,
                            value: 0.0
                        }
                      });
                    this.initQueries();
                    this.user = this.dbRef.getAuth();
                    console.log("Successfully created user account with uid:", userData.uid);
                    resolve();
                }
            });
        })
    }

    signOut() {
        this.dbRef.unauth();
    }

    addItem(data){
        let d = new Date();
        let n = d.toLocaleString();
        this.itemsRef.push().set({
            title : data.itemname,
            category : data.category ,
            askingprice : data.initialprice,
            description : data.description,
            seller : this.user.password.email,
            bestoffer : 0,
            date : n,
            img: data.img
        });
    }
    initQueries() {
        this.usersRef.orderByChild('email').equalTo(this.user.password.email).on('value', snapshot => {
            console.log('user data callback');
            let data = snapshot.val();
            this.userData = data[Object.keys(data)[0]];
        });
        this.itemsRef.orderByChild('seller').equalTo(this.user.password.email).on('value', snapshot => {
            console.log('items data callback');
            this.mylistings=[];
            snapshot.forEach(dataChild => {
                this.mylistings.push(dataChild.val());
            });
        });
          this.itemsRef.orderByChild('date').limitToFirst(40).on('value', snapshot => {
            console.log('home items data callback');
            this.toprecentItems=[];
              snapshot.forEach(dataChild => {
                  this.toprecentItems.push(dataChild.val());
          });
            console.log(this.toprecentArray);
        });
    }

}

