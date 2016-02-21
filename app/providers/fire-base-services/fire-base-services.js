import {Injectable} from 'angular2/core';

/*
 Generated class for the FireBaseServices provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FireBaseServices {
    constructor() {
        this.data = null;
        this.userEmail = null;
        this.firebaseUrl = "https://ffsdb.firebaseio.com/";
        this.dbRef = new Firebase(this.firebaseUrl);
        this.usersRef = this.dbRef.child("users");
        this.itemsRef = this.dbRef.child("items");
        this.offersRef = this.dbRef.child("offers");
        this.user = this.dbRef.getAuth();
        this.mylistings = [];
        this.myconfirmedlistings = [];
        this.myinactivelistings = [];
        this.toprecentItems = [];
        this.myOffers = [];
        this.tempItem = null;
        this.listingoffers = [];
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
            active: true,
            title : data.itemname,
            category : data.category ,
            askingprice : data.initialprice,
            description : data.description,
            seller : this.user.password.email,
            bestoffer : 0,
            date : n,
            img: data.img, 
        });
    }
    addOffer(price, itemKey){
        let d = new Date();
        let n = d.toLocaleString();
        this.offersRef.push().set({
            active : true,
            offerprice : price,
            itemkey : itemKey ,
            buyer : this.user.password.email,
            date : n
        });
        //update the best offer of the item 
        this.itemsRef.child(itemKey).on('value', snapshot=> {
            let data = snapshot.val();
            if (data["bestoffer"] < price){
                this.itemsRef.child(itemKey).update({"bestoffer" : price});
            }
        });
    }
    editOffer(price, offerKey){
        //update the best offer of the item 
            this.offersRef.child(offerKey).update({"offerprice" : price});
    }
    deleteOffer(offerKey){
        //update the best offer of the item 
            this.offersRef.child(offerKey).remove();
    }
    getItem(itemKey){
          this.itemsRef.child(itemKey).on('value', snapshot=> {
            this.tempItem = snapshot.val();
        });
        return this.tempItem;
    }
    

    initQueries() {
        this.usersRef.orderByChild('email').equalTo(this.user.password.email).on('value', snapshot => {
            let data = snapshot.val();
            this.userData = data[Object.keys(data)[0]];
        });
        this.itemsRef.orderByChild('seller').equalTo(this.user.password.email).on('value', snapshot => {
            this.mylistings=[];
            this.myconfirmedlistings = [];
            this.myinactivelistings = [];
            snapshot.forEach(dataChild => {
                let val = dataChild.val();
                if (val.active) {
                    if(val.finaloffer) this.myconfirmedlistings.unshift(dataChild);
                    else this.mylistings.unshift(dataChild);
                }
                else this.myinactivelistings.unshift(dataChild);
            });
        });
          this.itemsRef.orderByChild('date').limitToFirst(40).on('value', snapshot => {
            let data = snapshot.val();
            this.toprecentItems=[];
            snapshot.forEach(dataChild => {
                if (dataChild.val().active) this.toprecentItems.push(dataChild);
          });
        });

        this.offersRef.orderByChild('buyer').equalTo(this.user.password.email).on('value', snapshot => {
            let data = snapshot.val();
            this.myOffers=[];

            snapshot.forEach(dataChild => {
                  if(dataChild.val().active==true){
                  this.myOffers.push(dataChild);
              }
          });
        });
    }
    getListingOffers(offerKey) {
        this.offersRef.orderByChild('itemkey').equalTo(offerKey).on('value', snapshot => {
            this.listingoffers = [];
            snapshot.forEach(dataChild => {
                this.listingoffers.unshift(dataChild);
            });
        })
    }
    acceptOffer(offer, key) {
        let listing = this.itemsRef.child(key);
        let sellerinfo = null;
        this.usersRef.orderByChild('email').equalTo(offer.val().buyer).on('value', snapshot => {
            let data = snapshot.val();
            let buyerinfo = data[Object.keys(data)[0]];
            listing.update({
                'finaloffer': {
                    price: offer.val().offerprice,
                    buyername: buyerinfo.name,
                    buyerphone: buyerinfo.phone,
                    sellername: this.userData.name,
                    sellerphone: this.userData.phone
                }
            });
        });

        
    }
}
