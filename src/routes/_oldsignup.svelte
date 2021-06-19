<script>
	import RegistrationForm from "../components/RegistrationForm.svelte";

	let hidden = false;
	let size;
	let active = false;
	let content;

	function handleTitleContent(e) {
		if (!e.detail.state) {
			content = "Добавьте информацию";
		} else {
			content = "Регистрация";
		}
	}

	function handleResize(event) {
		console.log(event.currentTarget.innerWidth);
		size = event.currentTarget.innerWidth;
	}
</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<svelte:window on:resize={handleResize} />

<!--<div class="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">-->
<div class="main-container d-flex flex-row">
	<a href="/">
		<div class="logo">
			<img class="logo-image" src="logo.svg" alt="logo" />
		</div>
	</a>
	<div class="left-block welcome-screen" class:hidden={active || hidden}>
		<h2 class="title">Добро пожаловать!</h2>
		<p class="left-block__text top-border">
			Пройдите небольшую регистрацию и начните пользоваться уже сейчас!
		</p>
		<div class="position-relative">
			<button
				type="button"
				on:click={() => (active = !active)}
				class="m-button m-button_color_white  welcome-button"
				>Регистрация</button
			>
		</div>
		<p class="left-block__text top-border">Уже есть аккаунт?</p>
		<a href="/login">
			<button
				type="button"
				class="m-button m-button_color_white  welcome-button"
				>Войти</button
			>
		</a>
	</div>



	<div class="left-block" class:hidden class:active={size >= 720 || active}>
		<h2 class="title">{content || "Регистрация"}</h2>
		<p class="left-block__text bottom-border top-border">
			Мы запрашиваем Ваши личные данные, чтобы создать для Вас
			индивидуальный аккаунт.
		</p>
		<p class="left-block__text">
			Также, Вы можете зарегистрироваться с помощью
		</p>
		<div
			class="left-block__links bottom-border d-flex justify-content-center align-items-center"
		>
			<a href="/auth/vkontakte" class="auth-link">
				<img src="vk.svg" alt="vk-profile-link" />
			</a>
			<a href="/auth/facebook" class="auth-link">
				<img src="fb.svg" alt="fb-profile-link" />
			</a>
			<a href="/auth/orcid" class="auth-link">
				<img src="orcid.svg" alt="orcid-profile-link" />
			</a>
		</div>
		<button
			type="button"
			class="left-block__google-link d-flex justify-content-center align-items-center"
			><img src="google-symbol.svg" alt="google-symbol" />
			<span class="left-block__google-link-text">Google</span>
		</button>
		<div class="top-border position-relative mobile">
			<button
				type="button"
				on:click={() => {
					hidden = !hidden;
					active = !active;
				}}
				class="continue-button m-button m-button_color_white mobile"
				>Продолжить</button
			>
		</div>
		<div
			class="left-block__data-safety d-flex flex-column justify-content-center align-items-center"
		>
			<img src="lock.svg" alt="lock-svg" />
			<p class="data-safety">Ваши данные в безопасности</p>
		</div>
	</div>


	
	
	<div class="right-block text-center" class:active={hidden}>
		<div class="align-self-end login-link-container">
			<span
				>Уже есть аккаунт?<a
					class="login-link"
					href="/login">Войти</a
				></span
			>
		</div>
		<h2 class="right-block__title text-center bottom-border position-relative">
			Заполните данные
		</h2>
		<RegistrationForm on:page={handleTitleContent} />
		<a class="privacy-policy-link" href="#">Политика конфиденциальности</a>
	</div>
</div>

<style>
	.active {
		display: flex !important;
	}

	
	.hidden {
		display: none;
	}

</style>
