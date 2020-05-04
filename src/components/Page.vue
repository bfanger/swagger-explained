<template>
  <div class="page">
    <div class="page__header">
      <SwaggerHeader v-model="url" @load="load" />
    </div>
    <div class="page__body">
      <div class="page__left-pane">
        {
        <JsonObject :object="json" />
        }
        <div
          v-show="hover.specification"
          class="page__tooltip"
          :style="{ top: hover.top, left: hover.left }"
        >
          <div class="page__tooltip__body">
            {{ hover.specification }} - {{ hover.annotation }}
          </div>
        </div>
      </div>
      <div ref="rightPane" class="page__right-pane">
        <div class="page__content">
          <p v-if="annotation">
            <a href="https://github.com/zircote/swagger-php" target="_blank"
              >Swagger-PHP</a
            >
            annotation:
            <strong>{{ annotation }}</strong>
          </p>
          <p v-else-if="!specification">
            Click the json to show more information.
          </p>
          <Wiki />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SwaggerHeader from "./Header.vue";
import JsonObject from "./JsonObject.vue";
import Wiki from "./Wiki.vue";
import fetchSwaggerJson from "../services/fetchSwaggerJson";
const exampleUrl =
  "https://github.com/OAI/OpenAPI-Specification/blob/master/examples/v2.0/json/petstore-simple.json";

export default {
  components: { SwaggerHeader, JsonObject, Wiki },
  data() {
    let url = exampleUrl;
    const match = location.search.match(/[?&]url=([^&]+[&]?)/);
    if (match) {
      url = decodeURIComponent(match[1]);
    }
    return {
      url,
      json: {},
      markdown: {},
    };
  },
  computed: mapState(["annotation", "specification", "hover"]),
  watch: {
    specification() {
      this.$refs.rightPane.scrollTop = 0;
    },
  },
  beforeMount() {
    this.load(this.url);
  },
  methods: {
    async load() {
      this.json = { status: "Loading..." };
      try {
        const url = this.url;
        this.json = await fetchSwaggerJson(url);
        if (this.url === url && url !== exampleUrl) {
          history.pushState(
            null,
            "Swagger Explained",
            "?url=" + encodeURIComponent(url) + location.hash
          );
        }
      } catch (err) {
        this.json = { error: err.message };
      }
    },
  },
};
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
  position: relative;
  flex: 1 1 30%;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #2d2d2d;
  color: #cccccc;
  font-size: 10px;
  font-family: Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro,
    monospace;
  white-space: nowrap;
  padding: 4px 0 10px 3px;
  max-width: 800px;
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

.page__tooltip {
  position: absolute;
  left: 0;
  will-change: top, left;
}

.page__tooltip__body {
  position: absolute;
  left: -1px;
  bottom: 1px;
  background: rgba(#ccc, 0.5);
  color: white;
  padding: 4px 10px;
  border-radius: 4px 4px 0 0;
}
</style>
