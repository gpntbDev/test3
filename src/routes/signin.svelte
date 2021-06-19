<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import ActivationOfLibraryCard from "../components/ActivationOfLibraryCard.svelte";
  import Button from "../components/Button.svelte";
  import InputField from "../components/InputField.svelte";
  import Logo from "../components/Logo.svelte";
  import LoginForm from "../components/LoginForm.svelte";
  import DigitCodeInput from "../components/DigitCodeInput.svelte";
  import RegistrationForm from "../components/RegistrationForm.svelte";
  import { sendCode, compareCodes, resetPassword } from "../api/api";
  import AnimatedPreloader from "../components/AnimatedPreloader.svelte";

  export let size;
  export let type = "login";
  let pending = false;
  let emailForChangePassword;
  let changedPassword;
  let repeatedChangedPassword;
  let activeLeftBlock = "welcome-page";
  let activeMobileBlock = "login-page";

  let activeRightBlock = "welcome-page";
  let typeOfLogin = "email";

  let codeForResetPassword = { first: "", second: "", third: "", four: "" };

  async function handleSendingCode() {
    let reqBody = {};
    reqBody.user = emailForChangePassword;
    try {
      pending = true;
      await sendCode(reqBody);
      type = "restore-password-check-digit-code";
      activeMobileBlock = "restore-password-check-digit-code";
    } catch (err) {
      pending = false;
      console.log(err);
      alert(err);
    } finally {
      pending = false;
    }
  }

  async function handleDigitCode() {
    let reqBody = {};
    reqBody.user = emailForChangePassword;
    reqBody.code = `${codeForResetPassword.first}${codeForResetPassword.second}${codeForResetPassword.third}${codeForResetPassword.four}`;
    try {
      pending = true;
      console.log(reqBody.code);
      await compareCodes(reqBody);
      type = "restore-password-change-password";
      activeMobileBlock = "restore-password-change-password";
    } catch (err) {
      pending = false;
      console.log(err);
      alert(err);
    } finally {
      pending = false;
    }
  }

  async function handleChangePassword() {
    let reqBody = {};
    reqBody.user = emailForChangePassword;
    reqBody.password = changedPassword;
    try {
      pending = true;
      await resetPassword(reqBody);
      type = "login";
      activeMobileBlock = "login-page";
    } catch (err) {
      pending = false;
      console.log(err);
      alert(err);
    } finally {
      pending = false;
    }
  }
</script>

<svelte:window bind:innerWidth={size} />

