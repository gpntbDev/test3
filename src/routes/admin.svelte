<script>
  import { onMount, afterUpdate } from "svelte";
  import AdminSidebar from "../components/AdminSidebar.svelte";
  import AdminHeader from "../components/admin/AdminHeader.svelte";
  import InformationalBlock from "../components/InformationalBlock.svelte";
  import UserItemTable from "../components/admin/UserItemTable.svelte";
  import UsersListTable from "../components/admin/UsersListTable.svelte";
  import UserItem from "../components/admin/UserItem.svelte";
  import UsersList from "../components/admin/UsersList.svelte";
  import UserListTableHeaders from "../components/admin/UserListTableHeaders.svelte";
  import UserAccountStateMarker from "../components/admin/UserAccountStateMarker.svelte";
  import AccountState from "../components/admin/AccountState.svelte";
  import UserInformationFieldAdmin from "../components/admin/UserInformationFieldAdmin.svelte";
  import StatisticBlock from "../components/admin/StatisticBlock.svelte";
  import { getAllUsers } from "../api/api";
  import { slide, fade } from "svelte/transition";
  import Button from "../components/Button.svelte";
  import SearchInput from "../components/admin/SearchInput.svelte";
  import PopupUserCard from "../components/admin/PopupUserCard.svelte";

  let currentUser;
  let popupUserCard = false;
  let currentScroll;
  let selected = null;
  let users;
  let context;
  let searchHistory = [];
  onMount(async () => {
    let res = await getAllUsers();
    users = res.users;
    console.log(users);
  });
  afterUpdate(() => {});
  function scrollHandler(node) {
    node.scrollTop = currentScroll;
  }

  function searchUser() {}
</script>

