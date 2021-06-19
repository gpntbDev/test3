<script>
  export let classes = "";
  export let data;
  import StatisticBlock from "../admin/StatisticBlock.svelte";
  import ButtonAdmin from "../admin/ButtonAdmin.svelte";
  import UserAccountStateMarker from "../admin/UserAccountStateMarker.svelte";
  import { fade, fly, slide, crossfade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const handleKeydown = e => {
		if (e.key === 'Escape') {
			dispatch('close');
			return;
		}
  }
</script>


<svelte:window on:keydown={handleKeydown}/>

<div
  on:click={() => {
    dispatch("close");
  }}
  in:fade
  out:fly
  class="popup-user-card"
>
  <div class="popup-user-card-content {classes}">
    <div
      class="popup-user-card-content-block popup-user-card-content-block_horizontal-alignment_center"
    >
      <div class="popup-user-card-content__account-status">
        <div class="account-state-container">
          <UserAccountStateMarker />
          <span class="account-state">Ожидает верификации</span>
        </div>
        <button
          on:click={() => {
            dispatch("close");
          }}
          type="button"
          class="button-close"
        />
      </div>
      <img
        class="user-photo"
        src={data.image || "images/profile.png"}
        alt="profile"
      />
      <div class="surname">{data.surname}</div>
      <div class="name">{data.name} {data.patronymic}</div>
      <div class="position">{data.position}</div>
      <ButtonAdmin
        content={"Профиль"}
        on:click={() => {
          dispatch("profile");
        }}
      />
    </div>
    <div
      class="popup-user-card-content-block popup-user-card-content-block_horizontal-alignment_start"
    >
      <span class="block-title">Основная информация</span>
      <div class="info-block">
        <div class="info-block-item">
          <span>E-mail</span>
          <span class="info-block-item__value">{data.email}</span>
        </div>
        <img src="images/admin/status_valid.svg" alt="status" />
      </div>
      <div class="info-block">
        <div class="info-block-item">
          <span>Номер телефона</span>
          <span class="info-block-item__value">{data.phonenumber}</span>
        </div>
        <img src="images/admin/status_valid.svg" alt="status" />
      </div>
      <div class="info-block">
        <div class="info-block-item">
          <span>Место работы / учебы</span>
          <span class="info-block-item__value">{data.placeofwork}</span>
        </div>
      </div>
      <div class="info-block">
        <div class="info-block-item">
          <span>Должность</span>
          <span class="info-block-item__value">{data.position}</span>
        </div>
      </div>
    </div>
    
      <StatisticBlock
        classes={"statistic-block-item_type_increased-margin-top"}
        fieldName={"Тип регистрации"}
        fieldValue={data.regType}
      />
      <StatisticBlock
        classes={"statistic-block-item_type_increased-margin-top"}
        fieldName={"Количество обращений"}
        fieldValue={"0"}
      />
      <StatisticBlock
        classes={"statistic-block-item_type_increased-margin-top"}
        fieldName={"Последнее посещение"}
        fieldValue={"20.05.2021"}
      />
    
  </div>
</div>

<style>
  .account-state-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .account-state {
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;
    letter-spacing: 0.02em;
  }
  .block-title {
    font-weight: bold;
    margin: 10px 0 0 0;
  }
  .button-close {
    border: none;
    background-color: #3f51b5;
    width: 10px;
    height: 2px;
    justify-self: end;
  }
  .info-block {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: normal;
    font-size: 12px;
    margin: 20px 0 0 0;
  }
  .info-block:first-of-type {
    margin: 10px 0 0 0;
  }
  .info-block-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .info-block-item__value {
    font-weight: bold;
    margin: 5px 0 0 0;
  }
  .popup-user-card {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(51, 51, 51, 0.7);
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .popup-user-card-content {
    font-family: Gotham Pro;
    font-style: normal;
    width: 380px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 655px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    margin-top: 60px;
  }

  .popup-user-card-content-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 0 15px 0;
    border-bottom: 1px solid #f2f2f2;
  }
  .popup-user-card-content-block_horizontal-alignment_center {
    align-items: center;
  }
  .popup-user-card-content-block_horizontal-alignment_start {
    align-items: flex-start;
  }

  .popup-content_justify-center {
    justify-content: center;
    min-height: initial;
    padding: 100px 0;
  }

  .popup-user-card-content__account-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .user-photo {
    width: 130px;
    height: 130px;
    border-radius: 300px;
    margin: 20px 0 10px;
  }
  .surname {
    font-weight: bold;
    font-size: 18px;
    line-height: 140%;
    text-align: center;
    letter-spacing: 0.02em;
    color: #333333;
    text-transform: uppercase;
  }

  .position {
    margin: 5px 0 20px;
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;
    color: #bdbdbd;
  }

  @media screen and (max-width: 720px) {
    .popup-content {
      width: calc(100% - 32px);
      margin: 0 16px;
      min-height: 438px;
      padding: 10px;
    }
  }
</style>
