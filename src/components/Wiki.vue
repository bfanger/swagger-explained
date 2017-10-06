<template>
  <VueMarkdown class="wiki" :source="markdown" />
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  props: {
    markdown: String
  },
  components: { VueMarkdown }
}
</script>
<style lang="scss">
.wiki {
  h4:first-child {
    margin-top: 0;
    a {
      text-decoration: none;
      font-size: 30px;
      font-weight: bold;
      color: #3b4151;

      &:hover {
        color: #1f69c0;
        border-bottom: 1px solid #1f69c0;
      }
    }
  }
  h5 {
    font-size: 15px;
  }
  th {
    text-align: left;
    background: #eee;
    white-space: nowrap;
    padding: 3px 5px;
  }
  td {
    padding: 3px 5px;
  }
  .language-yaml {
    display: none;
  }
  .language-js {
    padding: 5px 7px;
    border-radius: 2px;
    display: block;
    background: #2B3A42;
    color: #a5cee1;
    font-size: 12px;
    font-family: Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace;
  }
}
</style>
