<script>
	export let segment;
	
</script>

<main class="d-flex flex-column justify-content-center align-items-center" class:main-admin={segment === "testapi" || segment ==="userlist"}>
	<slot />
</main>

<style>
	main {
		min-height: 100vh;
		background-color: #8ab5e1;
	}

	.main-admin {
		background-color: #E5E5E5;

	} 


	

	/*@media screen and (max-width: 1200px) {
		main {
			padding-top: 107px;
		}
	}*/

	@media screen and (max-width: 720px) {
		main {
			justify-content: flex-start !important;
		}
		
	}
</style>
