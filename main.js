
try {
  var app = new Vue({
    el: '#app',
    data: {
      newItem: '',
      items: [],
      lastSaved: 'none'
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
    methods: {
      getDate: function () {
        let date = new Date();
        let utcDate = new Date(date.toUTCString());
        utcDate.setHours(utcDate.getHours()-8);
        let usDate = new Date(utcDate);
        return usDate
      },
      init: function() {

        if (localStorage.getItem('todoList')) {
          app.items = JSON.parse(localStorage.getItem('todoList'))
          app.lastSaved = JSON.parse(localStorage.getItem('lastSaved'))
        } else {
          app.items.push({
            message: 'Welcome To List',
            done: false
          })
          app.items.push({
            message: 'Bar',
            done: true
          })
        }
      },
      update: function() {
         //console.log(JSON.stringify(this.items))
        localStorage.setItem('todoList', JSON.stringify(this.items))
        localStorage.setItem('lastSaved', JSON.stringify(app.getDate()))
        app.lastSaved = app.getDate()
      },
      newItemMethod: function() {
        try {
          this.items.push({
            message: this.newItem,
            done: false
          })
          this.newItem = ''
          app.update()
        } catch (err) {
          alert(err)
        }
      },
      removeItem: function(item) {
        var index = this.items.indexOf(item)
        this.items.splice(index, 1)
        app.update()
      }
    }
  })

  window.onload = app.init
} catch (err) {
  window.alert(err)
}
