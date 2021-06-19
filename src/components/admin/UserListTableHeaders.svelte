<script>
  import SearchInput from "../admin/SearchInput.svelte";
  import SearchHistory from "../admin/SearchHistory.svelte";
  export let searchHistory;
</script>

<div class="users-list-table-headers">
  <div class="search-block">
    <SearchInput />
    <SearchHistory>
      {#each searchHistory as historyItem}
        <div class="search-history-item">
          {historyItem.surname}
          {historyItem.name}
          {historyItem.patronymic}
        </div>
      {/each}
    </SearchHistory>
  </div>
  <div class="users-list-table-headers-container">
    <div class="table-header">Пользователь</div>
    <div class="table-header">Дата регистрации</div>
    <div class="table-header">Тип регистрации</div>
    <div class="table-header">Статус E-mail</div>
    <div class="table-header">Статус аккаунта</div>
    <button class="filter-button"
      >Фильтр <img
        class="filter-button-icon"
        src="images/admin/Caretdown.svg"
        alt="Caretdown"
      /></button
    >
  </div>
</div>

<style>
  .search-block {
    display: flex;
    padding-bottom: 20px;
    justify-content: space-between;
    align-items: center;
  }
  .search-history-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 27px;
    background: rgba(242, 242, 242, 0.5);
    border-radius: 5px;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;
    text-align: center;
    letter-spacing: 0.04em;
    padding: 5px;
    color: #333333;
    margin: 0 10px;
  }
  .filter-button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
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
  .filter-button-icon {
    margin-left: 5px;
  }
  .users-list-table-headers {
    background-color: #ffffff;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 20px;
    width: calc(100% - 25px);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
  }

  .users-list-table-headers-container {
    display: grid;
    grid-template-columns: 373px 217px 210px 188px 440px 68px;
    justify-content: flex-start;
    align-items: center;
    min-height: 58px;
    border-top: 1px solid #f2f2f2;
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #333333;
  }
</style>
