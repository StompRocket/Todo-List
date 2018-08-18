<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
import '../node_modules/minireset.css/minireset.min.css'
import './assets/global.css'
var firebase = require('firebase')
var config = {
  apiKey: "AIzaSyDnagmlyOEza2stBcjWwql9Bjq6x6j8jZc",
  authDomain: "list-40a3a.firebaseapp.com",
  databaseURL: "https://list-40a3a.firebaseio.com",
  projectId: "list-40a3a",
  storageBucket: "list-40a3a.appspot.com",
  messagingSenderId: "866203114923"
};
firebase.initializeApp(config);
export default {
  name: 'App',
  data: () => ({
    uid: ''

  }),
}
</script>
