<div class="master-detail">
  <div class="master">
    <slot name="master" />
  </div>
  <div class="detail">
    <slot />
  </div>
</div>

<style>
  .master-detail {
    display: flex;
    height: 100%;
  }
  .master {
    flex-basis: 25%;
    border-right: 1px solid #b1b1b1;
    width: 25%;
    min-width: 35rem;
    height: 100%;
    overflow-y: scroll;
  }
  .detail {
    width: 75%;
    height: 100%;
    overflow-y: scroll;
  }
</style>
