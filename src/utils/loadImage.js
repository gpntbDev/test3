export function loadImage(input) {
    return new Promise((resolve, reject) => {

        let file = input.files[0];
        let reader = new FileReader();

        reader.onloadend = function () {

            resolve(reader.result);


        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            reject();
        }

    })
}