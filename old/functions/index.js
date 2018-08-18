const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.database();
// For todays date;
Date.prototype.today = function() {
  return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function() {
  return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

exports.newUserSetup = functions.auth.user().onCreate((event) => {
  const user = event.data; // The Firebase user.
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  const uid = user.uid
  const userRef = db.ref("users/" + uid);
  userRef.set({
    info: {
      email: email,
      username: displayName,
      accountCreated: Date.now()
    },
    list: {
      items: [{
        done: false,
        message: 'Welcome To Stomp Rocket Todo'
      }, {
        done: false,
        message: 'An un finished task'
      }, {
        done: true,
        message: 'A finished task'
      }],
      utcTime: Date.now(),
      time: new Date().today() + " @ " + new Date().timeNow()
    }
  });
  console.log(user);
  return user
});