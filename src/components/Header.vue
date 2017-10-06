<template>
  <div class="header">
    <a href="https://swagger.io/"><img class="header__logo" :src="logo"></a>
    <span class="header__title">Swagger Explained</span>
    <input class="header__input" :value="value" @keypress.enter="$emit('load');$event.target.blur()" @input="$emit('input', $event.target.value)">
    <button class="header__button" @click="$emit('load')">Explain</button>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data: () => ({
    logo: require('../assets/swagger-logo.png')
  })
}
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  height: 46px;
  padding: 0 20px;
}

.header__logo {
  margin-right: 8px;
  display: block;
}

.header__title {
  font-family: 'Roboto', sans-serif;
  white-space: nowrap;
  font-size: 17.5px;
  line-height: 30px;
  font-weight: bold;
  padding-right: 30px;
}

.header__input {
  flex-grow: 1;
  padding: 4px 8px;
  border: 1px solid #547f00;
  border-radius: 4px 0 0 4px;
  line-height: 18px;
  &:focus {
    outline: none;
    border-width: 2px;
    &+button {
      border-width: 2px;
    }
  }
}

.header__button {
  padding: 4px 30px;
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
  background: #547f00;
  color: #fff;
  border: 1px solid #547f00;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  &:active {
    background: #3a5602;
  }
  &:focus {
    outline: none;
  }
}
</style>
