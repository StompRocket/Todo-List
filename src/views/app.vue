<template>
  <div class="app page">
  <nav>
    <h1>SR TODO</h1>
     <router-link to="/settings" class="nav__settings">
     <img src="../assets/outline-settings-24px.svg">
     </router-link>
    </nav>
  <div class="welcome">
    <h1 class="welcome__heading">Welcome</h1>
    <p class="joke">{{joke}}</p>
  </div>
  <div class="listsContainer">
    <div class="list">
      <img class="menu" src="../assets/outline-more_vert-24px.svg" alt="menu">
      <div class="list__tasks">
        <p>Sleep</p>
        <p>Eat</p>
        <p class="done">be unproductive</p>
   
      </div>
      <h2>9 Tasks</h2>
      <h1>Personal</h1>
    </div>
    <div class="list">
      <img class="menu" src="../assets/outline-more_vert-24px.svg" alt="menu">
      <div class="list__tasks">
        <p>Make a good film</p>
        <p>Learn how to fly</p>
        <p class="done">Fart</p>
 
      </div>
     <h2>12 Tasks</h2>
      <h1>Home</h1>
    </div>
    <div class="list--new">
       <img src="../assets/outline-add_circle_outline-24px.svg" alt="">
    </div>
  </div>
 
  </div>
</template>

<script>
import firebase from "firebase"
import 'firebase/firestore';
export default {
  name: 'app',
  data() {
    return {
      email: 'Ronan',
      joke: 'loading...',
      user: {
        uid: null,
        email: null
      }
    }
  },
  mounted() {
    fetch('https://api.icndb.com/jokes/random?escape=javascript&exclude=[explicit]').then((resp) => resp.json()).then((data)=> {
        console.log(data)
        this.joke = data.value.joke
      }).catch((error)=> {
        this.joke = 'error'
      })
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged((user) =>{
    if (user) {
      // User is signed in.
      this.user = user
      db.collection(this.user.uid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
      });

    } else {
       this.user = false;
       this.$router.push('/')
    } 
});
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/vars.scss';

.listsContainer {
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: auto;
}
.list--new {
  padding: 5%;
  border-radius: $rounding;
  margin-left: auto;
  margin-right: auto;
  background-color: none;
  border: rgba(255, 255, 255, 0.92) solid 3px;
  width: 90vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2% 2%;
  flex-shrink: 0;
  color: $primary;
  align-items: center;

  img {
    display: block;
    -webkit-filter: invert(100%);
    width: 20%;
    height: auto;
  }
}
.list {
  @include card;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(255, 255, 255, 0.92);
  width: 90vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 2% 2%;
  flex-shrink: 0;
  color: $primary;
  h1 {
    font-size: 1.5em;
    font-weight: 400;
  }
  h2 {
    color: $primary--light;
    margin-bottom: 2%;
  }
  .menu {
    align-self: flex-end;
    opacity: 0.7;
  }
  .list__tasks {
    margin-bottom: auto;
    margin-top: auto;
    .done {
      text-decoration: line-through;
    }
  }
}
.app {
  color: white;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5vh 30vh auto;
  height: auto;
}
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10% 2%;
  color: $light;
  h1 {
    font-weight: 200;
  }
}
.nav__settings {
  text-decoration: none;
  color: white;
  margin-left: auto;
  fill: white;
  -webkit-filter: invert(100%);
  opacity: 0.8;
}
.welcome__heading {
  color: white;
  font-size: 1.7em;
  font-weight: 400;
}
.welcome {
  padding: 12% 5%;
  .joke {
    margin-top: 4%;
    font-size: 0.8em;
    font-weight: 100;
    color: $light;
  }
}
</style>
