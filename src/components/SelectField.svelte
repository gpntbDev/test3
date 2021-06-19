<script>
  import { afterUpdate } from "svelte";
  export let userdata;
  export let id;
  export let name;
  export let array;
  export let currentValidationState;
  export let labelText;
 

  const handleInput = (event) => {
    userdata =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
  };

  afterUpdate(() => {
    console.log(userdata);
  });
</script>

<div class="input-container">
  <select
    {id}
    {name}
    bind:value={userdata}
    class="form-control m-input"
   >
    {#each array as item}
      <option value={item}>
        {#if id == "inputDegree"}
          {item.degree}
        {:else if id == "inputSpeciality"}
          {item.speciality}
        {:else if id == "inputEducation"}
          {item.level}
        {/if}
      </option>
    {/each}
  </select>
  <label
    for={id}
    class="grey-text m-label"
    >{labelText}</label
  >
</div>

<style>
  .input-container {
    position: relative;
    display: flex;
    width: 392px;
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
    padding-left: 21px;
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
  }
</style>
