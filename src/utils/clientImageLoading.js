export function imageLoading() {
    return new Promise((resolve, reject) => {

        let loadedImage = document.createElement("img");
        let file = document.querySelector(".input-image").files[0];
        let reader = new FileReader();
        let canvas = document.createElement("canvas");
        canvas.width = 400;

        let ctx = canvas.getContext("2d");



        reader.onloadend = function () {
            loadedImage.src = reader.result;

            loadedImage.onload = () => {
                let hght;
                if (loadedImage.width == loadedImage.height) {
                    canvas.height = 400;
                }
                if (loadedImage.width > loadedImage.height || loadedImage.width < loadedImage.height) {
                    let ratio = loadedImage.height / loadedImage.width;
                    hght = 400 * ratio;
                    canvas.height = hght;
                }
                ctx.drawImage(loadedImage, 0, 0, loadedImage.width, loadedImage.height, 0, 0, canvas.width, hght);
                var fullQuality = canvas.toDataURL("image/jpeg", 0.8);
                console.log(fullQuality);

                resolve(fullQuality);

            }
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
             reject();
        }

    })
}