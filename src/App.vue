<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import "minireset.css"
var lastScrollTop = 0;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > 0){
      console.log('scrolling down')
      document.body.style.background = "rgb(231, 115, 126)";
      // downscroll code
   } else {
      console.log('scrolling up')
      document.body.style.background = "rgb(239, 189, 107)";
      // upscroll code
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);
export default {
  name: 'appContainer',
  
  mounted() {
    var lastScrollTop = 0;
    console.log('mounted')
   

  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  font-family: sans-serif;
  font-weight: 200;
}
div {
  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard syntax */
}
#app {
  height: 100%;
}
.page {
  height: 100%;
  background-image: linear-gradient(rgb(239, 189, 107), rgb(231, 115, 126));
}
</style>
