<script>
    import { createEventDispatcher } from "svelte";
    // export let isRegButtonActive;
    //export let confirmation;
    export let type = "button";
    export let classes = "";
    export let content;
    export let disabled = false;
  
    const dispatch = createEventDispatcher();
    function clickHandler() {
      dispatch("click");
    }
  </script>
  
  <button on:click={clickHandler} {disabled} class="button-admin {classes}" {type}
    >{content}</button
  >
  


  <style>
.button-admin {
    width: 160px;
    height: 40px;
    background-color: #3F51B5;
    border: none;
    border-radius: 5px;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 140%;
    letter-spacing: 0.02em;
    color: #FFFFFF;
}




  </style>