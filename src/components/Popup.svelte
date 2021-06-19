<script>
  export let classes = "";
</script>

<div class="popup">
  <div class="popup-content {classes}">
    <slot />
  </div>
</div>

<style>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(51, 51, 51, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup-content {
    font-family: Blogger Sans;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
  }
  .popup-content_justify-center {
    justify-content: center;
    min-height: initial;
    padding: 100px 0;
  }

  .popup-content_type_internal-error {
    justify-content: center;
    width: 500px;
    min-height: 300px;
    border-radius: 20px;
  }

  @media screen and (max-width: 720px) {
    .popup-content {
      width: calc(100% - 32px);
      margin: 0 16px;
      min-height: 438px;
      padding: 10px;
    }
  }
</style>
