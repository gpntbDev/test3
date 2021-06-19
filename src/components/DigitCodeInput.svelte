<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let value = { first: "", second: "", third: "", four: "" };
</script>

<div class="wrapper">
  <input
    value={value.first}
    on:input={(e) => {
      value.first = e.target.value;
    }}
    class="digit-code-input"
    placeholder="*"
    type="text"
    maxlength="1"
  />
  <input
    value={value.second}
    on:input={(e) => {
      value.second = e.target.value;
    }}
    class="digit-code-input"
    placeholder="*"
    type="text"
    maxlength="1"
  />
  <input
    value={value.third}
    on:input={(e) => {
      value.third = e.target.value;
    }}
    class="digit-code-input"
    placeholder="*"
    type="text"
    maxlength="1"
  />
  <input
    value={value.four}
    on:input={(e) => {
      value.four = e.target.value;
    }}
    class="digit-code-input"
    placeholder="*"
    type="text"
    maxlength="1"
  />
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .digit-code-input {
    width: 60px;
    height: 60px;
    border: 2px solid #035ba0;
    border-radius: 10px;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 17px;
    outline: none;
    color: gray;
    letter-spacing: 0.02em;
    transition: 0.15s ease-out;
    margin-bottom: 21px;
    padding-left: 23px;
    margin-right: 20px;
  }
  .digit-code-input:last-of-type {
    margin-right: 0;
  }
</style>
