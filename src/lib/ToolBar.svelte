<script lang="ts">
  import { onMount, tick } from "svelte";
  import { goto } from "$app/navigation";
  import logoSrc from "../assets/swagger.svg";

  export let url: string;

  onMount(async () => {
    await tick();
    await tick();
    const query = new URLSearchParams(location.search);

    if (query.get("url") && url == "") {
      goto(
        location.pathname +
          "?url=" +
          window.encodeURIComponent(query.get("url") || "")
      );
    }
  });
  function onSubmit() {
    goto(location.pathname + "?url=" + window.encodeURIComponent(url));
  }
</script>

<header>
  <img src={logoSrc} alt="Swagger" class="logo" />
  <form on:submit|preventDefault={onSubmit}>
    <input
      class="input"
      name="url"
      bind:value={url}
      placeholder="Enter an url to an openapi yaml/json file"
    />
    <input type="submit" value="Explain" class="submit" />
  </form>
</header>

<style lang="scss">
  header {
    background-color: #1b1b1b; // #63db2a;
    flex-shrink: 0;
    height: 6rem;
    display: flex;
    align-items: center;
  }
  .logo {
    width: 13.8rem;
    height: 3.8rem;
    margin-left: 2rem;
    margin-right: 4rem;
  }
  form {
    display: flex;
    margin: auto;
    align-items: stretch;
    justify-content: center;
    height: 3.8rem;
    width: 80%;
    margin-right: 2rem;
  }
  .input {
    border: 2px solid #62a03f;
    border-radius: 4px 0 0 4px;
    margin: 0;
    outline: none;
    width: 100%;
    padding: 8px 10px;
    background: #fff;
    box-sizing: border-box;
    font-size: 15px;
  }
  .submit {
    background: #62a03f;
    border: none;
    border-radius: 0 4px 4px 0;
    color: #fff;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 700;
    padding: 4px 30px;
    margin: 0;
    cursor: pointer;
  }
</style>
