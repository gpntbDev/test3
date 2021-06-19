<script>
  export let regDate = "неизвестно";
</script>

<div class="registration-date">Дата регистрации: {regDate}</div>

<style>
  .registration-date {
    margin-top: 20px;
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #333333;
  }
  @media screen and (max-width: 1440px) {
    .registration-date {
      font-size: 12px;
      line-height: 13px;
    }
  }
</style>
