<script>
  export let username;
  export let surname;
  export let patronymic;
</script>

<h2 class="user-name">{username} {patronymic} {surname}</h2>

<style>
  .user-name {
    max-width: 235px;
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 34px;
    line-height: 48px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #035ba0;
    margin: 10px 0;
  }
  @media screen and (max-width: 1440px) {
    .user-name {
      font-size: 26px;
      line-height: 36px;
    }
  }
</style>
