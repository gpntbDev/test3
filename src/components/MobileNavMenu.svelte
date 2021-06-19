<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let current = "personal-data";
  function clickHandler() {
    dispatch("click", {
      current: this.id,
    });
    current = this.id;
  }
</script>

<div class="mobile-nav-menu">
  <button
    on:click={clickHandler}
    id="personal-data"
    class="mobile-nav-menu__button personal-data"
    class:active-button={current === "personal-data"}
    >Личные данные
  </button>
  <button
    on:click={clickHandler}
    class="mobile-nav-menu__button accounts-data"
    id="accounts-data"
    class:active-button={current === "accounts-data"}
  >
    Данные аккаунта
  </button>
  <button
    on:click={clickHandler}
    id="interactions"
    class="mobile-nav-menu__button interactions"
    class:active-button={current === "interactions"}
    >Взаимодействия
  </button>
</div>

<style>
  .mobile-nav-menu {
    display: flex;
    width: calc(100% - 64px);
    margin: 10px 32px;
    justify-content: space-between;
  }
  .mobile-nav-menu__button {
    font-family: Blogger Sans;
    width: calc(100% / 3 - 10px);
    height: 23px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 13px;
    letter-spacing: 0.02em;
    color: #035ba0;
    border: none;
    background-color: #ffffff;
    border-radius: 10px;
  }
  .active-button {
    background-color: #035ba0;
    color: #ffffff;
  }
  .mobile-nav-menu__button:focus {
      outline: none;
  }
  @media screen and (min-width: 1025px) {
    .mobile-nav-menu {
      display: none;
    }
  }
</style>
