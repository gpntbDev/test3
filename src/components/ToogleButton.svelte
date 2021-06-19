<script>
</script>

<div>
  <input
    type="checkbox"
    id="custom-toggle-button"
    class="custom-toggle-button"
  />
</div>

<style>
  .custom-toggle-button {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 15px;
    margin: 0;
    background: #ffffff;
    border: 0.9375px solid #8ab5e1;
    border-radius: 16px;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
  }

  .custom-toggle-button::after {
    content: "";
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    width: 13px;
    height: 13px;
    background: #8ab5e1;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.1, 0.65, 0.22, 1.3);
    transform: translateX(0);
    
  }

  .custom-toggle-button:checked::after {
    top: 0;
   
    transform: translateX(118%);
    background-color: #fff;
  }
  .custom-toggle-button:checked {
    background-color: #8ab5e1;
  }
</style>
