<script>
  import { afterUpdate } from "svelte";
  export let classes = "";
  export let fieldName = "";
  export let fieldNameRu;
  export let value = "неизвестно";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  afterUpdate(() => {});
</script>

<div class="user-information-field {classes}">
  <div class="text-container">
    <span class="field-name">{fieldNameRu}:</span>
    <span class="value">{value}</span>
  </div>
</div>

<style>
  .text-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
  .user-information-field {
    min-height: 64px;
    width: 100%;
    position: relative;
    /*max-width: 270px;*/
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: 0.02em;
    background: rgba(242, 242, 242, 0.5);
    border-radius: 5px;
    border-radius: 10px;
    margin: 20px 0 0;
  }

  .user-information-field-admin-left {
    width: 311px;
    min-height: 66px;
    box-shadow: inset 2px 0px 0px #3f51b5;
    margin: 15px 0 0;
  }

  .user-information-field-admin-right {
    width: 311px;
    min-height: 66px;
    box-shadow: inset -2px 0px 0px #3F51B5;
    margin: 15px 0 0;
  }

  .value {
    color: #000;
    font-weight: bold;
  }
  .edit-button-img {
    width: 20px;
    height: 20px;
  }
  .edit-button-cancel {
    position: absolute;
    top: 8px;
    right: 20px;
    z-index: 30;
  }
  .field-name {
    margin-bottom: 10px;
    color: #333333;
  }
  .edit-button {
    background-color: transparent;
    border: none;
  }
  .notification-icon {
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
  }

  .notification-text {
    background-color: white;
    font-size: 14px;
    line-height: 16px;
    width: 200px;
    height: 40px;
    position: absolute;
    right: 60px;
    bottom: 80%;
    text-align: center;
    box-shadow: 0px 4px 20px rgb(0 0 0 / 10%);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .notification-icon-moved {
    top: 7px;
    transform: none;
  }

  .button-show-password {
    background-color: transparent;
    border: none;
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
  }
  .button-show-password:focus {
    outline: none;
  }
  @media screen and (max-width: 1440px) {
    .user-information-field {
      font-size: 12px;
      line-height: 13px;
    }
    .edit-button-img {
      width: 15px;
      height: 15px;
    }
  }
  @media screen and (max-width: 720px) {
    .edit-button-cancel {
      top: 5px;
      right: 5px;
    }
  }
</style>
