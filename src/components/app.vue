<template>
<div class="page app">
  <h1>My Todo List</h1>
  <p class="lastSaved">Last Saved: {{time}}</p>
  <div class="listContainer">
    <draggable class="list" v-model="list" :options="{draggable:'.item'}">
      <div v-for="item in list" class="item">
        <h3>{{item.heading}}</h3>
        <p>{{item.description}}</p>
      </div>

    </draggable>
    <button slot="footer">Add</button>
  </div>

</div>
</template>
<script>
import '../assets/app.scss'
import draggable from 'vuedraggable'

const firebase = require('firebase')
const swal = require('sweetalert2')

var provider = new firebase.auth.GoogleAuthProvider();
export default {
  name: "app",
  components: {
    draggable,
  },
  data: () => ({
    list: [],
    time: '',
    utcTime: ''

  }),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
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
        var userDBRef = firebase.database().ref('users/' + uid);

        userDBRef.on('value', (snapshot) => {
          console.log(snapshot.val());
          this.list = snapshot.val().list.items
          this.time = snapshot.val().list.time
          this.utcTime = snapshot.val().list.utcTime
        });
        // User is signed in.
      } else {
        console.log('app Loggedout');
        this.$router.push('login')
        // No user is signed in.
      }
    });
  }
}
</script>
