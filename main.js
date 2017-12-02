function init () {
  if (localStorage.getItem('todoList')) {
    if (app.loginState) {
      firebase.database().ref('/users/' + app.user.uid + '/list/').once('value').then(function (snapshot) {
        if (snapshot.val().items) {
          if (snapshot.val().utcTime > JSON.parse(localStorage.getItem('lastSavedUtc'))) {
            app.items = snapshot.val().items
            app.lastSaved = snapshot.val().time
            console.log('from firebase')
          } else {
            app.items = JSON.parse(localStorage.getItem('todoList'))
            app.lastSaved = JSON.parse(localStorage.getItem('lastSaved'))
            console.log('from local')
          }
        } else {
          app.items = JSON.parse(localStorage.getItem('todoList'))
          app.lastSaved = JSON.parse(localStorage.getItem('lastSaved'))
        }
      })
    }
    app.items = JSON.parse(localStorage.getItem('todoList'))
    app.lastSaved = JSON.parse(localStorage.getItem('lastSaved'))
  } else {
    if (app.loginState) {
      firebase.database().ref('/users/' + app.user.uid + '/list/').once('value').then(function (snapshot) {
        if (snapshot.val().items) {
          app.items = snapshot.val().items
          app.lastSaved = snapshot.val().time
        }
      })
    } else {
      app.items.push({
        message: 'Welcome To List',
        done: false
      })
      app.items.push({
        message: 'Login or create an account',
        done: false
      })
      app.items.push({
        message: 'A completed task',
        done: true
      })
    }
  }
}

try {
  var provider = new firebase.auth.GoogleAuthProvider()
  var database = firebase.database()
  var app = new Vue({
    el: '#app',
    data: {
      viewMode: 'all',
      loginText: 'Login',
      loginState: false,
      newItem: '',
      items: [],
      lastSaved: 'none',
      user: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        uid: null
      }
    },
    computed: {

      noItems: function () {
        if (this.items.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    mounted: function () {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          app.loginText = 'Logout'
          app.loginState = true
          app.user.name = user.displayName
          app.user.email = user.email
          app.user.photoUrl = user.photoURL
          app.user.emailVerified = user.emailVerified
          app.user.uid = user.uid
          firebase.database().ref('users/' + user.uid + '/info/').set({
            username: user.displayName,
            email: user.email,
            profile_picture: user.photoURL,
            lastSeen: app.getDate()
          })
          init()

          firebase.database().ref('users/' + user.uid + '/list/').on('value', function (snapshot) {
            init()
          })
        } else {
          app.loginText = 'Login'
          app.loginState = false
          init()
        }
      })
    },
    methods: {
      viewActive: function () {
        app.viewMode = 'active'
      },
      viewAll: function () {
        app.viewMode = 'all'
      },
      login: function () {
        var user = firebase.auth().currentUser

        if (user) {
  // User is signed in.
          firebase.auth().signOut().then(function () {
  // Sign-out successful.
          }).catch(function (error) {
  // An error happened.
          })
        } else {
  // No user is signed in.
          firebase.auth().signInWithPopup(provider).then(function (result) {
// This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken
// The signed-in user info.
            var user = result.user

// ...
          }).catch(function (error) {
// Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
// The email of the user's account used.
            var email = error.email
// The firebase.auth.AuthCredential type that was used.
            var credential = error.credential
// ...
          })
        }
      },
      getUtc: function () {
        return new Date().getTime()
      },
      getDate: function () {
        return new Date().toLocaleString()
      },

      update: function () {
         // console.log(JSON.stringify(this.items))
        let saveTime = app.getDate()
        let utcSaveTime = app.getUtc()
        window.localStorage.setItem('todoList', JSON.stringify(this.items))
        window.localStorage.setItem('lastSaved', JSON.stringify(saveTime))
        window.localStorage.setItem('lastSavedUtc', JSON.stringify(utcSaveTime))
        window.firebase.database().ref('users/' + app.user.uid + '/list/').set({
          items: this.items,
          time: saveTime,
          utcTime: utcSaveTime
        })
        app.lastSaved = saveTime
      },
      newItemMethod: function () {
        try {
          this.items.unshift({
            message: this.newItem,
            done: false
          })
          this.newItem = ''
          app.update()
        } catch (err) {
          alert(err)
        }
      },
      removeItem: function (item) {
        var index = this.items.indexOf(item)
        this.items.splice(index, 1)
        app.update()
      }
    }
  })
} catch (err) {
  window.alert(err)
}
document.addEventListener('DOMContentLoaded', function () {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target
        var $target = document.getElementById(target)

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
})
