<script lang="ts">
  export let href: string;
</script>

<a class="block" {href}><slot /></a>

<style lang="scss">
  .block {
    display: block;
    background-color: rgba(170, 170, 170, 0.1);
    text-decoration: none;
    &:hover {
      outline: 1px solid rgba(#eee, 0.3);
    }
  }
</style>
