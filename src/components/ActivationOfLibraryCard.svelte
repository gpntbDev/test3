<script>
  import InputField from "./InputField.svelte";
  import { getDataFromLibraryCard } from "../api/api";
  import { validator, repeatedPasswordValidator } from "../utils/validator";
  import { validationState } from "../utils/validationState";
  import { afterUpdate, onDestroy } from "svelte";
  import Button from "./Button.svelte";
  import AnimatedPreloader from "./AnimatedPreloader.svelte";
  import { createEventDispatcher } from "svelte";

  let responseOk;

  const dispatch = createEventDispatcher();

  let currentValidationState = validationState;
  let userLibraryCard = "";
  let isActivateButtonActive = false;
  let isContinueButtonActive = false;
  let pending;
  let receivedData;
  let repeatedPassword = "";
  let errorNotFound = "";
  let userData = {
    libraryCardNumber: "",
    surname: "",
    name: "",
    patronymic: "",
    birthdate: "",
  };

  async function activationHandler() {
    if (userLibraryCard.length == 5) {
      try {
        pending = true;
        let result = await getDataFromLibraryCard(userLibraryCard);
        errorNotFound = "";
        receivedData = result;
        console.log(result);
        pending = false;
      } catch (e) {
        pending = false;
        errorNotFound = "Пользователь не найден";
      }
    }
  }

  afterUpdate(() => {
    if (!userData.email || !userData.password) {
      isActivateButtonActive = false;
    } else {
      isActivateButtonActive = true;
    }
    if (
      !userData.libraryCardNumber ||
      !userData.surname ||
      !userData.name ||
      !userData.patronymic ||
      !userData.birthdate
    ) {
      isContinueButtonActive = false;
    } else {
      isContinueButtonActive = true;
    }

    if (repeatedPassword !== userData.password) {
      isActivateButtonActive = false;
    }
    if (!userData.libraryCardNumber) {
      errorNotFound = "";
    }
  });

  function activate() {
    dispatch("activate", userData);
  }

  async function searchUserWithLibraryCard() {
    try {
      pending = true;
      let result = await getDataFromLibraryCard(userLibraryCard);
      errorNotFound = "";
      receivedData = result;
      responseOk = true;
      console.log(result);
      pending = false;
    } catch (e) {
      pending = false;
      errorNotFound = "Пользователь не найден";
      responseOk = false;
    }
  }

  async function handleUserdata() {
    try {
      let user = await getDataFromLibraryCard(userData);
      if (user.email) {
        userData.email = user.email;
      }
      if (user.phonenumber) {
        userData.phonenumber = user.phonenumber;
      }
      responseOk = true;
      errorNotFound = '';
      dispatch("activate-user-found");
    } catch (err) {
      console.log(err);
      pending = false;
      if (err == 404) {
        errorNotFound = "Пользователь не найден";
      }
      if (err == 400) {
        errorNotFound = "Пользователь уже зарегистрирован";
      }
      responseOk = false;
    }
  }

  onDestroy(() => {
    for (let prop in currentValidationState) {
      currentValidationState[prop] = { state: true, message: null };
    }
  });

</script>

<form
  on:submit|preventDefault={activate}
  class="text-left d-flex flex-column align-items-center"
  class:initial={!responseOk}
>
  <InputField
    bind:userdata={userData.libraryCardNumber}
    id="inputLibraryCard"
    validation={false}
    type="text"
    error={errorNotFound}
    name="inputLibraryCard"
    labelText="Номер читательского билета"
  />
  <InputField
    bind:userdata={userData.surname}
    id="inputSurname"
    validation={false}
    name="inputSurname"
    type="text"
    labelText="Фамилия"
  />
  <InputField
    bind:userdata={userData.name}
    id="inputName"
    validation={false}
    name="inputName"
    type="text"
    labelText="Имя"
  />
  <InputField
    bind:userdata={userData.patronymic}
    id="inputPatronymic"
    validation={false}
    name="inputPatronymic"
    type="text"
    labelText="Отчество"
  />
  <InputField
    bind:userdata={userData.birthdate}
    id="inputBirthDate"
    validation={false}
    name="inputBirthDate"
    type="date"
    labelText="Дата рождения"
  />
  {#if !responseOk}
    <Button
      type={"button"}
      on:click={handleUserdata}
      content={"Продолжить"}
      disabled={!isContinueButtonActive}
    />
  {/if}

  {#if responseOk}
    <InputField
      bind:userdata={userData.email}
      id="inputEmail"
      name="inputEmail"
      validation={false}
      type="email"
      labelText="Email"
    />
    <InputField
      bind:userdata={userData.phonenumber}
      id="inputPhoneNumber"
      type="tel"
      validation={false}
      name="inputPhoneNumber"
      {currentValidationState}
      labelText="Телефон"
    />
    <InputField
      bind:userdata={userData.password}
      callback={(e) =>
        (currentValidationState = validator(
          e,
          userData.password,
          currentValidationState
        ))}
      id="inputPassword"
      name="inputPassword"
      type="password"
      password="{true};"
      {currentValidationState}
      labelText="Пароль"
    />
    <InputField
      bind:userdata={repeatedPassword}
      callback={(e) =>
        (currentValidationState = validator(
          e,
          repeatedPassword,
          currentValidationState,
          userData.password
        ))}
      id="inputPasswordRepeat"
      name="inputPasswordRepeat"
      type="password"
      password="{true};"
      {currentValidationState}
      labelText="Повторите пароль"
    />
    <Button
      type={"submit"}
      disabled={!isActivateButtonActive}
      content={"Активировать"}
    />
  {/if}

  <!-- Анимация при ожидании ответа
{#if pending}
  <AnimatedPreloader/>
{/if}
-->
</form>

<style>
  form {
    margin-top: 20px;
  }
  .initial {
    margin-top: 125px;
  }
</style>
