<script>
  import InputField from "./InputField.svelte";
  import { afterUpdate } from "svelte";
  import Button from "./Button.svelte";
  import SuggestView from "../components/SuggestView.svelte";
  export let editable = false;
  export let classes = "";
  export let fieldName = "";
  export let fieldNameRu;
  export let notConfirmed = "";
  export let inputName = "";
  export let password = false;
  export let passwordButton = false;
  export let value = "неизвестно";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let inputValue = "";
  let notification = false;
  let buttonConfirmState = false;
  let editState = false;
  let passwordSymbols;
  if (password) {
    passwordSymbols = value
      .split("")
      .map((i) => {
        return (i = "*");
      })
      .join("");
  }
  let input = false;

  const changeType = function () {
    password = !password;
  };

  const inputValidator = function (e) {
    console.log(e);
  };

  function editUserData() {
    let editedData = {};
    editedData.changedField = fieldName;
    editedData.value = inputValue;
    dispatch("edit", editedData);
    editState = false;
  }

  afterUpdate(() => {
    if (!inputValue) {
      buttonConfirmState = false;
    } else {
      buttonConfirmState = true;
    }
  });
</script>

<div class="user-information-field {classes}">
  <div class="text-container">
    {#if !editState}
      <span class="field-name">{fieldNameRu}:</span>
      {#if password}
        <span class="value">{passwordSymbols}</span>
      {:else}
        <span class="value">{value}</span>
      {/if}
    {/if}

    {#if password && editState}
      <p class="field-name">
        {fieldNameRu}: <span class="value">{passwordSymbols}</span>
      </p>
      <InputField
        bind:userdata={inputValue}
        validation={false}
        id={inputName}
        classes={"m-input-margin-bottom-10"}
        type="password"
        password="{true};"
        name={inputName}
        labelText={"Введите новые данные"}
      />
      <Button
        on:click={editUserData}
        disabled={!buttonConfirmState}
        classes={"m-button_margin-null"}
        content={"Подтвердить"}
      />
    {/if}

    {#if editState && !password}
      <p class="field-name">
        {fieldNameRu}: <span class="value">{value}</span>
      </p>
      {#if inputName == "inputRegistrationAdress"}
        <SuggestView
          input={inputName}
          id={"yampsOne"}
          on:select={(e) => {
            inputValue = e.detail.value;
          }}
        />
      {/if}
      {#if inputName == "inputActualAdress"}
        <SuggestView
          input={inputName}
          id={"yampsTwo"}
          on:select={(e) => {
            inputValue = e.detail.value;
          }}
        />
      {/if}
      <InputField
        bind:userdata={inputValue}
        id={inputName}
        validation={false}
        type="text"
        classes={"m-input-margin-bottom-10"}
        name={inputName}
        labelText={"Введите новые данные"}
      />
      <Button
        on:click={editUserData}
        disabled={!buttonConfirmState}
        classes={"m-button_margin-null"}
        content={"Подтвердить"}
      />
    {/if}
  </div>
  {#if editable}
    {#if !editState}
      <button
        on:click={() => {
          editState = !editState;
          inputValue = "";
        }}
        class="edit-button"
      >
        <img class="edit-button-img" src="images/edit.svg" alt="edit" />
      </button>
    {/if}
    {#if editState}
      <button
        on:click={() => {
          editState = !editState;
          inputValue = "";
        }}
        class="edit-button edit-button-cancel"
      >
        <img class="edit-button-img" src="images/cancel.svg" alt="cancel" />
      </button>
    {/if}
  {/if}
  {#if passwordButton && !editState}
    <button
      on:mousedown={changeType}
      on:mouseup={changeType}
      type="button"
      class="button-show-password"
      ><img
        class="show-password-image"
        src="images/eye.svg"
        alt="eye"
      /></button
    >
  {/if}
  {#if notConfirmed}
    <img
      on:mouseover={() => {
        notification = true;
      }}
      on:mouseout={() => {
        notification = false;
      }}
      class="notification-icon"
      class:notification-icon-moved={editState}
      src="images/notification.svg"
      alt="caution"
    />
    {#if notification}
      <div class="notification-text">
        Требуется подтверждение электронной почты
      </div>
    {/if}
  {/if}
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
    padding: 10px 20px;
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    letter-spacing: 0.02em;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 20px 0 0;
  }

  .user-information-field-admin {
    width: 311px;
    min-height: 50px;
    border: 2px solid #035ba0;
    border-radius: 10px;
    box-shadow:none;
    margin: 15px 0 0;
  }

  .value {
    color: #000;
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
    color: #035ba0;
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
