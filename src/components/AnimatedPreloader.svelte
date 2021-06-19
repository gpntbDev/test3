<script>
</script>


<div class="animation-preloader">
  <div class="wrapper" />
  <div class="animation-cont" />
</div>

<style>
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  .animation-preloader {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 130;
  }
  .wrapper::before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    height: 100%;
    background: rgba(230, 230, 230, 0.7);
    
  }
  .animation-cont {
    background-image: url("./images/circles.svg");
    background-size: contain;
    width: 50px;
    height: 50px;
    opacity: 1;

    animation: rotation 3s ease-in-out infinite;
    z-index: 140;
  }
</style>
