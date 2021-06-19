<script>
</script>

<nav class="admin-sidebar">
  <ul class="admin-sidebar-menu-list">
    <li class="admin-sidebar-menu-item">
      <img
        class="admin-sidebar-menu-item-icon"
        src="images/admin/home.svg"
        alt="home"
      />Главная
    </li>
  </ul>
  <ul class="admin-sidebar-menu-list">
    <li class="admin-sidebar-menu-item">
      <img
        class="admin-sidebar-menu-item-icon"
        src="images/admin/3User.svg"
        alt="home"
      />Список пользователей
    </li>
    <li class="admin-sidebar-menu-item">
      <img
        class="admin-sidebar-menu-item-icon"
        src="images/admin/EditSquare.svg"
        alt="EditSquare"
      />Модерация
    </li>
  </ul>
  <ul class="admin-sidebar-menu-list">
    <li class="admin-sidebar-menu-item">
      <img
        class="admin-sidebar-menu-item-icon"
        src="images/admin/Setting.svg"
        alt="home"
      />Настройки
    </li>
    <li class="admin-sidebar-menu-item">
      <img
        class="admin-sidebar-menu-item-icon"
        src="images/admin/logout.svg"
        alt="home"
      />Выход
    </li>
  </ul>
</nav>

<style>
  .admin-sidebar {
    font-family: Gotham Pro;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    width: 300px;
    height: 100%;
    min-height: 969px;
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    background-color: #333;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
  }
  .admin-sidebar-menu-list {
    list-style: none;
    padding: 0;
    margin: 30px 0;
    width: 100%;
  }
  .admin-sidebar-menu-item {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 40px;
    margin: 0 0 40px 0;
  }
  .admin-sidebar-menu-item-icon {
    margin: 0 10px 0 0;
  }
  .admin-sidebar-menu-item:last-of-type {
    margin: 0;
  }
</style>
