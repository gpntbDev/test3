<script>
  import {
    loginEmail,
    loginLibraryCard,
    signin,
    signinLibraryCard,
  } from "../api/api";
  import Button from "./Button.svelte";
  import { validator } from "../utils/validator";
  import { validationState } from "../utils/validationState";
  import { afterUpdate, onDestroy } from "svelte";
  import { goto } from "@sapper/app";
  import InputField from "./InputField.svelte";

  export let typeOfLogin;
  export let error;
  export let signIn = false;
  //console.log(validationState);

  
  const REDIRECT_URL_TO_SAVE_TOKEN_EZPROXY =
    "http://client.gpntbsib.ru:3002/savetoken?token=";

  const userData = {
    email: "",
    libraryCardNumber: "",
    password: "",
  };
  let isRegButtonActive = false;
  let confirmation;

  let currentValidationState = validationState;

  async function handleSubmit() {
    try {
      if (typeOfLogin == "email") {
        let res = await loginEmail({
          email: userData.email,
          password: userData.password,
        });
        if (signIn) {
          if (res == "Wrong password" || !res) {
            throw new Error(res);
          }
          let url = REDIRECT_URL_TO_SAVE_TOKEN_EZPROXY + res.token;
          goto(url);
        } else {
          goto("/");
        }
      }
      if (typeOfLogin == "library-card") {
        console.log({
          libraryCardNumber: userData.libraryCardNumber,
          password: userData.password,
        });
        let res = await loginLibraryCard({
          libraryCardNumber: userData.libraryCardNumber,
          password: userData.password,
        });
        if (signIn) {
          if (res == "Wrong password" || !res) {
            throw new Error(res);
          }
          let url = REDIRECT_URL_TO_SAVE_TOKEN_EZPROXY + res.token;
          goto(url);
        } else {
          goto("/");
        }
      }
    } catch (e) {
      error = "Неправильные почта или пароль";
      console.log(e);
      
    }
  }
  function updateInputs(node, bar) {
    clearInput();
    return {
      update(bar) {
        clearInput();
      },
    };
  }
  function clearInput() {
    for (let prop in userData) {
      userData[prop] = "";
    }
    for (let prop in currentValidationState) {
      currentValidationState[prop] = { state: true, message: null };
    }
  }

  console.log(typeof clearInput);
  afterUpdate(() => {
    for (let i in currentValidationState) {
      if (!currentValidationState[i].state) {
        isRegButtonActive = false;
        return;
      }
      isRegButtonActive = true;
    }

    /* for (let i in userData) {
      if (!userData[i]) {
        isRegButtonActive = false;
        return;
      }
      isRegButtonActive = true;
    }*/

    //console.log(validationState);
  });
  onDestroy(() => {
    clearInput();
  });
</script>

<form
  use:updateInputs={typeOfLogin}
  on:submit|preventDefault={handleSubmit}
  class="text-left d-flex flex-column align-items-center login-form"
>
  {#if typeOfLogin == "email"}
    <InputField
      bind:userdata={userData.email}
      validation={false}
      {error}
      id="inputEmail"
      name="inputEmail"
      type="email"
      {currentValidationState}
      labelText="Email"
    />
  {/if}
  {#if typeOfLogin == "library-card"}
    <InputField
      bind:userdata={userData.libraryCardNumber}
      validation={false}
      {error}
      id="inputLibraryCard"
      name="inputLibraryCard"
      type="text"
      {currentValidationState}
      labelText="Номер читательского билета"
    />
  {/if}

  <InputField
    bind:userdata={userData.password}
    on:reset
    validation={false}
    id="inputPassword"
    resetPassword="{true};"
    password={true}
    name="inputPassword"
    type="password"
    {currentValidationState}
    labelText="Пароль"
  />
  <div class="d-flex flex-row justify-content-center align-items-center">
    <input
      class=""
      id="confirmation"
      type="checkbox"
      bind:checked={confirmation}
      on:change={console.log(confirmation)}
    />
    <label class="d-pr-confirm-label" for="confirmation">
      Запомнить меня
    </label>
  </div>
  <Button
    disabled={!isRegButtonActive}
    type="submit"
    content={"Войти"}
    classes={"m-button_margin-bottom"}
  />
  <!--<button on:click={clearInput} class="clear-button" type="button"
    >Сбросить все</button
  >-->
</form>

<style>
  .login-form {
    margin: 140px 0 0 0;
  }

  .m-button {
    border: none;
    color: white;
    width: 200px;
    height: 40px;
    background-color: #035ba0;
    border-radius: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 22px;
  }

  .log-button:disabled {
    background-color: gray;
  }
  .log-button {
    margin-top: 36px;
  }

  .clear-button {
    border: none;
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 13px;
    text-align: center;
    letter-spacing: 0.02em;
    background-color: transparent;
  }

  .d-pr-confirm-label {
    margin: 0 0 0 13px;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 13px;
  }

  @media screen and (max-width: 720px) {
    .login-form {
      margin: 40px 0 0 0;
    }
  }
</style>
