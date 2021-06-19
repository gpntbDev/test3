<script>
  import { createEventDispatcher } from "svelte";
  import Logo from "./Logo.svelte";
  const dispatch = createEventDispatcher();
  export let mobileVisible;
  function clickHandler() {
    dispatch("click", {
      current: this.name,
    });
  }
</script>

<div class="sidebar" class:mobileVisible>
  <Logo />
  <nav class="sidebar-menu">
    <ul class="sidebar-menu-list">
      <li class="sidebar-menu-item item-active">
        Личный кабинет
        <ul class="sidebar-mobile-menu-list">
          <li class="sidebar-mobile-menu-item">
            <button
              on:click={clickHandler}
              name="personal-data"
              class="sidebar-mobile-menu-button">Основная информация</button
            >
          </li>
          <li class="sidebar-mobile-menu-item">
            <button
              on:click={clickHandler}
              name="accounts-data"
              class="sidebar-mobile-menu-button"
              >Дополнительная информация</button
            >
          </li>
         </ul>
      </li>
      <!--<li class="sidebar-menu-item">Раздел меню</li>
      <li class="sidebar-menu-item">Раздел меню</li>
      <li class="sidebar-menu-item">Раздел меню</li>
      <li class="sidebar-menu-item position-relative">Раздел меню</li>-->
    </ul>
  </nav>
  <button
    on:click={() => {
      dispatch("exitButtonClick");
    }}
    type="button"
    class="button-exit"
  >
    <img src="images/exit.svg" alt="exit" /><span class="button-exit__text"
      >Выйти</span
    >
  </button>
  <button
    on:click={() => {
      dispatch("closeButtonClick");
    }}
    type="button"
    class="close-button"
  >
    <img src="images/cross.svg" alt="close" />
  </button>
</div>

<style>
  .sidebar {
    width: 261px;
    height: 100%;
    min-height: 100vh;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    background-color: #035ba0;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mobileVisible {
    display: flex !important;
  }
  .close-button {
    display: none;
    position: absolute;
    background-color: transparent;
    top: 27px;
    right: 16px;
    border: none;
  }
  .sidebar-menu {
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    text-align: center;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.7);
  }
  .sidebar-menu-list,
  .sidebar-mobile-menu-list {
    list-style: none;
    padding: 0;
  }
  .sidebar-mobile-menu-list {
    font-size: 14px;
    line-height: 19.6px;
    letter-spacing: 2%;
    font-weight: 400;
    font-style: normal;
    color: rgba(255, 255, 255, 0.7);
  }
  .sidebar-menu-item {
    padding: 0 0 20px 0;
    margin: 0 0 14px 0;
  }
  .sidebar-mobile-menu-item {
    margin: 10px 0 0 0;
  }
  .sidebar-mobile-menu-item:nth-of-type(1) {
    margin-top: 20px;
  }
  .sidebar-mobile-menu-button {
    background-color: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.7);
  }
  .item-active {
    font-size: 26px;
    line-height: 28px;
    font-weight: bold;
    color: #ffffff;
  }
  .button-exit {
    position: absolute;
    background: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: none;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
  .button-exit__text {
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.02em;
    margin: 0 0 0 10px;
    color: rgba(255, 255, 255, 0.7);
  }
  @media screen and (max-width: 1440px) {
    .sidebar {
      width: 220px;
      min-height: 929px;
    }
    .sidebar-menu {
      font-size: 12px;
      line-height: 13px;
    }
    .item-active {
      font-size: 20px;
      line-height: 22px;
    }
  }
  @media screen and (min-width: 1025px) {
    .sidebar-mobile-menu-list {
      display: none;
    }
  }

  @media screen and (max-width: 1024px) {
    .sidebar {
      min-height: 1001px;
    }
  }



  @media screen and (max-width: 720px) {
    .sidebar {
      display: none;
      width: 100%;
      height: 100%;
      min-height: 655px;
    }
    .close-button {
      display: block;
    }
  }
</style>
