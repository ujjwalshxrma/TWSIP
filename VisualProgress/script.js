const imageInput = document.getElementById('imageInput');
const imageCanvas = document.getElementById('imageCanvas');
const applyFilterBtn = document.getElementById('applyFilter');
const resetImageBtn = document.getElementById('resetImage');


const ctx = imageCanvas.getContext('2d');

let originalImage = null;
let editedImage = null;


imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        originalImage = new Image();
        originalImage.src = URL.createObjectURL(file);
        originalImage.onload = () => {
            ctx.drawImage(originalImage, 0, 0, imageCanvas.width, imageCanvas.height);
            editedImage = new Image();
            editedImage.src = originalImage.src;
        };
    }
});


applyFilterBtn.addEventListener('click', () => {
    if (editedImage) {
        // For example, you could apply a simple grayscale filter
        ctx.drawImage(editedImage, 0, 0, imageCanvas.width, imageCanvas.height);
        const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
    }
});

resetImageBtn.addEventListener('click', () => {
    if (originalImage) {
        ctx.drawImage(originalImage, 0, 0, imageCanvas.width, imageCanvas.height);
        editedImage.src = originalImage.src;
    }
});
