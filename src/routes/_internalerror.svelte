<script>
  import Popup from "../components/Popup.svelte";
  import Button from "../components/Button.svelte";
</script>

<Popup classes={"popup-content_type_internal-error"}>
  <div class="error-container">Произошла ошибка на сервере</div>
  <Button
  on:click={()=>{
      
  }}
  content={"OK"}
  />
</Popup>

<style>
    .error-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: Blogger Sans;
        font-size: 21px;
        margin: 0 0 20px 0;
    }
</style>
