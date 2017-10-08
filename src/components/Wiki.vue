<template>
  <div class="wiki" />
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'
import specifications from '../specifications'

const markdown = specifications['swagger-v2'] // @todo detect version from json

export default {
  computed: mapState(['specification']),
  mounted () {
    this.renderMarkdown(this.specification)
  },
  watch: {
    specification (specification) {
      this.renderMarkdown(specification)
    }
  },
  methods: {
    renderMarkdown (specification) {
      if (markdown[specification]) {
        this.$el.innerHTML = marked(markdown[specification], { gfm: true })
      } else {
        this.$el.innerHTML = ''
      }
    }
  }
}
</script>
<style lang="scss">
.wiki {
  h4:first-child {
    margin-top: 0;
    margin-bottom: 10px;

    a {
      text-decoration: none;
      font-size: 30px;
      font-weight: bold;
      color: #3b4151;

      &:hover {
        color: #1f69c0;
        text-decoration: underline;
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
    padding: 3px 5px 5px 3px;
  }
  .lang-yaml {
    display: none;
  }
  .lang-js {
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
