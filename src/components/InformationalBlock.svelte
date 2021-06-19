<script>
  export let classes = "";
  export let name;
  export let currentInformationalBlock;
</script>

<section
  on:scroll={(e) => {
    console.log(e);
  }}
  class="informational-block {classes}"
  class:active-block={currentInformationalBlock === name}
>
  <slot />
</section>

<style>
  .informational-block {
    position: relative;
    max-width: 470px;
    width: 100%;
    height: 100%;
    min-height: 809px;
    padding: 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-right: 30px;
  }

  .informational-block_type-users-list-table {
    min-width: 1500px;
    max-width: initial;
    border-radius: 10px;
  }
  .informational-block_type-users-list {
    border-radius: 10px;
    max-width: 487px;
    max-height: 809px;
    margin-right: 40px;
  }
  .informational-block_type-user-info{
    border-radius: 5px;
    margin-right: 0;
    margin-top: 30px;
    max-width: 1139px;
    max-height: 821px;
    min-height: 779px;
  }



  @media screen and (max-width: 1024px) {
    .informational-block {
      max-width: 100%;
      margin: 0;
    }
    .accounts-data {
      display: none;
    }
    .personal-data {
      display: none;
    }
    .interactions {
      display: none;
    }
    .active-block {
      display: flex;
    }
  }
</style>
