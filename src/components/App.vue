<template>
  <Page />
</template>

<script>
import Page from "./Page.vue";
import store from "../services/store";

export default {
  components: { Page },
  store,
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
html {
  height: 100%;
}

body {
  margin: 0;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  color: #3b4151;
}

p {
  margin: 0 0 1em 0;
}

a {
  color: #4990e2;
  &:hover {
    color: #1f69c0;
  }
}
</style>
