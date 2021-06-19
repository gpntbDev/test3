export function cropperLoading() {
    return new Promise((resolve, reject) => {


        if (!window.Cropper) {
            const cropperScript = document.createElement("script");
            const cropperLinkCss = document.createElement("link");
            cropperScript.src =
                "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.11/cropper.js";
            cropperScript.id = "cropperScript";
            cropperLinkCss.href =
                "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.11/cropper.css";
            cropperLinkCss.rel = "stylesheet";

            document.head.append(cropperScript);
            document.head.append(cropperLinkCss);

            cropperScript.onload = () => {

                resolve();

            }


        } else {
            resolve();


        }

    });

}