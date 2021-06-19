<script>
  import { onMount } from "svelte";
  import { loadImage } from "../utils/loadImage";
  import { cropImage } from "../utils/cropImageByCropper";
  import { goto } from "@sapper/app";
  import { getUserData, signOut, updateUserData, saveImage } from "../api/api";
  import AnimatedPreloader from "../components/AnimatedPreloader.svelte";
  import Header from "../components/Header.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import InformationalBlock from "../components/InformationalBlock.svelte";
  import UserPhoto from "../components/UserPhoto.svelte";
  import UserInformationField from "../components/UserInformationField.svelte";
  import UserName from "../components/UserName.svelte";
  import Button from "../components/Button.svelte";
  import RegistrationDate from "../components/RegistrationDate.svelte";
  import Popup from "../components/Popup.svelte";
  import Subtitle from "../components/Subtitle.svelte";
  import MobileHeader from "../components/MobileHeader.svelte";

  let res;
  let name = "";
  let userdata;
  let mobileMenu = false;
  let photoLoading;
  let croppedImage;

  let currentInformationalBlock = "personal-data";
  onMount(async () => {
    try {
      res = await getUserData();
      console.log(res);
      userdata = res.data;
      if (!res.data.active) {
        console.log(res.data.active);
      }
      return (name = res.data.username || res.data.name);
    } catch (err) {
      console.log(err);
      goto("/login");
    }
  });

  function toggleBlock(e) {
    mobileMenu = false;
    currentInformationalBlock = e.detail.current;
    console.log(currentInformationalBlock);
  }

  async function signOutHandler() {
    try {
      await signOut();
      goto("/login");
    } catch (e) {
      alert(e);
    }
  }

  function loadUserPhoto() {
    let fileInput = document.querySelector(".input-image");
    fileInput.onchange = () => {
      photoLoading = true;
      loadImage(fileInput).then((res) => {
        let img = document.querySelector("img.photo-loaded-by-user");
        img.src = res;
        img.onload = () => {
          cropImage(img, (im) => {
            croppedImage = im;
          });
        };
      });
    };
    fileInput.click();
  }

  function saveCroppedImage() {
    photoLoading = false;
    let encodedImage = croppedImage.toDataURL("image/jpeg", 1);
    let requestBody = {};
    requestBody.user = userdata.email;
    requestBody.id = userdata._id;
    requestBody.base64Image = encodedImage;
    saveImage(requestBody).then((res) => {
      userdata.image = res.path;
      document.querySelector(".user-photo").src = res.path;
    });
    croppedImage = null;
  }

  function resetCropping() {
    photoLoading = false;
    croppedImage = null;
   
  }

  const editData = async function (e) {
    try {
      let dataToUpdate = {};
      dataToUpdate.email = userdata.email;
      dataToUpdate.change = e.detail;
      let updation = await updateUserData(dataToUpdate);
      if (updation) {
        userdata[e.detail.changedField] = e.detail.value;
      }
    } catch (err) {
      console.log(err);
    }
  };
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

