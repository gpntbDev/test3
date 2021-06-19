<script>
  import UserAccountStateMarker from "../admin/UserAccountStateMarker.svelte";
</script>

<div class="account-state-container">
  <UserAccountStateMarker />
  <span class="account-state">Ожидает верификации</span>
</div>

<style>
  .account-state-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .account-state {
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;
    letter-spacing: 0.02em;
  }
</style>
