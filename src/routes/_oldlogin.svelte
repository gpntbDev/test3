<script>
  
    import LoginForm from "../components/LoginForm.svelte";
    
</script>

<div class="main-container d-flex flex-row">
    <a href="/">
		<div class="logo">
			<img class="logo-image" src="logo.svg" alt="logo" />
		</div>
	</a>
    <div class="left-block">
        <h2 class="title">Добро пожаловать!</h2>
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
        <LoginForm />
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
    form {
        border: 1px solid #ced4da;
        padding: 30px;
        border-radius: 10px;
    }

    .log-form__title {
        margin-top: 20px;
    }

    .signup-button-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        margin-top: 20px;
    }

    @media screen and (min-width: 720px) {
        .signup-button-container {
            display: none;
        }
    }

    @media screen and (max-width: 720px) {
        .signup-button {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>

