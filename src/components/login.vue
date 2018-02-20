<template>
<div class="page login">
  <div class="loginContainer">
    <div class="header">
      <h1>Login</h1>
    </div>
    <form class="loginWithEmailForm">
      <input class="loginWithEmail" type="email" name="email" required value="" placeholder="Email">
      <input class="loginWithPassword" type="password" name="password" value="" placeholder="Password" required>
      <button type="button" name="submit">Submit</button>
    </form>
    <div class="LoginWithOther">
      <h3>Or...</h3>
      <div class="vcenter">
        <button type="button">Login With Google</button>
      </div>


    </div>
  </div>

</div>
</template>
<script>
import '../assets/login.scss'
export default {
  name: "Login",
  data: () => ({

  })
}
</script>
