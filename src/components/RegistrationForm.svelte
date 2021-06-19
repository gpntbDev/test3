<script>
  import { academicDegrees } from "../constants/academicDegrees.js";
  import { educationLevel } from "../constants/education";
  import { sendUserData } from "../api/api";
  import { validator, phoneValidator } from "../utils/validator";
  import { validationState } from "../utils/validationState";
  import { afterUpdate } from "svelte";
  import { onDestroy } from "svelte";
  import Button from "./Button.svelte";
  import InputField from "./InputField.svelte";
  import SelectField from "./SelectField.svelte";
  import {checkUserEmail} from "../api/api";
  import { createEventDispatcher, onMount } from "svelte";

  export let id = "reg-form-mobile";
   let validMail = true;

  console.log(validationState);
  let userData = {
    surname: "",
    name: "",
    patronymic: "",
    birthdate: "",
    education: "",
    degree: "",
    placeofwork: "",
    position: "",
    registrationAdress: "",
    actualAdress: "",
    speciality: "",
    email: "",
    password: "",
    phonenumber: "",
  };

  let confirmation;
  let isActivePage = true;

  let isRegButtonActive = false;
  let repeatedPassword = "";
  console.log(confirmation);

  let currentValidationState = validationState;

  const dispatch = createEventDispatcher();

  function handleButtonNextPage() {
    isActivePage = !isActivePage;
    dispatch("page", { state: isActivePage });
  }

  async function checkUser(e) {
    let data = { email: userData.email };
    try {
      await checkUserEmail(data);
      validMail = true;
      currentValidationState = validator(
        e,
        userData.email,
        currentValidationState,
        null,
        validMail
      );
    } catch (err) {
      validMail = false;
      currentValidationState = validator(
        e,
        userData.email,
        currentValidationState,
        null,
        validMail
      );
    }
  }

  function sendUserDataToParent() {
    dispatch("submit", userData);
  }

  function clearInput() {
    for (let prop in userData) {
      userData[prop] = "";
    }
    for (let prop in currentValidationState) {
      currentValidationState[prop] = { state: true, message: null };
    }
    isActivePage = true;
  }

  console.log(typeof clearInput);
  afterUpdate(() => {
    console.log(validMail);
    /* if (userData.password !== repeatedPassword) {
      currentValidationState.inputPasswordRepeat.state = false;
      currentValidationState.inputPasswordRepeat.message =
        "Пароли не совпадают";
      isRegButtonActive = false;
      return;
    }*/
    console.log(userData);
    for (let i in currentValidationState) {
      if (!currentValidationState[i].state) {
        isRegButtonActive = false;
        return;
      }
      isRegButtonActive = true;
    }
    if (
      !userData.name ||
      !userData.surname ||
      !userData.patronymic ||
      !userData.email ||
      !userData.phonenumber ||
      !userData.password
    ) {
      isRegButtonActive = false;
      return;
    }

    isRegButtonActive = true;

    console.log(validationState);
  });

  onMount(() => {
    const script = document.createElement("script");
    script.id = "ymaps";
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=SuggestView";
    script.onload = () => {
      ymaps.ready(function () {
        if (id == "reg-form-screen") {
          var suggestViewOne = new ymaps.SuggestView("suggest-one");
          var suggestViewTwo = new ymaps.SuggestView("suggest-two");
          suggestViewOne.events.add("select", function (e) {
            userData.registrationAdress = e.get("item").value;
          });
          suggestViewTwo.events.add("select", function (e) {
            userData.actualAdress = e.get("item").value;
          });
        }
        if (id == "reg-form-mobile") {
          var suggestViewThree = new ymaps.SuggestView("suggest-three");
          var suggestViewFour = new ymaps.SuggestView("suggest-four");
          suggestViewThree.events.add("select", function (e) {
            userData.registrationAdress = e.get("item").value;
          });
          suggestViewFour.events.add("select", function (e) {
            userData.actualAdress = e.get("item").value;
          });
        }
      });
    };
    document.head.append(script);
    return () => {
      document.head.querySelector("script#ymaps").remove();
    };
  });
</script>

<form
  {id}
  on:submit|preventDefault={sendUserDataToParent}
  class="text-left d-flex flex-column align-items-center"
