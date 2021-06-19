<script>
</script>

<div class="search-history">
  <span class="recent"> Недавние: </span>
  <slot />
</div>

<style>
  .search-history {
      width: 100%;
    max-width: 1137px;
    height: 40px;
    border: 2px solid #3f51b5;
    box-sizing: border-box;
    padding-left: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .recent {
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;
    text-align: center;
    letter-spacing: 0.04em;
    color: #bdbdbd;
  }
</style>
