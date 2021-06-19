<script>
  import { onMount } from "svelte";
  let date = new Date();
  let prevMonth = date.getMonth() - 1;
  let nextM = date.getMonth() + 1;
  let currentMonth = date.getMonth() + 1;
  let currentDay = date.getDate();
  let dateAtTheBeginningOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  );
  let firstDayInMonth = dateAtTheBeginningOfMonth.getDay();
  let currentDayOfWeek = date.getDay() == 0 ? 7 : date.getDay();
  let dateAtTheEndOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  );
  let currentNumberOfDaysInMonth = dateAtTheEndOfMonth.getDate();

  onMount(() => {
    const dayOfMonth = document.querySelector(".days-of-month");
    if (firstDayInMonth !== 1) {
      for (let i = 1; i < firstDayInMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("day");
        dayOfMonth.appendChild(day);
      }
    }
    for (let i = 1; i < currentNumberOfDaysInMonth + 1; i++) {
      const day = document.createElement("div");
      day.classList.add("day");

      let date = new Date();
      if (i == date.getDate()) {
        day.classList.add("current-day");
      }
      day.textContent = `${i}`;
      dayOfMonth.appendChild(day);
    }
  });

  function previousMonth() {
    const dayOfMonth = document.querySelector(".days-of-month");
    let dateAtTheBeginningOfPreviousMonth, dateAtTheEndOfPreviousMonth;
    console.log(dayOfMonth.children);
    while (dayOfMonth.firstChild) {
      dayOfMonth.removeChild(dayOfMonth.lastChild);
    }
    dateAtTheBeginningOfPreviousMonth = new Date(
      date.getFullYear(),
      prevMonth,
      1
    );
    dateAtTheEndOfPreviousMonth = new Date(
      date.getFullYear(),
      prevMonth == 11 ? 0 : prevMonth + 1,
      0
    );
    let firstDayInPreviousMonth = dateAtTheBeginningOfPreviousMonth.getDay();
    let numberOfDaysInPrevMonth = dateAtTheEndOfPreviousMonth.getDate();
    prevMonth -= 1;
    nextM -= 1;
    fillDays(firstDayInPreviousMonth, numberOfDaysInPrevMonth);
    console.log(prevMonth);
    console.log(nextM);
  }

  function nextMonth() {
    const dayOfMonth = document.querySelector(".days-of-month");
    let dateAtTheBeginningOfNextMonth, dateAtTheEndOfNextMonth;
    console.log(dayOfMonth.children);
    while (dayOfMonth.firstChild) {
      dayOfMonth.removeChild(dayOfMonth.lastChild);
    }
    dateAtTheBeginningOfNextMonth = new Date(date.getFullYear(), nextM, 1);
    dateAtTheEndOfNextMonth = new Date(
      date.getFullYear(),
      nextM == 11 ? 0 : prevMonth + 1,
      0
    );
    let firstDayInNextMonth = dateAtTheBeginningOfNextMonth.getDay();
    let numberOfDaysInNextMonth = dateAtTheEndOfNextMonth.getDate();
    prevMonth += 1;
    nextM += 1;
    fillDays(firstDayInNextMonth, numberOfDaysInNextMonth);
    console.log(prevMonth);
    console.log(nextM);
  }

  function fillDays(firstDayInMonth, currentNumberOfDaysInMonth) {
    const dayOfMonth = document.querySelector(".days-of-month");
    if (firstDayInMonth !== 1) {
      for (let i = 1; i < firstDayInMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("day");
        dayOfMonth.appendChild(day);
      }
    }
    for (let i = 1; i < currentNumberOfDaysInMonth + 1; i++) {
      const day = document.createElement("div");
      day.classList.add("day");

      let date = new Date();
      if (i == date.getDate()) {
        day.classList.add("current-day");
      }
      day.textContent = `${i}`;
      dayOfMonth.appendChild(day);
    }
  }
</script>

<div class="calendar">
  <div>
    <h5>Календарь</h5>
    <span>Май 2021</span>
    <button on:click={previousMonth}>-</button>
    <button on:click={nextMonth}>-></button>
  </div>
  <div class="days-of-week">
    <span>Пт</span>
    <span>Вт</span>
    <span>Ср</span>
    <span>Чт</span>
    <span>Пт</span>
    <span>Сб</span>
    <span>Вс</span>
  </div>
  <div class="days-of-month" />
</div>

<style>
  .calendar {
    width: 487px;
    height: 440px;
    background-color: white;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 0 32px 20px 32px;
  }
  .days-of-week {
    display: flex;
    justify-content: space-between;
  }
  .days-of-month {
    width: 100%;
    height: 290px;
    display: grid;
    grid-template-columns: repeat(7, 40px);
    grid-template-rows: repeat(6, 40px);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    justify-content: center;
  }
  :global(.day) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 40px;
    height: 40px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    margin-right: 18px;
  }
  :global(.current-day) {
    background-color: #035ba0;
    border: 2px solid #035ba0;
    color: white;
  }
</style>
