import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDnagmlyOEza2stBcjWwql9Bjq6x6j8jZc",
  authDomain: "list-40a3a.firebaseapp.com",
  databaseURL: "https://list-40a3a.firebaseio.com",
  projectId: "list-40a3a",
  storageBucket: "list-40a3a.appspot.com",
  messagingSenderId: "866203114923"
};
firebase.initializeApp(config);


Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next('/');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
