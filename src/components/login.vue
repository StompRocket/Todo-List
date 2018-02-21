<template>
<div id="login" class="page login">
  <div class="loginContainer">
    <h1>Login</h1>

    <!--
    <form v-on:submit.prevent="loginWithEmail" class="loginWithEmailForm">
      <input v-model="email" class="loginWithEmail" type="email" name="email" required value="" placeholder="Email">
      <input v-model="password" class="loginWithPassword" type="password" name="password" value="" placeholder="Password" required>
      <button class="submitBTN" type="submit" name="submit">Submit</button>

    </form>

    <h3>Or...</h3>

    <button class="googleBTN" @click="loginWithGoogle" type="button">Login With Google</button>

    <p>Don't have have an account? click here</p>

-->

  </div>

</div>
</template>
<script>
import '../assets/login.scss'
const firebase = require('firebase')
const swal = require('sweetalert2')
var provider = new firebase.auth.GoogleAuthProvider();
export default {
  name: "Login",
  data: () => ({
    email: '',
    password: '',
    newEmail: '',
    newPassword: ''
  }),
  created() {
    var user = firebase.auth().currentUser;

    if (user) {
      console.log('LOGIN loggedin');
      this.$router.push('app')
      // User is signed in.
    } else {
      console.log('LOGIN Loggedout');
      // No user is signed in.
    }
  },
  methods: {
    loginWithGoogle() {
      var user = firebase.auth().currentUser;
      if (user) {
        this.$router.push('app')
        // User is signed in.
      } else {
        firebase.auth().signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          this.$router.push('app')
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          this.error(errorCode, errorMessage)
          // ...
        });
      }

    },
    createWithEmail() {
      firebase.auth().createUserWithEmailAndPassword(this.newEmail, this.newPassword).then(() => {
        this.$router.push('app')
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.error(errorCode, errorMessage)
        // ...
      });

    },
    loginWithEmail() {

      console.log(this.email, this.password);
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.$router.push('app')
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.error(errorCode, errorMessage)
        // ...
      });

    },
    error(code, text) {
      swal({
        title: code,
        text: text,
        type: 'error',
        confirmButtonText: 'ok',
        target: '#login'
      })
    }
  }
}
</script>
