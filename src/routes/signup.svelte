<script context="module">
  export async function preload(page, session) {
    let { type } = page.query;
    if (type == "captcha") {
      type = "welcome-page";
    }
    return { type };
  }
</script>

<script>
  import { onMount, afterUpdate } from "svelte";
  import { goto } from "@sapper/app";
  import { fade, fly } from "svelte/transition";
  import InputField from "../components/InputField.svelte";
  import AnimatedPreloader from "../components/AnimatedPreloader.svelte";
  import ActivationOfLibraryCard from "../components/ActivationOfLibraryCard.svelte";
  import Button from "../components/Button.svelte";
  import Logo from "../components/Logo.svelte";
  import RegistrationForm from "../components/RegistrationForm.svelte";
  import RecaptchaV2 from "../components/ReCaptchaV2.svelte";
  import {
    sendUserData,
    loginEmail,
    signupByCard,
    checkUserEmail,
  } from "../api/api";
  import Popup from "../components/Popup.svelte";

  export let type;
  export let size;

  let pending = false;
  let userData;
  let popup;
  let capture;
  let activeLeftBlock = type || "welcome-page";
  let activeRightBlock = type || "welcome-page";
  let activeMobileBlock = type || "welcome-page-animated";
  if (activeMobileBlock == "welcome-page-animated") {
    setTimeout(() => {
      activeMobileBlock = "welcome-page";
    }, 1000);
  }

  async function handleUserData() {
    popup = "";
    pending = true;
    try {
      console.log(userData);
      await sendUserData(userData);
      await loginEmail({ email: userData.email, password: userData.password });
      pending = false;
      goto("/");
    } catch (err) {
      pending = false;
      console.log(err);
      alert("Ошибка регистрации");
    }
  }

  async function activateCard() {
    try {
      await signupByCard(userData);
      await loginEmail(userData);
      goto("/");
    } catch (err) {
      console.log(err);
      alert("Ошибка регистрации");
    }
  }

  afterUpdate(() => {
    console.log(size);
  });
</script>

<svelte:window bind:innerWidth={size} />

