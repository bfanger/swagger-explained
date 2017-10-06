<template>
    <div class="page">
        <div class="page__header">
            <SwaggerHeader v-model="url" @load="load" />
        </div>
        <div class="page__body">
            <div class="page__left-pane">
                {<JsonObject :object="json" @hover="hover" />}
            </div>
            <div class="page__right-pane" ref="rightPane">
              <div class="page__content">
                <div v-if="explained">
                    <p v-if="explained.annotation">
                        <a href="https://github.com/zircote/swagger-php" target="_blank">Swagger-PHP</a> annotation:
                        <strong>{{explained.annotation}}</strong>
                    </p>
                    <Wiki :markdown="spec[explained.spec]" />
                </div>
                <div v-else>
                    <p>Hover over the json on the left for detailed information.</p>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import SwaggerHeader from './Header'
import JsonObject from './JsonObject'
import Wiki from './Wiki'
import specifications from '../specifications'
import fetchSwaggerJson from '../services/fetchSwaggerJson'

export default {
  components: { SwaggerHeader, JsonObject, Wiki },
  data: () => ({
    url: 'https://cdn.rawgit.com/swagger-api/swagger-spec/master/examples/v2.0/json/petstore-simple.json',
    json: {},
    spec: {},
    explained: false
  }),
  beforeMount () {
    this.spec = specifications['swagger-v2']
    this.load(this.url)
    const spec = window.location.hash.substr(1)
    if (spec) {
      this.explained = { spec }
    }
  },
  mounted () {
    window.addEventListener('hashchange', this.hashchange)
  },
  destroyed () {
    window.removeEventListener('hashchange', this.hashchange)
  },
  methods: {
    async load () {
      this.json = { status: 'Loading...' }
      try {
        this.json = await fetchSwaggerJson(this.url)
      } catch (err) {
        this.json = { error: err.message }
      }
    },
    hover (explained) {
      this.explained = explained
    },
    hashchange (e) {
      this.explained = { spec: window.location.hash.substr(1) }
      setTimeout(() => {
        this.$refs.rightPane.scrollTop = 0
      })
    }
  }
}
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.page__header {
  background-color: #89bf04;
  color: #fff;
}
.page__body {
  flex-grow: 1;
  display: flex;
}
.page__left-pane {
  flex: 1 1 30%;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #2d2d2d;
  color: #cccccc;
  font-size: 10px;
  font-family: Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace;
  white-space: nowrap;
  padding: 4px 0  10px 3px;
  max-width: 800px
}
.page__right-pane {
  flex: 1 1 70%;
  overflow: scroll;
}
.page__content {
  max-width: 840px;
  padding: 10px 20px;
  margin: auto;
}
</style>
