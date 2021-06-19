<script>
  export let data = "";
  let mouseOver;
  let buttonMenuPath = null;
</script>

<div
  on:click
  class="table-row-item"
  on:mouseover={(e) => {
    buttonMenuPath = "images/admin/buttonOtherWhite.svg";
  }}
  on:mouseout={() => {
    buttonMenuPath = null;
  }}
>
  <div class="user-photo-wrapper">
    <img class="user-photo" src={data.image || "images/profile.png"} alt="wa" />
    <div class="user-name-and-position">
      <span class="user-name"
        >{data.surname}
        {data.name}
        {data.patronymic}</span
      >
      <span class="user-position">{data.position}</span>
    </div>
  </div>

  <div class="table-data-user-info">{data.dateOfReg}</div>
  <div class="table-data-user-info">Читательский билет</div>
  <div class="table-data-user-info">Подтвержден</div>
  <div class="table-data-user-info">
    Требуется подтверждение E-mail пользователем
  </div>
  <button class="button-menu">
    <img
      class="button-menu-icon"
      src={buttonMenuPath || "images/admin/buttonOther.svg"}
      alt="button"
    />
  </button>
</div>

<style>
  .button-menu {
    border: none;
    background-color: transparent;
  }
  .button-menu-icon {
    width: 15px;
    height: 15px;
  }

  .table-row-item {
    display: grid;
    grid-template-columns: 393px 217px 210px 188px 477px 35px;
    grid-template-rows: 80px;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    height: 80px;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 12px !important;
    line-height: 17px !important;
    letter-spacing: 0.04em;
    margin-top: 10px;
    background-color: white;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  }
  .table-row-item:first-of-type {
    margin: 0;
  }
  .table-row-item:hover {
    background-color: #3f51b5;
    cursor: pointer;
    color: white;
  }

  .user-photo {
    width: 60px;
    height: 60px;
    border-radius: 100px;
    margin-right: 20px;
  }
  .user-photo-wrapper {
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
  .user-name {
    font-weight: bold;
    color: #333333;
    margin-bottom: 5px;
  }
  .table-row-item:hover .user-name {
    color: white;
  }

  .user-position {
    font-weight: normal;
    color: #bdbdbd;
  }
  .table-data-user-info {
    font-size: 12px;
    line-height: 17px;
    letter-spacing: 0.04em;
  }
  .table-data-user-info:nth-of-type(3) {
    color: #3f51b5;
    font-weight: bold;
  }

  .table-row-item:hover .table-data-user-info:nth-of-type(3) {
    color: white;
  }
</style>
