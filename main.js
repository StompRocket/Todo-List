var app = new Vue({
  el: '#app',
  data: {
    newItem: '',
    items: [{
      message: 'Foo'
    },
      {
        message: 'Bar'
      }
    ]
  },

  methods: {
    newItemMethod: function () {
      try {
        this.items.push({
          message: this.newItem
        })
        this.newItem = ''
      } catch (err) {
        alert(err)
      }
    },
    removeItem: function (item) {
      var index = this.items.indexOf(item)
      this.items.splice(index, 1)
    }
  }
})