<main>
  <AdminSidebar />
  <AdminHeader />
  {#if !selected}
    <div class="section-users">
      <h5 class="block-title">Все пользователи</h5>
      <UserListTableHeaders {searchHistory} />
      <UsersListTable
        cb={scrollHandler}
        on:scroll={(e) => {
          currentScroll = e.target.scrollTop;
        }}
      >
        {#if users}
          {#each users as user}
            <UserItemTable
              on:click={(e) => {
                /*selected = user;
                const { name, surname, patronymic } = user;
                searchHistory.push({ name, surname, patronymic });*/
                popupUserCard = true;
                currentUser = user;
                /*
            console.log(e.clientY);
            document.querySelector('.context-menu').style.display = "block";
            document.querySelector('.context-menu').style.top = `${e.clientY}px`;
            document.querySelector('.context-menu').style.left = `${e.clientX}px`;*/
              }}
              data={user}
            />
          {/each}
        {:else}
          <p>Ожидание...</p>
        {/if}
      </UsersListTable>
    </div>
  {/if}

  {#if selected}
    <div class="users-list">
      <div class="users-list-upper-div">
        <h5 class="block-title">Все пользователи</h5>
        <button
          on:click={() => {
            selected = null;
          }}
          class="button-expand">Развернуть</button
        >
      </div>
      <div class="search-block">
        <SearchInput />
        <button class="filter-button">Фильтр</button>
      </div>
      {#if users}
        <UsersList
          on:scroll={(e) => {
            currentScroll = e.target.scrollTop;
          }}
          cb={scrollHandler}
        >
          {#each users as user}
            <UserItem
              on:click={() => {
                console.log(user);
                selected = user;
              }}
              data={user}
            />
          {/each}
        </UsersList>
      {:else}
        <p>Ожидание...</p>
      {/if}
    </div>

    <InformationalBlock classes={"informational-block_type-user-info"}>
      <!--<div class="upper-container">
        <span>Профиль пользователя</span>
        <p>Аккаунт не верифицирован</p>
        <button>Верификация</button>
      </div>-->
      <div class="user-main-info">
        <div class="photo-container">
          <img
            class="user-main-info__photo"
            src={selected.image || "images/profile.png"}
            alt="user"
          />
          <div class="interaction-buttons-container">
            <div class="user-interaction-button">
              <img
                class="user-interaction-button-icon"
                src="images/admin/button_user_account_call.svg"
                alt="user-interaction-button"
              />
            </div>
            <div class="user-interaction-button">
              <img
                class="user-interaction-button-icon"
                src="images/admin/button_user_account_message.svg"
                alt="user-interaction-button"
              />
            </div>
            <div class="user-interaction-button">
              <img
                class="user-interaction-button-icon"
                src="images/admin/button_user_account_other.svg"
                alt="user-interaction-button"
              />
            </div>
          </div>
        </div>
        <div class="user-main-info__name">
          <div class="name">
            <span class="surname"
              >{selected !== null ? selected.surname : "unknown"}</span
            >
            {selected !== null ? selected.name : "unknown"}
            {selected !== null ? selected.patronymic : "unknown"}
          </div>
          <div class="position">
            {selected !== null ? selected.position : "unknown"}
          </div>
          <ul class="user-account-main-information-list">
            <li class="user-account-main-information-list-item">
              <span class="item-bold">Аккаунт</span>
              <div class="account-state-marker" />
              <span class="item-normal">Не верифицирован</span>
            </li>
            <li class="user-account-main-information-list-item">
              <span class="item-bold">E-mail</span>
              <div class="account-state-marker" />
              <span class="item-normal">Подтвержден</span>
            </li>
            <li class="user-account-main-information-list-item">
              <span class="item-bold">Телефон</span>
              <div class="account-state-marker" />
              <span class="item-normal">Не верифицирован</span>
            </li>
          </ul>
        </div>
        <div class="user-main-info__statistic">
          <StatisticBlock
            fieldName={"Тип регистрации"}
            fieldValue={selected.regType}
          />
          <StatisticBlock fieldName={"Количество обращений"} fieldValue={"0"} />
          <StatisticBlock
            fieldName={"Последнее посещение"}
            fieldValue={"20.05.2021"}
          />
          <StatisticBlock
            fieldName={"Последнее посещение"}
            fieldValue={"20.05.2021"}
          />
        </div>
        <div class="account-status-container">
          <div>
            Статус аккаунта
            <AccountState/>
          </div>
          <div class="account-credentials">
            <img src="images/admin/InfoCircle.svg" alt="circle">
            Данный аккаунт не имеет
            прав на работу с читателями
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="user-info__fields">
          <div class="user-info__fields__column">
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-left"}
              fieldNameRu={"Фамилия, Имя, Отчество"}
              value={`${selected !== null ? selected.surname : "unknown"} ${
                selected !== null ? selected.name : "unknown"
              } ${selected !== null ? selected.patronymic : "unknown"}`}
            />
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-left"}
              fieldNameRu={"Дата рождения"}
              value={selected !== null ? selected.birthdate : "unknown"}
            />
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-left"}
              fieldNameRu="Номер читательского билета"
              value={selected !== null ? selected.libraryCardNumber : "unknown"}
            />
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-left"}
              fieldName={"email"}
              fieldNameRu={"Email"}
              value={selected !== null ? selected.email : "unknown"}
            />
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-left"}
              fieldName={"phonenumber"}
              fieldNameRu={"Номер телефона"}
              value={selected !== null ? selected.phonenumber : "unknown"}
            />
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-left"}
              fieldNameRu={"Образование"}
              fieldName={"education"}
              value={selected !== null
                ? selected.education.level || selected.education
                : "unknown"}
            />
          </div>
          <div class="user-info__fields__column">
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-right"}
              fieldNameRu={"Специальность"}
              fieldName={"speciality"}
              value={selected !== null ? selected.speciality : "unknown"}
            />
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-right"}
              fieldNameRu={"Учёная степень"}
              fieldName={"degree"}
              value={selected !== null
                ? selected.degree.degree || selected.degree
                : "unknown"}
            />
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-right"}
              fieldNameRu={"Место работы / учебы"}
              fieldName={"placeofwork"}
              value={selected !== null ? selected.placeofwork : "unknown"}
            />
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-right"}
              fieldNameRu={"Должность"}
              fieldName={"position"}
              value={selected !== null ? selected.position : "unknown"}
            />
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-right"}
              fieldNameRu={"Адрес регистрации"}
              fieldName={"registrationAdress"}
              value={selected !== null
                ? selected.registrationAdress
                : "unknown"}
            />
            <UserInformationFieldAdmin
              classes={"user-information-field-admin-right"}
              fieldNameRu={"Адрес фактический"}
              inputName={"inputActualAdress"}
              fieldName={"actualAdress"}
              value={selected !== null ? selected.actualAdress : "unknown"}
            />
          </div>
        </div>
      </div>
    </InformationalBlock>
  {/if}

  {#if popupUserCard}
    <PopupUserCard
      data={currentUser}
      on:profile={() => {
        console.log("1");
        selected = currentUser;
        const { name, surname, patronymic } = currentUser;
        searchHistory.push({ name, surname, patronymic });
        popupUserCard = false;
      }}
      on:close={() => {
        popupUserCard = false;
      }}
    />
  {/if}

  <div class="context-menu">lorem</div>
</main>

<style>
  .block-title {
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.02em;
    color: #3f51b5;
    margin-bottom: 10px;
  }

.account-status-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 0 0 0 57px;
}

.account-credentials {
  max-width: 163px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  font-size: 10px;
  text-align: center;
}


  .section-users {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .search-input {
    width: 320px;
    height: 40px;
    border: 2px solid #035ba0;
    border-radius: 10px;
    padding: 10px;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: 0.04em;
    color: #828282;
  }

  .search-input:focus {
    outline: none;
  }
  .search-block {
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    margin-left: 25px;
    padding-left: 20px;
    width: calc(100% - 25px);
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .search-input-container {
    position: relative;
  }
  .search-input-img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .search-block-title {
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 17px;
    color: #3f51b5;
  }
  .users-list {
    margin-right: 40px;
  }
  .users-list-upper-div {
    width: 100%;
    padding-left: 25px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .filter-button {
    background-color: transparent;
    border: none;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: 0.04em;
    color: #828282;
  }
  main {
    padding: 80px 15px 40px 340px;
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
  }
  .context-menu {
    border: 0.5px solid black;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    width: 150px;
    height: 200px;
    display: none;
  }
  .upper-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .user-main-info {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 20px;
  }
  .user-info {
    display: flex;
    width: 100%;
  }
  .user-info__fields {
    display: flex;
  }
  .user-info__fields__column {
    margin: 0 20px 0 0;
  }
  .user-main-info__photo {
    width: 200px;
    height: 200px;
    border-radius: 500px;
  }
  .user-main-info__name {
    max-width: 350px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #333333;
  }
  .user-main-info__statistic {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-left: 25px;
  }
  .statistic-block-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 54px;
    border-radius: 5px;
    background: rgba(242, 242, 242, 0.5);
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;
    letter-spacing: 0.02em;

    /* black */

    color: #333333;
  }
  .user-account-main-information-list {
    list-style: none;
    font-size: 12px;
    line-height: 140%;
    padding: 0;
  }

  .user-account-main-information-list-item {
    margin: 0 0 20px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .account-state-marker {
    width: 5px;
    height: 5px;
    background-color: #bccf00;
    border-radius: 10px;
  }

  .item-bold {
    font-weight: bold;
    width: 64px;
    margin-right: 10px;
  }
  .item-normal {
    margin-left: 10px;
  }

  .name {
    margin: 0 0 5px 0;
    max-width: 270px;
  }
  .surname {
    text-transform: uppercase;
    font-weight: bold;
    display: block;
  }
  .rating {
    width: 140px;
  }
  .position {
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #bdbdbd;
    margin: 0 0 20px 0;
  }

  .button-expand {
    background-color: transparent;
    border: none;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.02em;
    color: #3f51b5;
  }

  .interaction-buttons-container {
    width: 100%;
    max-width: 133px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 0 0;
  }
  .user-interaction-button:hover {
    background-color: tomato;
    cursor: pointer;
  }

  .user-interaction-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: #3f51b5;
    width: 31px;
    height: 31px;
    border-radius: 200px;
  }
  .photo-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>
