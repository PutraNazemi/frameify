document.addEventListener("DOMContentLoaded", function () {
    // Pastikan localStorage tersedia di klien
    if (typeof localStorage !== "undefined") {
        const twibbonUpload1 = document.getElementById("twibbon-upload1");
        const twibbonUpload2 = document.getElementById("twibbon-upload2");
        const previewCanvas = document.getElementById("previewCanvas");
        const downloadButton = document.getElementById("download-btn");
        const usageCountElement = document.getElementById("usage-count");
        const userPhotoScaleInput = document.getElementById("user-photo-scale");
        const userPhotoXInput = document.getElementById("user-photo-x");
        const userPhotoYInput = document.getElementById("user-photo-y");
        const resetButton = document.getElementById("reset-button");
        const twibbonFileNameElement = document.getElementById("twibbon-file-name");
        const userPhotoFileNameElement = document.getElementById("user-photo-file-name");

        let twibbonImage = null;
        let userPhotoImage = null;
        let userPhotoScale = 1;
        let userPhotoX = 0;
        let userPhotoY = 0;

        // Fungsi untuk memproses unggahan file
        function handleFileUpload(event, type) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function () {
                const img = new Image();
                img.onload = function () {
                    if (type === "twibbon") {
                        twibbonImage = img;
                        twibbonFileNameElement.textContent = `${file.name}`;  // Menampilkan nama file Twibbon
                    } else if (type === "user-photo") {
                        userPhotoImage = img;
                        userPhotoFileNameElement.textContent = `${file.name}`;  // Menampilkan nama file Foto Pengguna
                    }
                    drawPreview();
                };
                img.src = reader.result;
            };

            reader.readAsDataURL(file);
        }

        // Fungsi untuk menggambar di canvas
        function drawPreview() {
            const ctx = previewCanvas.getContext("2d");
            ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

            if (twibbonImage) {
                previewCanvas.width = twibbonImage.width;
                previewCanvas.height = twibbonImage.height;

                if (userPhotoImage) {
                    const userPhotoWidth = userPhotoImage.width * userPhotoScale;
                    const userPhotoHeight = userPhotoImage.height * userPhotoScale;
                    ctx.drawImage(
                        userPhotoImage,
                        userPhotoX,
                        userPhotoY,
                        userPhotoWidth,
                        userPhotoHeight
                    );
                }
                ctx.drawImage(twibbonImage, 0, 0);
            }
        }

        // Fungsi untuk mereset pengaturan posisi dan zoom
        function resetValues() {
            userPhotoScale = 1;
            userPhotoX = 0;
            userPhotoY = 0;
            userPhotoScaleInput.value = 1;
            userPhotoXInput.value = 0;
            userPhotoYInput.value = 0;
            drawPreview(); // Gambar ulang canvas setelah reset
        }

        // Fungsi untuk mendownload gambar dari canvas
        function downloadImage() {
            if (!twibbonImage || !userPhotoImage) {
                alert("Pastikan Anda sudah mengupload file Twibbon dan foto Anda.");
                return;
            }

            const dataURL = previewCanvas.toDataURL("image/png"); // Mengambil data gambar dari canvas
            const a = document.createElement("a");
            a.href = dataURL;
            a.download = "Twibbon_Ribbonify.png"; // Nama file yang akan diunduh
            a.click(); // Mengklik link untuk memulai download
        }

        // Event listener untuk upload
        twibbonUpload1.addEventListener("change", (event) => handleFileUpload(event, "twibbon"));
        twibbonUpload2.addEventListener("change", (event) => handleFileUpload(event, "user-photo"));

        // Event listener untuk tombol download
        downloadButton.addEventListener("click", downloadImage); // Panggil fungsi downloadImage

        // Event listener untuk mengatur posisi dan zoom
        userPhotoScaleInput.addEventListener("input", function (event) {
            userPhotoScale = parseFloat(event.target.value);
            drawPreview();
        });

        userPhotoXInput.addEventListener("input", function (event) {
            userPhotoX = parseInt(event.target.value);
            drawPreview();
        });

        userPhotoYInput.addEventListener("input", function (event) {
            userPhotoY = parseInt(event.target.value);
            drawPreview();
        });

        // Event listener untuk tombol reset
        resetButton.addEventListener("click", resetValues);

        } else {
        console.error("localStorage tidak tersedia di browser ini.");
    }
});

const texts = ["Mulailah merancang Twibbon Anda di sini!", "Sempurnakan gambar profil Anda dengan Twibbon di sini!", 
    "Tampilkan kepribadian Anda melalui Twibbon di sini!", "Personalisasikan Twibbon Anda di sini!"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    
    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
    
        document.getElementById('typing-effect').textContent = letter;
        if (index === currentText.length) {
            setTimeout(() => {
                count++;
                index = 0;
                setTimeout(type, 1000); 
            }, 2000); 
        } else {
            setTimeout(type, 100);
        }
    }
    
    type();
