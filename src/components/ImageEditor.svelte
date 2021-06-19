<script>
  import { onMount } from "svelte";
 
</script>

<div class="image-editor-wrapper">
  <div class="image-editor">
    <img
      class="photo-loaded-by-user"
      src=""
      alt="user"
    />
  </div>
  <div class="toolbar">
    <button class="toolbar-button" on:click="{()=>{}}">ok</button>
    <button class="toolbar-button">cancel</button>
  </div>
</div>

<style>
  .toolbar {
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
  }
  .toolbar-button {
    width: 50px;
    height: 50px;
    opacity: .5;
  }
  .toolbar-button:hover {
    opacity: 1;
  }

  img {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
  .image-editor-wrapper {
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
  .image-editor {
    font-family: Blogger Sans;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 655px;
  }
</style>
