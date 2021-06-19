<script>
  export let content;
  export let classes = "";
</script>

<h3 class="subtitle{classes}">{content}</h3>

<style>
  .subtitle {
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 36px;
    letter-spacing: 0.02em;
    color: #333333;
    margin: 0;
    align-self: flex-start;
  }
  .subtitle-with-border {
    padding-top: 23px;
    margin: 20px;
    width: calc(100% - 40px);
  }
  .subtitle-with-top-margin {
    margin-top: 20px;
  }
  @media screen and (max-width: 1440px) {
    .subtitle {
      font-size: 20px;
      line-height: 28px;
    }
  }
</style>
