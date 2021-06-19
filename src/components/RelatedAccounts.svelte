<script>
  import ToogleButton from "./ToogleButton.svelte";
</script>

<div class="related-accounts">
  <ul class="related-accounts-list">
    <li class="related-accounts-list-item">
      <img src="vk.svg" alt="vk" /><span>Не связан</span><ToogleButton />
    </li>
    <li class="related-accounts-list-item">
      <img src="fb.svg" alt="fb" /><span>Не связан</span><ToogleButton />
    </li>
    <li class="related-accounts-list-item">
      <img src="google.svg" alt="google" /><span>Не связан</span><ToogleButton
      />
    </li>
    <li class="related-accounts-list-item">
      <img src="orcid.svg" alt="orcid" /><span>Не связан</span><ToogleButton />
    </li>
    <li class="related-accounts-list-item">
      <img src="gosuslugi.png" alt="gosuslugi" /><span>Не связан</span
      ><ToogleButton />
    </li>
  </ul>
</div>

<style>
  .related-accounts {
    display: flex;
    width: 100%;
  }
  .related-accounts-list {
    width: 100%;
    padding: 0;
    margin: 20px 0 0 0;
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.02em;
  }
  .related-accounts-list-item {
    margin: 0 0 15px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (max-width: 1440px) {
    .related-accounts-list {
      font-size: 12px;
      line-height: 17px;
    }
  }
</style>
