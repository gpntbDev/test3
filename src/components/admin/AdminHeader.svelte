<script>
    export let userName;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
  </script>
  
  <header class="header">
    <h2 class="header__title">Профиль пользователя</h2>
    <div class="header__nav-link-container">
     <!-- <button
        ><img
          class="img-search"
          src="images/search.svg"
          alt="search-icon"
        /></button
      >-->
      <button on:click={() => {
        dispatch("click");
      }}
        ><img
          class="img-burger-menu"
          src="images/burger-menu.svg"
          alt="burger-menu-icon"
        /></button
      >
    </div>
  </header>
  
  <style>
    .header {
      width: 100%;
      height: 60px;
      position: absolute;
      background-color: white;
      top: 0;
      left: 0;
      z-index: 98;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .img-burger-menu {
      width: 20px;
      height: 20px;
    }
    .img-search {
      width: 20px;
      height: 20px;
    }
    .header__title {
      font-family: Gotham Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
      text-align: center;
      letter-spacing: 0.02em;
      color: #333333;
      margin-left: 340px;
    }
  
    .header__nav-link-container {
      display: flex;
      min-width: 76px;
      justify-content: flex-end;
      align-items: center;
      margin-right: 16px;
    }
    button {
      background-color: white;
      border: none;
    }
    @media screen and (max-width: 1440px) {
      .header__title {
        font-size: 20px;
        line-height: 28px;
        margin-left: 240px;
      }
    }
  
    @media screen and (min-width: 721px) {
      .header__nav-link-container {
        display: none;
      }
    }
  
    @media screen and (max-width: 720px) {
      .header {
        height: 90px;
      }
      .header__title {
        margin-left: 16px;
        max-width: 167px;
        text-align: left;
      }
    }
  </style>
  