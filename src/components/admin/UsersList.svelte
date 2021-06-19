<script>
  export let cb="";
</script>


<ul on:scroll use:cb class="users-list">
    <slot></slot>
</ul>



<style>
  .users-list {
    width: 100%;
    min-width: 487px;
    max-height: 680px;
    padding: 0;
    list-style: none;
    font-weight: 400;
    font-family: Gotham Pro;
    font-size: 12px;
    line-height: 17px;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    direction: rtl;
    margin: 0;
  }
  .users-list::-webkit-scrollbar {
    width: 8px;
    display: block;
   
  }

  
  .users-list::-webkit-scrollbar-track {
    background-color: #E0E0E0;
   /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);*/
    -webkit-border-radius: 10px;
    border-radius: 10px;
    display: block;
    height: 20px;
    margin-bottom: 130px;
    margin-top: 130px;
  }

  /*.users-list::-webkit-scrollbar-track-piece:end {
    margin-bottom: 40px;
  }

  .users-list::-webkit-scrollbar-track-piece:start {
    margin-top: 40px;
  }
*/
  .users-list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    background: rgb(255, 255, 255);
  }

</style>