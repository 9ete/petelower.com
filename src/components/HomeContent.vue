<template>
    <h1 class="loading-dots-after">Hello <i>World</i></h1>
    <h2 style="text-align: right">I'm Pete</h2>
    <p hidden style="text-align: right"> I make <a href="https://kadillacblack.com">music</a> <br/>and <a href="https://github.com/9ete">websites.</a></p>
</template>
<style scoped>
.read-the-docs {
  color: #888;
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
  animation: ellipsis steps(4, end) 2400ms infinite;
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
