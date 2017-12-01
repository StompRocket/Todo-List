try {
var app = new Vue({
  el: '#app',
  data: {
    newItem: '',
    items: []
  },

  methods: {
    init: function () {
       if (localStorage.getItem("todoList")) {
          app.items = JSON.parse(localStorage.getItem("todoList"))
      } else {
        window.alert('no data')
        app.items.push({message: 'Welcome To List',done: false});
        app.items.push({message: 'Bar',done: true})
     }
    },
    update: function () {
     localStorage.setItem("todoList", JSON.stringify(this.items))
    },
    newItemMethod: function () {
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
    removeItem: function (item) {
      var index = this.items.indexOf(item)
      this.items.splice(index, 1)
        app.update()
    }
  }
})

window.onload = app.init;
} catch (err) {
window.alert(err)
}