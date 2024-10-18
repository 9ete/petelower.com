<template>
    <h1 class="loading-dots-after">Hello <i>World</i></h1>
    <h2 style="text-align: right">I'm <a href="https://github.com/9ete">9ete</a></h2>
    <div id="gravatar-img" class="gravatar"></div>
</template>
<style scoped>
.read-the-docs {
  color: #888;
}
.gravatar {
    height: 100px;
    width: 100px;
    border-radius: 100px;
    border: 1px solid whitesmoke;
    box-shadow: 0 0 10px black;
    margin: auto;
    background: url('https://gravatar.com/avatar/74123bf8d459685cd0f02c1dd90c581d22258608efa9bc71e0a1356be57465db?size=512') center / contain no-repeat;
}
.loading-dots-after {
    width: 380px;
    text-align: left;
}
.loading-dots-after:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4, end) 1200ms infinite;
  animation: ellipsis steps(4, end) 1200ms infinite;
  content: "\2026";
  /* ascii code for the ellipsis character */
  width: 0px;
}

@keyframes ellipsis {
  to {
    width: 40px;
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 40px;
  }
}
</style>