{#if size > 720}
  <div class="main-container">
    <div class="left-block">
      {#if type == "login"}
        <div class="bottom-border position-relative">
          <h2 class="title">Регистрация</h2>
        </div>
        <div class="left-block__text">
          Всего 5 минут, и вы — читатель ГПНТБ СО РАН
        </div>
        <a href="/signup?type=registraion-without-library-card">
          <Button
            classes={"m-button_color_white m-button_margin-null"}
            content={"Зарегистрироваться"}
          />
        </a>
        <div class="bottom-border position-relative">
          <h2 class="title">Читательский билет</h2>
        </div>
        <div class="left-block__text">
          Если у вас уже есть читательский билет, активируйте аккаунт
        </div>
        <a href="/signup?type=registraion-with-library-card">
          <Button
            classes={"m-button_color_white m-button_margin-null"}
            content={"Активировать"}
          />
        </a>
        <div
          class="left-block__data-safety d-flex flex-column justify-content-center align-items-center"
        >
          <img src="images/lock.svg" alt="lock-svg" />
          <p class="data-safety">Ваши данные в безопасности</p>
        </div>
      {/if}

      {#if type == "restore-password-send-code"}
        <div class="bottom-border position-relative">
          <h2 class="title">ЗАБЫЛИ ПАРОЛЬ?</h2>
        </div>
        <div class="left-block__text">
          Введите email, который вы использовали при регистрации. и мы вышлем
          вам проверочный код для восстановления пароля
        </div>
        <div
          class="left-block__data-safety d-flex flex-column justify-content-center align-items-center"
        >
          <img src="images/lock.svg" alt="lock-svg" />
          <p class="data-safety">Ваши данные в безопасности</p>
        </div>
      {/if}

      {#if type == "restore-password-check-digit-code"}
        <div class="bottom-border position-relative">
          <h2 class="title">введите код</h2>
        </div>
        <div class="left-block__text">Введите проверочный код из письма</div>
        <div
          class="left-block__data-safety d-flex flex-column justify-content-center align-items-center"
        >
          <img src="images/lock.svg" alt="lock-svg" />
          <p class="data-safety">Ваши данные в безопасности</p>
        </div>
      {/if}

      {#if type == "restore-password-change-password"}
        <div class="bottom-border position-relative">
          <h2 class="title">Введите пароль</h2>
        </div>
        <div class="left-block__text">
          Придумайте и введите новый пароль для входа в ваш аккаунт
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
      {#if type == "login"}
        <div class="bottom-border position-relative">
          <h2 class="right-block__title">Войти в аккаунт</h2>
        </div>
        <span class="right-block__text">используя</span>
        <div class="login-choice-block">
          <button
            on:click={() => {
              typeOfLogin = "email";
            }}
            type="button"
            class:login-choice-button_active={typeOfLogin == "email"}
            class="login-choice-button login-choice-button_active">email</button
          >
          <button
            on:click={() => {
              typeOfLogin = "library-card";
            }}
            type="button"
            class:login-choice-button_active={typeOfLogin == "library-card"}
            class="login-choice-button">Читательский билет</button
          >
        </div>
        <LoginForm 
           signIn = {true}    
          {typeOfLogin}
          on:reset={() => {
            type = "restore-password-send-code";
          }}
        />
        <a class="privacy-policy-link" href="#">Политика конфиденциальности</a>
      {/if}

      {#if type == "restore-password-send-code"}
        <div class="bottom-border position-relative">
          <h2 class="right-block__title">Восстановление пароля</h2>
        </div>
        <div class="wrapper-center">
          <InputField
            bind:userdata={emailForChangePassword}
            id="inputEmail"
            validation={false}
            type="text"
            name="inputLibraryCard"
            labelText="Email"
          />
          <Button
            type={"button"}
            on:click={handleSendingCode}
            content={"Отправить код"}
          />
        </div>
      {/if}

      {#if type == "restore-password-check-digit-code"}
        <div class="bottom-border position-relative">
          <h2 class="right-block__title">Восстановление пароля</h2>
        </div>
        <div class="wrapper-center">
          <DigitCodeInput bind:value={codeForResetPassword} />
          <Button
            type={"button"}
            on:click={handleDigitCode}
            content={"Подтвердить"}
          />
        </div>
      {/if}

      {#if type == "restore-password-change-password"}
        <div class="bottom-border position-relative">
          <h2 class="right-block__title">Восстановление пароля</h2>
        </div>
        <div class="wrapper-center">
          <InputField
            bind:userdata={changedPassword}
            id="inputPassword"
            validation={false}
            type="text"
            name="inputPassword"
            labelText="Новый пароль"
          />
          <InputField
            bind:userdata={repeatedChangedPassword}
            id="inputRepeatedPassword"
            validation={false}
            type="text"
            name="inputRepeatedPassword"
            labelText="Повторите пароль"
          />
          <Button
            on:click={handleChangePassword}
            type={"button"}
            content={"Сохранить"}
          />
        </div>
      {/if}
    </div>
  </div>
{/if}

{#if size <= 720}
  <div class="mobile-block">
    {#if activeMobileBlock == "login-page"}
      <div class="bottom-border position-relative">
        <h2 class="right-block__title">Войти в аккаунт</h2>
      </div>

      <span class="right-block__text">используя</span>
      <div class="login-choice-block">
        <button
          on:click={() => {
            typeOfLogin = "email";
          }}
          type="button"
          class:login-choice-button_active={typeOfLogin == "email"}
          class="login-choice-button login-choice-button_active">email</button
        >
        <button
          on:click={() => {
            typeOfLogin = "library-card";
          }}
          type="button"
          class:login-choice-button_active={typeOfLogin == "library-card"}
          class="login-choice-button">Читательский билет</button
        >
      </div>
      <LoginForm
        on:reset={() => {
          activeMobileBlock = "restore-password-send-code";
        }}
        {typeOfLogin}
      />
      <div class="top-border position-relative">
        <Button
          on:click={() => {
            activeMobileBlock = "registration-redirect";
          }}
          content={"Зарегистрироваться"}
        />
      </div>

      <a class="privacy-policy-link position-absolute" href="#"
        >Политика конфиденциальности</a
      >
    {/if}

    {#if activeMobileBlock == "registration-redirect"}
      <div class="mobile-blue-container">
        <div class="bottom-border position-relative">
          <h2 class="title">Регистрация</h2>
        </div>
        <div class="left-block__text">
          Заполните все поля, чтобы получить читательский билет и доступ к
          личному аккаунту
        </div>
        <a href="/signup?type=registraion-without-library-card">
          <Button
            classes={"m-button_color_white m-button_margin-null m-button_margin-bottom-increased"}
            content={"Зарегистрироваться"}
          /></a
        >
        <div class="bottom-border position-relative">
          <h2 class="title">читательский билет</h2>
        </div>
        <div class="left-block__text">
          Если у вас уже есть читательский билет, активируйте аккаунт
        </div>
        <a href="/signup?type=registraion-with-library-card">
          <Button
            classes={"m-button_color_white m-button_margin-null"}
            content={"Активировать"}
          /></a
        >
      </div>
    {/if}

    {#if activeMobileBlock == "restore-password-send-code"}
      <div class="bottom-border position-relative">
        <h2 class="right-block__title">Восстановление пароля</h2>
      </div>
      <p class="restore-password-text">
        Введите email, который вы использовали при регистрации. и мы вышлем вам
        проверочный код для восстановления пароля
      </p>
      <div class="wrapper-center">
        <InputField
          bind:userdata={emailForChangePassword}
          id="inputEmail"
          validation={false}
          type="text"
          name="inputLibraryCard"
          labelText="Email"
        />
        <Button
          type={"button"}
          on:click={handleSendingCode}
          content={"Отправить код"}
        />
      </div>
    {/if}

    {#if activeMobileBlock == "restore-password-check-digit-code"}
      <div class="bottom-border position-relative">
        <h2 class="right-block__title">Восстановление пароля</h2>
      </div>
      <p class="restore-password-text">Введите проверочный код из письма</p>
      <div class="wrapper-center">
        <DigitCodeInput bind:value={codeForResetPassword} />
        <Button
          type={"button"}
          on:click={handleDigitCode}
          content={"Подтвердить"}
        />
      </div>
    {/if}

    {#if activeMobileBlock == "restore-password-change-password"}
      <div class="bottom-border position-relative">
        <h2 class="right-block__title">Восстановление пароля</h2>
      </div>
      <p class="restore-password-text">
        Придумайте и введите новый пароль для входа в ваш аккаунт
      </p>
      <div class="wrapper-center">
        <InputField
          bind:userdata={changedPassword}
          id="inputPassword"
          validation={false}
          type="text"
          name="inputPassword"
          labelText="Новый пароль"
        />
        <InputField
          bind:userdata={repeatedChangedPassword}
          id="inputRepeatedPassword"
          validation={false}
          type="text"
          name="inputRepeatedPassword"
          labelText="Повторите пароль"
        />
        <Button
          on:click={handleChangePassword}
          type={"button"}
          content={"Сохранить"}
        />
      </div>
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
  .login-choice-block {
    display: flex;
    flex-direction: column;
    font-family: Blogger Sans;
    font-size: 26px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 0.02em;
  }
  .login-choice-button {
    text-decoration-line: underline;
    font-style: normal;
    font-weight: bold;
    text-transform: uppercase;
    color: #d0d0d0;
    background-color: transparent;
    border: none;
    margin: 0 0 20px 0;
  }
  .login-choice-button:focus {
    outline: none;
  }
  .login-choice-button_active {
    color: #035ba0;
  }

  .wrapper-center {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .restore-password-text {
    max-width: 322px;
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    text-align: center;
    letter-spacing: 0.02em;
    color: #333333;
    margin-top: 10px;
  }

  @media screen and (max-width: 720px) {
    .login-choice-block {
      font-size: 20px;
      line-height: 28px;
    }
    .login-choice-button {
      margin: 0 0 10px 0;
    }
    .wrapper-center {
      margin-top: 125px;
    }
  }
</style>
