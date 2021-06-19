<script>
  import { afterUpdate } from "svelte";
  import { createEventDispatcher } from "svelte";
  export let userdata = "";
  export let callback = null;
  export let changeHandler = null;
  export let id;
  export let error = "";
  export let classes = "";
  export let placeholder = " ";
  export let ipnutHandler = null;
  export let disabled = false;
  export let type = "text";
  export let password = false;
  export let currentValidationState = "";
  export let labelText;
  export let validation = true;
  export let name = null;
  export let resetPassword = false;

  const dispatch = createEventDispatcher();
  const handleInput = (event) => {
    userdata =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
  };

  /*afterUpdate(() => {
    console.log(userdata);
  });*/
  const showPassword = function () {
    type = type == "password" ? "text" : "password";
  };
</script>

<div class="input-container">
  {#if validation}
    <input
      value={userdata}
      on:input={handleInput}
      on:input={ipnutHandler}
      on:change={callback}
      on:change={changeHandler}
      {disabled}
      {type}
      {id}
      {name}
      {placeholder}
      class={`form-control m-input ${classes}`}
      class:invalid-input={!currentValidationState[name].state}
    />
    <label
      for={id}
      class:invalid-label={!currentValidationState[name].state}
      class="form-label grey-text m-label"
      >{currentValidationState[name].message || labelText}</label
    >
  {:else}
    <input
      value={userdata}
      on:input={handleInput}
      on:input={ipnutHandler}
      on:change={callback}
      {disabled}
      {type}
      {id}
      {validation}
      {name}
      {error}
      placeholder=" "
      class={`form-control m-input ${classes}`}
      class:invalid-input={error}
    />
    <label
      class:invalid-label={error}
      for={id}
      class="form-label grey-text m-label">{error || labelText}</label
    >
  {/if}

  {#if password}
    <button
      on:mousedown={showPassword}
      on:mouseup={showPassword}
      type="button"
      class="button-show-password"
      ><img
        class="show-password-image"
        src="images/eye.svg"
        alt="eye"
      /></button
    >
  {/if}
  {#if disabled}
    <img class="image-disabled-input" src="images/lock.svg" alt="lock" />
  {/if}
  {#if resetPassword}
    <button
      on:click={(e) => {
        dispatch("reset");
      }}
      class="button-forgot-password"
      type="button"
    >
      Забыли пароль?
    </button>
  {/if}
</div>

<style>
  .button-forgot-password {
    border: none;
    background-color: transparent;
    position: absolute;
    right: -130px;
    top: 12px;
    color: #035ba0;
    font-family: Blogger Sans;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 17px;
    letter-spacing: 0.02em;
  }
  .input-container {
    position: relative;
    display: flex;
    width: 392px;
    align-self: center;
  }

  .m-input {
    width: 100%;
    height: 52px;
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
    padding-left: 20px;
  }
  .m-input-margin-bottom-10 {
    margin-bottom: 10px;
  }

  .m-label {
    position: absolute;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 17px;
    left: 20px;
    top: 18px;
    transition: 0.15s ease-out;
    transform-origin: left top;
    background-color: white;
    color: gray;
    padding-left: 5px;
    padding-right: 5px;
  }
  .m-input:disabled {
    background-color: transparent;
  }

  .m-input:focus {
    outline: none;
  }
  .m-input:focus + .m-label {
    color: #035ba0 !important;
    top: 0;
    transform: translateY(-50%) scale(0.9);
  }
  .m-input:not(:placeholder-shown) + .m-label {
    color: #035ba0 !important;
    top: 0;
    transform: translateY(-50%) scale(0.9);
  }

  .invalid-input {
    color: red !important;
    border: 2px solid red;
  }

  .invalid-input:not(:placeholder-shown) + .invalid-label,
  .invalid-input:focus + .invalid-label,
  .invalid-label {
    color: red !important;
  }
  .button-show-password {
    background-color: transparent;
    border: none;
    position: absolute;
    right: 22px;
    top: 25%;
    transform: translateY(-25%);
  }
  .button-show-password:focus {
    outline: none;
  }
  .image-disabled-input {
    width: 20px;
    position: absolute;
    right: 26px;
    top: 30%;
    transform: translateY(-30%);
  }

  @media screen and (max-width: 930px) {
    .m-input {
      height: 45px;
      font-size: 12px;
      line-height: 13px;
    }
    .m-label {
      font-size: 12px;
      line-height: 13px;
    }
    .input-container {
      width: 300px;
    }
  }

  @media screen and (max-width: 720px) {
    .input-container {
      width: 300px;
    }
    .m-label {
      top: 15px;
    }
    .button-show-password {
      top: 15px;
      right: 15px;
    }
    .button-forgot-password {
      right: 0;
      top: 50px;
      font-size: 12px;
      line-height: 13px;
    }
  }
</style>