>
  <div class:active={isActivePage} class="none">
    <!--Фамилия-->
    <InputField
      bind:userdata={userData.surname}
      callback={(e) =>
        (currentValidationState = validator(
          e,
          userData.surname,
          currentValidationState
        ))}
      id="inputSurname"
      name="inputSurname"
      type="text"
      {currentValidationState}
      labelText="Фамилия*"
    />

    <!--Имя-->
    <InputField
      bind:userdata={userData.name}
      callback={(e) =>
        (currentValidationState = validator(
          e,
          userData.name,
          currentValidationState
        ))}
      id="inputName"
      name="inputName"
      type="text"
      {currentValidationState}
      labelText="Имя*"
    />
    <!--Отчество-->
    <InputField
      bind:userdata={userData.patronymic}
      callback={(e) =>
        (currentValidationState = validator(
          e,
          userData.patronymic,
          currentValidationState
        ))}
      id="inputPatronymic"
      name="inputPatronymic"
      type="text"
      {currentValidationState}
      labelText="Отчество*"
    />
    <InputField
      bind:userdata={userData.email}
      callback={(e) => {
     checkUser(e);
      }}
      id="inputEmail"
      name="inputEmail"
      type="email"
      {currentValidationState}
      labelText="Email*"
    />
    <InputField
      bind:userdata={userData.phonenumber}
      callback={(e) =>
        (currentValidationState = validator(
          e,
          userData.phonenumber,
          currentValidationState
        ))}
      id="inputPhoneNumber"
      type="tel"
      ipnutHandler={phoneValidator}
      name="inputPhoneNumber"
      {currentValidationState}
      labelText="Телефон*"
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
      labelText="Пароль*"
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
    <div class="precaution position-relative bottom-border">
      Пожалуйста, тщательно проверьте все введенные данные. Для изменения
      некоторой информации после регистрации потребуется подтверждение личности.
      <br />* - обязательные поля
    </div>
    <div class="d-flex flex-row justify-content-center align-items-center">
      <input
        class=""
        id="confirmation"
        type="checkbox"
        bind:checked={confirmation}
        on:change={console.log(confirmation)}
      />
      <label class="d-pr-confirm-label" for="confirmation">
        Согласен на обработку персональных данных
      </label>
    </div>
    <Button
      on:click={handleButtonNextPage}
      content={"Продолжить"}
      classes={"m-button_margin-increased"}
    />
    <!-- <button
      type="button"
      class="continue-button m-button"
      on:click={handleButtonNextPage}>Продолжить</button
    >-->
  </div>

  <div class:active={!isActivePage} class="none">
    <button
      type="button"
      class="previous-page-button"
      on:click={handleButtonNextPage}
    >
      <img src="images/pointer.svg" alt="previous-page-button" />
    </button>
    <InputField
      bind:userdata={userData.birthdate}
      callback={(e) =>
        (currentValidationState = validator(
          e,
          userData.birthdate,
          currentValidationState
        ))}
      id="inputBirthDate"
      name="inputBirthDate"
      type="date"
      {currentValidationState}
      labelText="Дата рождения"
    />
    <SelectField
      bind:userdata={userData.education}
      id="inputEducation"
      name="inputEducation"
      array={educationLevel}
      labelText="Образование"
    />
    <InputField
      bind:userdata={userData.speciality}
      validation={false}
      id="inputSpeciality"
      name="inputSpeciality"
      type="text"
      labelText="Специальность"
    />
    <SelectField
      bind:userdata={userData.degree}
       id="inputDegree"
      name="inputDegree"
      array={academicDegrees}
      labelText="Ученая степень"
    />
    <InputField
      bind:userdata={userData.placeofwork}
      validation={false}
      id="inputPlaceofwork"
      name="inputPlaceofwork"
      type="text"
      labelText="Место работы/дневной учебы"
    />
    <InputField
      bind:userdata={userData.position}
      validation={false}
      id="inputPosition"
      name="inputPosition"
      type="text"
      labelText="Должность"
    />
    <InputField
      bind:userdata={userData.registrationAdress}
      validation={false}
      id={id == "reg-form-screen" ? "suggest-one" : "suggest-three"}
      name="inputRegistrationAdress"
      type="text"
      labelText="Адрес регистрации"
    />
    <InputField
      bind:userdata={userData.actualAdress}
      validation={false}
      id={id == "reg-form-screen" ? "suggest-two" : "suggest-four"}
      name="inputActualAdress"
      type="text"
      labelText="Адрес проживания"
    />
    <div class="precaution position-relative">
      Пожалуйста, тщательно проверьте все введенные данные. Для изменения
      некоторой информации после регистрации потребуется подтверждение личности.
    </div>
    <button on:click={clearInput} class="clear-button" type="button"
      >Сбросить все</button
    >
    <Button
      on:click={clearInput}
      type={"button"}
      content={"Сбросить все"}
      classes={"m-button_margin-reduced mobile"}
    />
    <Button
      disabled={!isRegButtonActive || !confirmation}
      type={"submit"}
      content={"Продолжить"}
      classes={"m-button_margin-reduced"}
    />
    <!-- <button
      disabled={!isRegButtonActive || !confirmation}
      class="m-button reg-button"
      type="submit">Закончить и войти</button
    >-->
  </div>
</form>

<style>
  form {
    margin-top: 20px;
  }
  .previous-page-button {
    background-color: transparent;
    border: none;
    outline: none;
    position: absolute;
    top: 20px;
    left: 20px;
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
  .none {
    display: none;
  }

  .active {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .d-pr-confirm-label {
    margin: 0 0 0 13px;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 17px;
  }

  .precaution {
    width: 363px;
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.02em;
    padding: 0 0 15px 0;
    margin-bottom: 15px;
    color: #dc5f9f;
  }

  @media screen and (max-width: 720px) {
    .clear-button {
      display: none;
      margin: 10px 0 20px 0;
      position: initial;
      align-self: flex-end;
    }
  }
  @media screen and (max-width: 720px) {
    .precaution {
      width: 253px;
      font-size: 12px;
      line-height: 17px;
      margin-bottom: 10px;
    }
    .d-pr-confirm-label {
      font-size: 12px;
      line-height: 13px;
    }
    .previous-page-button {
      /* top: 20px;*/
      left: 10px;
    }
  }
</style>
