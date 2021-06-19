<script>
  import { onMount } from "svelte";

  onMount(() => {
    const script = document.createElement("script");
    script.id = "callbackForCaptcha";
    script.type = "text/javascript";
    script.innerHTML = `var successConfirmation = function () {
      document.querySelector(".captcha-button-confirm").disabled = false;
  };
    var onloadCallback = function () {
    grecaptcha.render("captcha", {
      'sitekey': '6LeChqoaAAAAABXyFY8k_cGdj54y2dNEoXnI7KRm',
      'callback': successConfirmation
  });
  };
 `;
    document.head.append(script);
    const scriptFromGoogle = document.createElement("script");
    scriptFromGoogle.id = "googlecaptcha";
    scriptFromGoogle.async = true;
    scriptFromGoogle.defer = true;
    scriptFromGoogle.src =
      "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit";
    script.onload = () => {
      grecaptcha.render("captcha", {
        sitekey: GOOGLE_RECAPTCHA_SITE_KEY,
      });
    };
    document.body.append(scriptFromGoogle);
    return () => {
      document.body.querySelector("script#googlecaptcha").remove();
      document.head.querySelector("script#callbackForCaptcha").remove();
    };
  });
</script>

<div id="captcha" />

<style>
  #captcha {
    margin-bottom: 40px;
  }
</style>
