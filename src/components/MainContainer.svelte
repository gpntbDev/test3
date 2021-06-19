<script></script>

<div class="main-container d-flex flex-row">
   <div class="left-block">
    <slot name="left-block">Не указан</slot>
  </div>
  <div class="right-block">
    <slot name="right-block">Не указан</slot>
  </div>
</div>

<style>
  .left-block {
    background-color: #035ba0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    color: white;
    width: 400px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  .right-block {
    position: relative;
    max-width: calc(100% - 307px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
  }
</style>
