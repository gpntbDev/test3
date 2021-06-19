<script>
    import {validator} from "../utils/validator";
    import { validationState } from "../utils/validationState";
    import { afterUpdate, onDestroy } from "svelte";
    import { goto } from "@sapper/app";
    import { signin } from "../api/api";
    import InputField from "../components/InputField.svelte";

    let userData = {
        email: "",
        password: "",
    };

    let isRegButtonActive = false;
    let confirmation;

    let currentValidationState = validationState;

    function handleSubmit() {
        signin(userData)
            .then((res) => {
                console.log(res);
                //localStorage.setItem("token", res.token);
                if (res == "Wrong password" || !res) {
                    throw new Error(res);
                }
                alert("Вы успешно вошли");
                let url = "http://client.gpntbsib.ru:3002/savetoken?token=" + res.token;
                goto(url);
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            });
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
        for (let i in userData) {
            if (!userData[i]) {
                isRegButtonActive = false;
                return;
            }
            isRegButtonActive = true;
        }
        console.log(validationState);
    });
    onDestroy(() => {
        clearInput();
    });
</script>

<div class="main-container d-flex flex-row">
    <a href="/">
		<div class="logo">
			<img class="logo-image" src="logo.svg" alt="logo" />
		</div>
	</a>
    <div class="description">
        <h2 class="description__title">Добро пожаловать!</h2>
        <p class="description__text top-border">
            Пройдите небольшую регистрацию и начните пользоваться уже сейчас!
        </p>
        <a
            class="m-button m-button_color_white signup-button text-center d-flex justify-content-center align-items-center"
            href="/signup">Регистрация</a
        >
    </div>
    <div
        class="reg-form flex-fill position-relative d-flex flex-column align-items-center"
    >
        <h2
            class="reg-form__title log-form__title text-center bottom-border position-relative"
        >
            Войти в аккаунт
        </h2>
        <p class="description__text pt-0">с помощью</p>
        <div
            class="description__links bottom-border d-flex justify-content-center align-items-center"
        >
            <a href="/auth/vkontakte" class="auth-link auth-link_color_blue">
                <img src="vk-blue.svg" alt="vk-profile-link" />
            </a>
            <a href="/auth/facebook" class="auth-link">
                <img src="fb-blue.svg" alt="fb-profile-link" />
            </a>
            <a href="/auth/orcid" class="auth-link">
                <img src="orcid-blue.svg" alt="orcid-profile-link" />
            </a>
        </div>
        <p class="description__text">или используя почту</p>
        <form
            on:submit|preventDefault={handleSubmit}
            class="text-left d-flex flex-column align-items-center"
        >
            <InputField
                bind:userdata={userData.email}
                validation={false}
                id="inputEmail"
                type="email"
                {currentValidationState}
                labelText="Email"
            />
            <InputField
                bind:userdata={userData.password}
                validation={false}
                id="inputPassword"
                type="password"
                {currentValidationState}
                labelText="Пароль"
            />
            <div
                class="d-flex flex-row justify-content-center align-items-center"
            >
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
            <button
                disabled={!isRegButtonActive}
                class="m-button log-button"
                type="submit">Войти</button
            >

            <button on:click={clearInput} class="clear-button" type="button"
                >Сбросить все</button
            >
        </form>
        <div
            class="mobile text-center top-border position-relative signup-button-container"
        >
            <a class="m-button signup-button mobile" href="/signup"
                >Регистрация</a
            >
        </div>
        <a class="privacy-policy-link" href="#">Политика конфиденциальности</a>
    </div>
</div>

<style>
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
</style>
