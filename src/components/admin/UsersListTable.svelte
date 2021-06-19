<script>
  export let cb;
</script>

<div use:cb on:scroll class="users-list-table">
  <slot />
</div>

<style>
  .users-list-table {
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    max-height: 622px;
    padding: 0 15px 0 0;
    margin-top: 20px;
  }

  div.users-list-table::-webkit-scrollbar {
    width: 10px;
    display: block;
  }

  div.users-list-table::-webkit-scrollbar-track {
    background-color: #E0E0E0;
    display: block;
    height: 20px;
    margin-bottom: 130px;
    margin-top: 130px;
  }

  div.users-list-table::-webkit-scrollbar-thumb {
    border-radius: 2px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    background: rgb(255, 255, 255);
  }

  /* .table-container {
    width: 100%;
    display: block;
    max-height: 750px;
    overflow-x: hidden;
    overflow-y: scroll;
  }*/
</style>
