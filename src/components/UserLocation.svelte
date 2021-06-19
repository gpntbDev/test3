<script>
</script>

<div class="user-location">
  <img class="user-location__logo" src="images/location.svg" alt="location" />
  <span class="user-location__text">Россия, Москва</span>
</div>

<style>
  .user-location {
    display: flex;
    font-family: Blogger Sans;
    justify-content: flex-start;
    align-items: center;
    max-width: 135px;
    width: 100%;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #d0d0d0;
    margin: 0 0 10px;
  }
  .user-location__text {
    margin-left: 10px;
  }
  .user-location__logo {
      width: 25px;
      height: 25px;
  }
  @media screen and (max-width: 1440px) {
    .user-location {
      max-width: 105px;
      font-size: 12px;
      line-height: 17px;
    }
    .user-location__logo {
      width: 20px;
      height: 20px;
  }
  }
</style>