{#if !name}
  <p>Ожидание...</p>
{:else}
  <div class="main-cabinet">
    <Header
      on:click={() => {
        mobileMenu = true;
      }}
      userName={name}
    />
    <Sidebar
      mobileVisible={mobileMenu}
      on:click={toggleBlock}
      on:exitButtonClick={signOutHandler}
      on:closeButtonClick={() => {
        mobileMenu = false;
      }}
    />
    <MobileHeader />

    {#if !mobileMenu}
      <InformationalBlock
        classes={" personal-data"}
        name={"personal-data"}
        {currentInformationalBlock}
      >
        <Subtitle content={"Личная информация"} />
        <div class="user-main-information-container">
          <UserPhoto
            on:image-input={loadUserPhoto}
            userPhoto={userdata.image}
            {photoLoading}
            on:saveImage={saveCroppedImage}
            on:reset={resetCropping}
          />
          <div
            class="d-flex flex-column justify-content-flex-start align-items-center"
          >
            <UserName
              username={userdata.name}
              surname={userdata.surname || ""}
              patronymic={userdata.patronymic || ""}
            />
          </div>
        </div>
        <UserInformationField
          fieldNameRu={"Фамилия, Имя, Отчество"}
          value={`${userdata.surname} ${userdata.name || userdata.username} ${
            userdata.patronymic
          }`}
        />
        <UserInformationField
          fieldNameRu={"Дата рождения"}
          value={userdata.birthdate}
        />
        <UserInformationField fieldNameRu="Номер читательского билета" 
        value={userdata.libraryCardNumber}
        />
        <UserInformationField
          editable={true}
          fieldName={"email"}
          on:edit={editData}
          fieldNameRu={"Email"}
          notConfirmed={userdata.active == false ? "need to confirm" : ""}
          value={userdata.email}
        />
        <UserInformationField
          editable={true}
          on:edit={editData}
          fieldName={"phonenumber"}
          fieldNameRu={"Номер телефона"}
          value={userdata.phonenumber}
        />
        <UserInformationField
          editable={true}
          fieldName={"password"}
          on:edit={editData}
          fieldNameRu={"пароль"}
          value={userdata.password}
          password={true}
          passwordButton={true}
        />

        <RegistrationDate regDate={userdata.dateOfReg} />
      </InformationalBlock>

      <InformationalBlock
        classes={" accounts-data"}
        name={"accounts-data"}
        {currentInformationalBlock}
      >
        <Subtitle content={"Дополнительная информация"} />
        <UserInformationField
          fieldNameRu={"Образование"}
          on:edit={editData}
          fieldName={"education"}
          editable={true}
          value={userdata.education.level || userdata.education || "неизвестно"}
        />
        <UserInformationField
          fieldNameRu={"Специальность"}
          on:edit={editData}
          fieldName={"speciality"}
          editable={true}
          value={!userdata.speciality ? "неизвестно" : userdata.speciality}
        />
        <UserInformationField
          fieldNameRu={"Учёная степень"}
          on:edit={editData}
          fieldName={"degree"}
          editable={true}
          value={userdata.degree.degree || userdata.degree || "неизвестно"}
        />
        <UserInformationField
          fieldNameRu={"Место работы / учебы"}
          fieldName={"placeofwork"}
          on:edit={editData}
          editable={true}
          value={!userdata.placeofwork ? "неизвестно" : userdata.placeofwork}
        />
        <UserInformationField
          fieldNameRu={"Должность"}
          on:edit={editData}
          fieldName={"position"}
          editable={true}
          value={!userdata.position ? "неизвестно" : userdata.position}
        />
        <UserInformationField
          fieldNameRu={"Адрес регистрации"}
          on:edit={editData}
          fieldName={"registrationAdress"}
          inputName={"inputRegistrationAdress"}
          editable={true}
          value={!userdata.registrationAdress
            ? "неизвестно"
            : userdata.registrationAdress}
        />
        <UserInformationField
          fieldNameRu={"Адрес фактический"}
          inputName={"inputActualAdress"}
          on:edit={editData}
          fieldName={"actualAdress"}
          editable={true}
          value={!userdata.actualAdress ? "неизвестно" : userdata.actualAdress}
        />
      </InformationalBlock>
    {/if}
    <!--
    <InformationalBlock>
      <Subtitle
        content={"Статистика"}
        classes={" position-relative"}
      />
      <UserStatistic />
    </InformationalBlock>
    -->
  </div>
{/if}

<style>
  .main-cabinet {
    width: 100%;
    min-height: 100vh;
    display: flex;

    padding: 120px 60px 40px 281px;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .user-main-information-container {
    width: 100%;
    display: flex;
    margin: 20px 0 20px;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (max-width: 1440px) {
    .main-cabinet {
      padding: 100px 60px 20px 240px;
    }
  }

  @media screen and (max-width: 1024px) {
    .main-cabinet {
      flex-direction: column;
      padding: 80px 16px 40px 236px;
    }
  }
  @media screen and (max-width: 720px) {
    .main-cabinet {
      padding: 90px 16px 40px 16px;
    }
  }
</style>
