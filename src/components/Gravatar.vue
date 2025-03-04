<template>
    <div id="gravatar-img" class="gravatar">
        <img
        :src="`https://www.gravatar.com/avatar/74123bf8d459685cd0f02c1dd90c581d22258608efa9bc71e0a1356be57465db?d=identicon`"
        :alt="`Gravatar for 9ete`"
        />
    </div>
</template>
<style>
.gravatar {
    height: 100px;
    width: 100px;
    margin: 0;
    border-radius: 100px;
    border: 1px solid whitesmoke;
    box-shadow: 0 0 10px black;
    background: url('https://gravatar.com/avatar/74123bf8d459685cd0f02c1dd90c581d22258608efa9bc71e0a1356be57465db?size=512') center / contain no-repeat;
    position: relative;
    left: 1rem;
    top: 1.25rem;

    img {
        display: none;
    }
}
</style>