import {
    cropperLoading
} from "./cropperLoading";

export function cropImage(img, cb) {
    let croppedImage;
    cropperLoading().then(() => {
        const minCroppedWidth = 300;
        const minCroppedHeight = 300;
        const maxCroppedWidth = 500;
        const maxCroppedHeight = 500;
        const cropper = new Cropper(img, {
            aspectRatio: 1 / 1,
            responsive: true,
            scalable: false,
            toggleDragModeOnDblclick: false,
            zoomable: false,
            zoomOnTouch: false,
            zoomOnWheel: false,
            crop(e) {
                if (
                    e.detail.width < minCroppedWidth ||
                    e.detail.height < minCroppedHeight ||
                    e.detail.width > maxCroppedWidth ||
                    e.detail.height > maxCroppedHeight
                ) {
                    cropper.setData({
                        width: Math.max(
                            minCroppedWidth,
                            Math.min(maxCroppedWidth, e.detail.width)
                        ),
                        height: Math.max(
                            minCroppedHeight,
                            Math.min(maxCroppedHeight, e.detail.height)
                        ),
                    });
                }
            },
            ready() {
                croppedImage = cropper.getCroppedCanvas({
                    fillColor: "#fff",
                    imageSmoothingEnabled: false,
                    imageSmoothingQuality: "high",
                    ...cropper.getCropBoxData(),
                });
                cb(croppedImage);
            },
        });
        img.addEventListener("cropend", (event) => {
            console.log('cropend');
            croppedImage = cropper.getCroppedCanvas({
                fillColor: "#fff",
                imageSmoothingEnabled: false,
                imageSmoothingQuality: "high",
                ...cropper.getCropBoxData(),
            });
            cb(croppedImage);
        });
    });


}