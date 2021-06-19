<script>
  export let classes = "";
  export let fieldName = "";
  export let fieldValue = "";
</script>

<div class="statistic-block-item {classes}">
  <span class="field-name">{fieldName}</span><span class="field-value"
    >{fieldValue}</span
  >
</div>

<style>
  .statistic-block-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 54px;
    border-radius: 5px;
    background: rgba(242, 242, 242, 0.5);
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;
    letter-spacing: 0.02em;
    color: #333333;
    margin: 10px 0 0 0;
  }
  .statistic-block-item:first-of-type {
    margin: 0;
  }

  .statistic-block-item_type_increased-margin-top {
    margin: 20px 0 0 0;
  }

  .field-value {
    color: #3f51b5;
    font-weight: bold;
  }
</style>