{#if size > 720}
  <div class="main-container">
    <div class="left-block">
      {#if activeLeftBlock == "welcome-page"}
        <div class="bottom-border position-relative">
          <h2 class="title">Добро пожаловать!</h2>
        </div>
        <a href="/login">
          <Button
            classes={"m-button_color_white"}
            content={"Войти в аккаунт"}
          />
        </a>
      {/if}

      {#if activeLeftBlock == "registraion-without-library-card"}
        <div class="bottom-border position-relative">
          <h2 class="title">Регистрация</h2>
        </div>
        <div class="left-block__text">
          Заполните все поля, чтобы получить читательский билет и доступ к
          личному аккаунту
        </div>
        <div class="bottom-border position-relative">
          <h2 class="title">Читательский билет</h2>
        </div>
        <div class="left-block__text">
          Если у вас уже есть читательский билет, активируйте аккаунт
        </div>
        <Button
          on:click={() => {
            activeLeftBlock = "registraion-with-library-card";
            activeRightBlock = "registraion-with-library-card";
          }}
          classes={"m-button_color_white m-button_margin-null"}
          content={"Активировать"}
        />
        <div
          class="left-block__data-safety d-flex flex-column justify-content-center align-items-center"
        >
          <img src="images/lock.svg" alt="lock-svg" />
          <p class="data-safety">Ваши данные в безопасности</p>
        </div>
      {/if}

      {#if activeLeftBlock == "registraion-without-library-card-continuation"}
        <div
          class="wrap-container-for-restrict-width bottom-border position-relative"
        >
          <h2 class="title text-center">добавьте информацию о себе</h2>
        </div>
        <div class="left-block__text">
          Хотим узнать вас лучше, чтобы быть полезными именно вам
        </div>
        <div
          class="left-block__data-safety d-flex flex-column justify-content-center align-items-center"
        >
          <img src="images/lock.svg" alt="lock-svg" />
          <p class="data-safety">Ваши данные в безопасности</p>
        </div>
      {/if}

      {#if activeLeftBlock == "registraion-with-library-card"}
        <div
          class="wrap-container-for-restrict-width bottom-border position-relative"
        >
          <h2 class="title text-center">Активация читательского билета</h2>
        </div>
        <div class="left-block__text">Для продолжения введите данные</div>
        <div
          class="left-block__data-safety d-flex flex-column justify-content-center align-items-center"
        >
          <img src="images/lock.svg" alt="lock-svg" />
          <p class="data-safety">Ваши данные в безопасности</p>
        </div>
      {/if}

      {#if activeLeftBlock == "captcha"}
        <div class="bottom-border position-relative">
          <h2 class="title">ПОСЛЕДНИЙ ШАГ</h2>
        </div>
        <div
          class="left-block__data-safety d-flex flex-column justify-content-center align-items-center"
        >
          <img src="images/lock.svg" alt="lock-svg" />
          <p class="data-safety">Ваши данные в безопасности</p>
        </div>
      {/if}
    </div>

    <div class="right-block">
      {#if activeRightBlock == "welcome-page"}
        <div class="bottom-border position-relative">
          <h2 class="right-block__title">Онлайн-регистрация</h2>
        </div>
        <div class="library-photo" />
        <div class="welcome-text bottom-border position-relative">
          Регистрация на сайте ГПНТБ СО РАН — первый шаг к сотням тысяч книг и
          безграничным знаниям. Для начала давайте определимся, есть ли у вас
          читательский билет?
        </div>
        <Button
          on:click={() => {
            activeLeftBlock = "registraion-with-library-card";
            activeRightBlock = "registraion-with-library-card";
          }}
          classes={"m-button_width_long"}
          content={"Есть читательский билет"}
        />
        <Button
          on:click={() => {
            activeLeftBlock = "registraion-without-library-card";
            activeRightBlock = "registraion-without-library-card";
          }}
          classes={"m-button_width_long"}
          content={"Нет читательского билета"}
        />
      {/if}

      {#if activeRightBlock == "registraion-without-library-card"}
        <div class="align-self-end login-link-container">
          <span
            >Уже есть аккаунт?<a class="login-link" href="/login">Войти</a
            ></span
          >
        </div>
        <button
          class="pointer-button-back"
          class:hidden={activeLeftBlock ==
            "registraion-without-library-card-continuation"}
          type="button"
          on:click={() => {
            activeRightBlock = "welcome-page";
            activeLeftBlock = "welcome-page";
          }}
        >
          <img src="images/pointer.svg" alt="previous-page" />
        </button>
        <div class="bottom-border position-relative">
          <h2 class="right-block__title">Заполните данные</h2>
        </div>
        <RegistrationForm
          id={"reg-form-screen"}
          on:page={(e) => {
            activeLeftBlock = e.detail.state
              ? "registraion-without-library-card"
              : "registraion-without-library-card-continuation";
          }}
          on:submit={(e) => {
            userData = e.detail;
            console.log(e.detail);
            activeRightBlock = "captcha";
            activeLeftBlock = "captcha";
          }}
        />
        <a class="privacy-policy-link" href="#">Политика конфиденциальности</a>
      {/if}

      {#if activeRightBlock == "registraion-with-library-card"}
        <div class="align-self-end login-link-container">
          <span
            >Уже есть аккаунт?<a class="login-link" href="/login">Войти</a
            ></span
          >
        </div>
        <button
          class="pointer-button-back"
          type="button"
          on:click={() => {
            activeRightBlock = "welcome-page";
            activeLeftBlock = "welcome-page";
          }}
        >
          <img src="images/pointer.svg" alt="previous-page" />
        </button>
        <div class="bottom-border position-relative">
          <h2 class="right-block__title">Заполните данные</h2>
        </div>
        <ActivationOfLibraryCard
          on:activate={(e) => {
            userData = e.detail;
            activateCard();
          }}
          on:activate-user-found={() => {
            document.querySelector(".left-block__text").textContent =
              "Проверьте email и придумайте пароль";
          }}
        />
        <a class="privacy-policy-link" href="#">Политика конфиденциальности</a>
      {/if}
      {#if activeRightBlock !== "registraion-with-library-card" && activeRightBlock !== "registraion-without-library-card" && activeRightBlock !== "welcome-page" && activeRightBlock !== "captcha"}
        <h2 class="right-block__title">Ой! Ошибка 404</h2>
      {/if}

      {#if activeRightBlock == "captcha"}
        <button
          class="pointer-button-back"
          type="button"
          on:click={() => {
            activeRightBlock = "registraion-without-library-card";
            activeLeftBlock = "registraion-without-library-card";
          }}
        >
          <img src="images/pointer.svg" alt="previous-page" />
        </button>
        <div class="bottom-border position-relative">
          <h2 class="right-block__title">Подтверждение регистрации</h2>
        </div>
        <div class="captcha-container">
          <RecaptchaV2 />
          <Button
            on:click={handleUserData}
            disabled={true}
            classes={"m-button_margin-null captcha-button-confirm"}
            content={"Подтвердить"}
          />
        </div>
        <a class="privacy-policy-link" href="#">Политика конфиденциальности</a>
      {/if}
    </div>

    {#if popup == "internal-error"}
      <Popup classes={"popup-content_type_internal-error"}>
        <div class="error-container">Произошла ошибка на сервере</div>
        <Button
          on:click={() => {
            goto("/");
          }}
          content={"OK"}
        />
      </Popup>
    {/if}

    <!-- {#if popup == "confirm-email"}
      <Popup>
        <p class="right-block__title">Здравствуйте, {userData.name}</p>
        <p class="confirm-text">
          Для завершения регистрации, пожалуйста, подтвердите свой email:
        </p>
        <InputField
          bind:userdata={userData.email}
          id={"inputEmailConfirmation"}
          validation={false}
          type="text"
          classes={"m-input-margin-bottom-10"}
          name={"inputEmailConfirmation"}
          labelText={"email"}
        />
        <Button content={"Подтвердить"} on:click={handleUserData} />
        <p class="attention">Внимание!</p>
        <p class="disclaimer">
          Нажимая <span class="disclaimer-bold">«ПОДТВЕРДИТЬ»</span>, вы
          соглашаетесь с условиями обработки персональных данных.<br />
          <span class="disclaimer-bold">Обратите внимание:</span> после регистрации
          для изменения некоторой информации потребуется подтверждение личности.
        </p>
      </Popup>
    {/if}-->
  </div>
{/if}

{#if size <= 720}
  <div class="mobile-block">
    {#if activeMobileBlock == "welcome-page-animated"}
      <div out:fade class="welcome-screen-mobile">
        <h2 class="title title_white-text">Добро пожаловать!</h2>
        <div class="book book_mobile">
          <img class="book-image" src="images/book.svg" alt="book" />
        </div>
      </div>
    {/if}

    {#if activeMobileBlock == "welcome-page"}
      <div class="bottom-border position-relative">
        <h2 class="right-block__title">Онлайн-регистрация</h2>
      </div>
      <div class="library-photo" />
      <div class="welcome-text position-relative">
        Регистрация на сайте ГПНТБ СО РАН — первый шаг к сотням тысяч книг и
        безграничным знаниям. Для начала давайте определимся, есть ли у вас
        читательский билет?
      </div>
      <Button
        on:click={() => {
          activeMobileBlock = "registraion-with-library-card";
        }}
        classes={"m-button_margin-null m-button_width_long-mobile"}
        content={"Есть читательский билет"}
      />
      <Button
        on:click={() => {
          activeMobileBlock = "registraion-without-library-card";
        }}
        classes={"m-button_width_long-mobile"}
        content={"Нет читательского билета"}
      />
      <div class="bottom-button-container">
        <div class="top-border position-relative">
          <a href="/login">
            <Button classes={"m-button_color_white"} content={"Войти"} /></a
          >
        </div>
      </div>
    {/if}

    {#if activeMobileBlock == "registraion-without-library-card"}
      <div class="mobile-blue-container">
        <div class="bottom-border position-relative">
          <h2 class="title">Регистрация</h2>
        </div>
        <div class="left-block__text">
          Всего 5 минут, и вы — читатель ГПНТБ СО РАН
        </div>
        <Button
          on:click={() => {
            activeMobileBlock = "registraion-without-library-card-continuation";
          }}
          classes={"m-button_color_white m-button_margin-null"}
          content={"Продолжить"}
        />
      </div>
    {/if}

    {#if activeMobileBlock == "registraion-without-library-card-continuation"}
      <div class="bottom-border position-relative">
        <h2 class="title">Заполните данные</h2>
      </div>
      <RegistrationForm
        on:submit={(e) => {
          userData = e.detail;
          console.log(e.detail);
          activeMobileBlock = "captcha";
        }}
        id={"reg-form-mobile"}
      />
      <a class="privacy-policy-link privacy-policy-link-initial" href="#"
        >Политика конфиденциальности</a
      >
    {/if}

    {#if activeMobileBlock == "registraion-with-library-card"}
      <div class="mobile-blue-container">
        <div class="bottom-border position-relative">
          <h2 class="title">активация читательского билета</h2>
        </div>
        <div class="left-block__text">
          Введите номер читательского билета, остальные данные загрузятся
          автоматически
        </div>
        <Button
          on:click={() => {
            activeMobileBlock = "registraion-with-library-card-continuation";
          }}
          classes={"m-button_color_white m-button_margin-null"}
          content={"Продолжить"}
        />
      </div>
    {/if}

    {#if activeMobileBlock == "registraion-with-library-card-continuation"}
      <div class="bottom-border position-relative">
        <h2 class="title">Заполните данные</h2>
      </div>
      <ActivationOfLibraryCard
        on:activate={(e) => {
          userData = e.detail;
          activateCard();
        }}
      />
      <a class="privacy-policy-link privacy-policy-link-initial" href="#"
        >Политика конфиденциальности</a
      >
    {/if}
    {#if activeMobileBlock == "captcha"}
      <div class="bottom-border position-relative">
        <h2 class="title">Подтверждение регистрации</h2>
      </div>
      <div class="captcha-container">
        <RecaptchaV2 />
        <Button
          on:click={handleUserData}
          disabled={true}
          classes={"m-button_margin-null captcha-button-confirm"}
          content={"Подтвердить"}
        />
      </div>
      <a class="privacy-policy-link" href="#">Политика конфиденциальности</a>
    {/if}

    <!-- 
    {#if popup == "confirm-email"}
      <Popup>
        <p class="right-block__title">Здравствуйте, {userData.name}</p>
        <p class="confirm-text">
          Для завершения регистрации, пожалуйста, подтвердите свой email:
        </p>
        <InputField
          bind:userdata={userData.email}
          id={"inputEmailConfirmation"}
          validation={false}
          type="text"
          classes={"m-input-margin-bottom-10"}
          name={"inputEmailConfirmation"}
          labelText={"email"}
        />
        <Button content={"Подтвердить"} on:click={handleUserData} />
        <p class="attention">Внимание!</p>
        <p class="disclaimer">
          Нажимая <span class="disclaimer-bold">«ПОДТВЕРДИТЬ»</span>, вы
          соглашаетесь с условиями обработки персональных данных.<br />
          <span class="disclaimer-bold">Обратите внимание:</span> после регистрации
          для изменения некоторой информации потребуется подтверждение личности.
        </p>
      </Popup>
    {/if}
    -->
    {#if popup == "internal-error"}
      <Popup classes={"popup-content_type_internal-error"}>
        <div class="error-container">Произошла ошибка на сервере</div>
        <Button
          on:click={() => {
            goto("/");
          }}
          content={"OK"}
        />
      </Popup>
    {/if}
  </div>
{/if}

{#if pending}
  <AnimatedPreloader />
{/if}

<Logo />
<div class="book">
  <img class="book-image" src="images/book.svg" alt="book" />
</div>

<style>
  .bottom-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 0 0;
    background-color: #035ba0;
    width: 100%;
    padding: 20px;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
  }
  .captcha-container {
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .library-photo {
    max-width: 720px;
    width: calc(100% - 40px);
    border-radius: 10px;
    background-image: url("images/library.png");
    background-size: cover;
    background-repeat: no-repeat;
    margin: 20px 20px;
    padding-bottom: 41.25%;
  }
  .welcome-text {
    max-width: 720px;
    width: 100%;
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 34px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #333333;
    padding: 0 0 20px 0;
    margin: 0 0 20px 0;
  }
  .wrap-container-for-restrict-width {
    display: flex;
    width: 226px;
  }
  .hidden {
    display: none;
  }
  .pointer-button-back {
    background-color: transparent;
    border: none;
    outline: none;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .welcome-screen-mobile {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: #035ba0;
  }
  .book_mobile {
    display: block;
    position: initial;
  }
  .title_white-text {
    color: #ffffff;
  }
  .error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Blogger Sans;
    font-size: 21px;
    margin: 0 0 20px 0;
  }

  @media screen and (max-width: 1200px) {
    .welcome-text {
      font-size: 18px;
      line-height: 25px;
    }
  }
  @media screen and (max-width: 720px) {
    .library-photo {
      width: 322px;
      height: 192px;
      padding: 0;
      margin: 10px 10px;
      border-radius: 5px;
      background-size: cover;
    }
    .welcome-text {
      padding: 0;
    }
  }

  @media screen and (min-width: 721px) {
    .mobile-block {
      display: none;
    }
  }
</style>
