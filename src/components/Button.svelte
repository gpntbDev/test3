<script>
  import { createEventDispatcher } from "svelte";
  // export let isRegButtonActive;
  //export let confirmation;
  export let type = "button";
  export let classes = "";
  export let content;
  export let disabled = false;

  const dispatch = createEventDispatcher();
  function clickHandler() {
    dispatch("click");
  }
</script>

<button on:click={clickHandler} {disabled} class="m-button {classes}" {type}
  >{content}</button
>

<style>
  .m-button {
    font-family: Blogger Sans;
    letter-spacing: 0.02em;
    border: none;
    color: white;
    width: 286px;
    height: 50px;
    background-color: #035ba0;
    border-radius: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 28px;
    margin: 20px 0 0 0;
    align-self: center;
  }

  .m-button-black {
    width: 160px;
    height: 40px;
    background-color: #000;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #FFFFFF; 
    margin: 0 0 20px 0;
  }

  .m-button_margin-reduced {
    margin: 10px 0 0 0;
  }
  .m-button_margin-increased {
    margin: 30px 0 0 0;
  }
  .m-button_margin-null {
    margin: 0;
  }

  .m-button_margin-bottom {
    margin-bottom: 10px;
  }

  .m-button_margin-bottom-increased {
    margin-bottom: 30px;
  }

  .m-button_color_white {
    background-color: white;
    color: #035ba0;
    padding: 0;
  }
  .m-button_width_long {
    width: 346px;
  }
  .m-button_width_long-mobile {
    width: 275px !important;
  }

  .continue-button {
    margin-top: 24px;
  }
  .continue-button:disabled,
  .m-button:disabled,
  .log-button:disabled {
    background-color: gray;
  }

  .m-button:focus {
    outline: none;
  }

  .reg-button {
    width: 300px;
  }
  .m-button:focus {
    outline: none;
  }
  .log-button {
    margin-top: 36px;
  }
  @media screen and (max-width: 1440px) {
    .m-button {
      /* width: 200px;
      height: 40px;*/
      font-size: 20px;
      line-height: 22px;
    }
  }

  @media screen and (min-width:501px) {
    .mobile {
      display: none;
    }
  }



  @media screen and (max-width: 920px) {
    .m-button {
      width: 229px;
      height: 42px;


    }
  }
</style>
