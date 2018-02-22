<template>
<div class="page app">
  <h1>My Todo List</h1>
  <p class="lastSaved">Last Saved: {{fbList.time}}</p>
  <div class="listContainer">
    <draggable class="list" v-model="fbList.items" :options="{draggable:'.item'}">
      <div v-bind:class="{ compleated: item.done }" v-for="item in fbList.items" class="item">
        <div class="text">
          <h3>{{item.heading}}</h3>
          <p>{{item.description}}</p>

        </div>
        <input v-model="item.done" type="checkbox">
      </div>

    </draggable>
    <input v-model="newItem" class="newItem" slot="footer" placeholder="New Item" @keyup.enter="addNewItem">
  </div>

</div>
</template>
<script>
import '../assets/app.scss'
import draggable from 'vuedraggable'

const firebase = require('firebase')
const swal = require('sweetalert2')

var provider = new firebase.auth.GoogleAuthProvider();
var db = firebase.database()
Date.prototype.today = function() {
  return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function() {
  return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}
export default {
  name: "app",
  components: {
    draggable,
  },
  firebase: function() {
    return {
      fbList: firebase.database().ref('users/' + firebase.auth().currentUser.uid).child('list')
    }
  },
  data: () => ({
    localList: [],
    time: '',
    utcTime: '',
    newItem: ''

  }),
  created() {
    console.log(this.$parent.uid, 'parrent');
    var user = firebase.auth().currentUser;


    if (user) {
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
      }
      this.$parent.uid = uid
      var userDBRef = firebase.database().ref('users/' + uid);


      this.$bindAsObject('fbList', userDBRef.child('list'))
      // User is signed in.
    } else {
      console.log('app Loggedout');
      this.$router.push('login')
      // No user is signed in.
    }

  },
  computed: {
    uid: function() {
      console.log('Local uid check');
      return this.$parent.uid
    }
  },
  methods: {
    addNewItem() {
      console.log('adingNewitem');
      this.$firebaseRefs.fbList.items.unshift({
        heading: this.newItem,
        done: false,
        description: 'add a description'
      })
      this.newItem = ''
    }
  }
}
</script>
