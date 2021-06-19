<script>
  import { imageLoading } from "../utils/clientImageLoading";
  export let userPhoto = "images/profile.png";
  import { createEventDispatcher } from "svelte";

  export let photoLoading;
  const dispatch = createEventDispatcher();

  const imagePath = !!userPhoto == false ? "images/profile.png" : userPhoto;

  function handlerClick() {
    dispatch("image-input");
  }
</script>

<div class="user-photo-container">
  <img class="user-photo" src={imagePath} alt="user" />

  <button type="button" on:click={handlerClick} class="add-button">
    <input
      class="input-image"
      type="file"
      id="fileElem"
      accept="image/*"
      style={"display:none"}
    />
    <img class="add-button-img" src="images/add.svg" alt="add-button" />
  </button>
</div>

{#if photoLoading}
  <div class="image-editor-wrapper">
    <div class="image-editor">
      <img class="photo-loaded-by-user" src="" alt="img" />
    </div>
    <div class="toolbar">
      <button class="toolbar-button" on:click={() => {
        dispatch('saveImage');
      }}><img class="toolbar-button-icon" src="images/save-photo.svg" alt="save"/></button>
      <button on:click={() => {
        dispatch('reset');
      }} class="toolbar-button"><img class="toolbar-button-icon" src="images/cancel-save-photo.svg" alt="cancel"/></button>
    </div>
  </div>
{/if}

<style>
  .toolbar {
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
  }
  .toolbar-button {
    background-color: transparent;
    width: 50px;
    height: 50px;
    opacity: 0.5;
    border: none;
    margin-right: 10px;
  }
  .toolbar-button-icon {
    width: 70px;
    height: 70px;
  }
  .toolbar-button:hover {
    opacity: 1;
    
  }
  .toolbar-button-icon:hover {
    color: #035BA0;
  }

  .photo-loaded-by-user {
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
    z-index: 120;
  }
  .image-editor {
    font-family: Blogger Sans;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 655px;
  }

  .user-photo-container {
    width: 145px;
    height: 120px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .user-photo {
    width: 120px;
    height: 120px;
    border-radius: 1000px;
    object-fit: cover;
  }
  .add-button {
    padding: 0;
    border: 0;
    background-color: transparent;
  }

  @media screen and (max-width: 1440px) {
    .user-photo-container {
      width: 120px;
      height: 100px;
    }
    .user-photo {
      width: 100px;
      height: 100px;
    }
    .add-button-img {
      width: 20px;
      height: 20px;
    }
  }
</style>
