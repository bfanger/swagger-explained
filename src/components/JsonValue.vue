<template>
  <span :class="'json-value--' + (typeof value)">{{JSON.stringify(value)}}</span>
</template>

<script>
// Color theme "Tomorrow Midnight"
// https://github.com/chriskempson/tomorrow-theme
export default {
  props: ['value']
}
</script>

<style lang="scss">
.json-value--string {
  color: #b5bd68;
}

.json-value--boolean {
  color: #de935f;
}

.json-value--number {
  color: #de935f;
}

.json-value--null {
  color: #de935f;
}
</style>
