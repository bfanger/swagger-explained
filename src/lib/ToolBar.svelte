<script lang="ts">
  import { onMount, tick } from "svelte";
  import logoSrc from "../assets/swagger.svg";
  import { goto } from "$app/navigation";

  export let url: string;

  let loading = false;

  onMount(async () => {
    await tick();
    await tick();
    const query = new URLSearchParams(window.location.search);

    if (query.get("url") && url === "") {
      goto(`?url=${window.encodeURIComponent(query.get("url") || "")}`);
    }
  });
  async function onSubmit() {
    loading = true;
    await goto(`?url=${window.encodeURIComponent(url)}`);
    loading = false;
  }
</script>

<header>
  <img src={logoSrc} alt="Swagger" class="logo" />
  <form method="GET" on:submit|preventDefault={onSubmit}>
    <input
      class="input"
      name="url"
      bind:value={url}
      placeholder="Enter an url to an openapi yaml/json file"
    />
    <input
      type="submit"
      value={loading ? "Loading..." : "Explain"}
      class="submit"
    />
  </form>
</header>

<style lang="scss">
  header {
    display: flex;
    flex-shrink: 0;
    align-items: center;

    height: 6rem;

    background-color: #1b1b1b;
  }

  .logo {
    width: 13.8rem;
    height: 3.8rem;
    margin-right: 4rem;
    margin-left: 2rem;
  }

  form {
    display: flex;
    align-items: stretch;
    justify-content: center;

    width: 80%;
    height: 3.8rem;
    margin: auto;
    margin-right: 2rem;
  }

  .input {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 10px;

    font-size: 15px;

    background: #fff;
    border: 2px solid #62a03f;
    border-radius: 4px 0 0 4px;
    outline: none;
  }

  .submit {
    cursor: pointer;

    margin: 0;
    padding: 4px 30px;

    font-family: sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #fff;

    background: #62a03f;
    border: none;
    border-radius: 0 4px 4px 0;
  }
</style>
