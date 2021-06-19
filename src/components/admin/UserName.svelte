<script>
    export let data;
</script>






<div class="user-photo-wrapper">
    <img class="user-photo" src={data.image || "images/profile.png"} alt="wa" />
    <div class="user-name-and-position">
      <span class="user-name"
        >{data.surname}
        {data.name}
        {data.patronymic}</span
      >
      <span class="user-position">{data.position}</span>
    </div>
  </div>


  <style>
      
  </style>