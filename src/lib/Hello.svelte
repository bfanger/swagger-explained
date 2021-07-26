<script lang="ts">
  export let name: string;
</script>

<h1 class="hello" on:click>Hello {name}</h1>

<style lang="scss">
  .hello {
    color: #333;
    font: 20px sans-serif;
    text-align: center;
    transition: letter-spacing 200ms;
    cursor: pointer;

    &:hover {
      letter-spacing: 1px;
    }
  }
</style>
