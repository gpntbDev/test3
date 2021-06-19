<script>
  export let data = "";
</script>

<li class="user-item" on:click>
  <div class="user-name-and-photo-container">
    <img
      class="user-img"
      src={data.image || "images/profile.png"}
      alt="user-one"
    />
    <div class="user-name-and-position">
      <span class="user-name"
        >{data.surname}
        {data.name}
        {data.patronymic}</span
      >
      <span class="user-position">{data.position}</span>
    </div>
  </div>
  <button class="button-menu">
    <img src="images/admin/buttonOther.svg" alt="button" />
  </button>
</li>

<style>
  .button-menu {
    border: none;
    background-color: transparent;
    margin-right: 20px;
  }
  .user-item {
    width: calc(100% - 15px);
    min-width: 450px;
    height: 80px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-left: 15px;
    background-color: #FFF;
    direction: initial;
  }
  .user-name-and-photo-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 20px;
  }
  .user-name-and-position {
    min-width: 169px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 140%;
    letter-spacing: 0.02em;
  }
  .user-item:first-child {
    margin-top: 0;
  }
  .user-item:hover {
    background-color: #3f51b5;
    cursor: pointer;
    color: white;
  
  }
  .user-name {
    font-weight: bold;
    color: #333333;
    margin-bottom: 5px;
  }
  .user-item:hover .user-name {
    color: white;
  }

  .user-position {
    font-weight: normal;
    color: #bdbdbd;
  }

  .user-img {
    width: 60px;
    height: 60px;
    border: 2px solid #e0e0e0;
    border-radius: 100px;
    margin-right: 20px;
    
    
  }
</style>
