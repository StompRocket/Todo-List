<template>
  <div class="login page">
   <div class="loginContainer">
      <form @submit.prevent="login" class="login__form">
        <nav><h1 class="active link">Login</h1><router-link class="link" to="/signup">Signup</router-link></nav>
     
        <div class="loginForm__inputContainer">
        <input required type="email" placeholder="email" v-model="email">
        <input required type="password" placeholder="password" v-model="pass">
        <p class="loginForm__error">{{error}}</p>
        <a class="forgotPass" href="" @click.prevent="forgotPass"><i>forgot password?</i></a>
        </div>
        <button type="submit" class="btn loginForm__submit">Login</button>
      </form> 
   </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import "../assets/vars.scss"
export default {
  name: 'login',
  data() {
    return {
      email: '',
      pass: '',
      error: ''
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user)=> {
    if (user) {
       this.$router.push('/a')
    } else {
     // No user is signed in.
    }
  });
  },
  methods: {
    forgotPass() {
      firebase.auth().sendPasswordResetEmail(this.email).then(()=> {
        this.error = "Password Rest Email Sent"
      }).catch((error) =>{
        this.error = error.message
      });
    },
    login() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.pass).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code + error.message);
      this.error = `${errorCode} ${errorMessage}`
    });
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/vars.scss';
.login {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
.loginForm__error {
  color: red;
  font-weight: 400;
  margin-top: 2%;
  display: block;
  width: 100%;
  font-size: 0.8em;
}
.loginContainer {
  @include card;
  height: 90%;
  width: 90%;
  @include center;
  background-color: rgba(255, 255, 255, 0.92);
}
.login__form {
  display: flex;
  flex-direction: column;
  height: 100%;
  nav {
    display: flex;
    margin-top: 10%;
    margin-left: 5%;
  }
  .link.active {
    color: $primary;
    margin-right: 5%;
  }
  .link {
    text-decoration: none;
    font-size: 2em;
    font-weight: bold;
    color: $primary--hover;
    &:hover {
      color: $primary;
      @include transition;
    }
  }
}
.loginForm__inputContainer {
  margin-top: 40%;
  input {
    border-radius: 0px;
    display: block;
    border: none;
    border-bottom: 1px solid;
    border-bottom-color: $primary--hover;
    background: none;
    padding: 4% 0;
    width: 100%;
    font-size: 1em;
    @include transition;
    &:focus {
      outline: none;
      border-bottom-color: $primary;
    }
  }
}
.loginForm__submit {
  margin-top: auto;
  width: 100%;
}
.forgotPass {
  font-size: 0.6em;
  margin-top: 2%;
  text-align: right;
  color: $primary;
  float: right;
  text-decoration: underline;
}
</style>
