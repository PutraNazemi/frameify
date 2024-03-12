document.addEventListener('DOMContentLoaded', function() {
    const twibbonUpload1 = document.getElementById('twibbon-upload1');
    const twibbonUpload2 = document.getElementById('twibbon-upload2');
    const previewCanvas = document.getElementById('previewCanvas');
    const downloadButton = document.getElementById('download-btn');
    const userPhotoScaleInput = document.getElementById('user-photo-scale');
    const userPhotoXInput = document.getElementById('user-photo-x');
    const userPhotoYInput = document.getElementById('user-photo-y');
    const resetButton = document.getElementById('reset-button');

    let twibbonImage = null;
    let userPhotoImage = null;
    let userPhotoScale = 1;
    let userPhotoX = 0;
    let userPhotoY = 0;

    twibbonUpload1.addEventListener('change', handleTwibbonUpload);
    twibbonUpload2.addEventListener('change', handleUserPhotoUpload);
    resetButton.addEventListener('click', resetValues);

    function handleTwibbonUpload(event) {
        handleFileUpload(event, 'twibbon');
    }
    
    function handleUserPhotoUpload(event) {
        handleFileUpload(event, 'user-photo');
    }
    
    function handleFileUpload(event, type) {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = function() {
            if (type === 'twibbon') {
                twibbonImage = new Image();
                twibbonImage.onload = function() {
                    drawPreview();
                };
                twibbonImage.src = reader.result;
            } else if (type === 'user-photo') {
                userPhotoImage = new Image();
                userPhotoImage.onload = function() {
                    drawPreview();
                };
                userPhotoImage.onerror = function() {
                    alert('Failed to load user photo!');
                };
                userPhotoImage.src = reader.result;
            }
        };
    
        reader.readAsDataURL(file);
    }
    
    function drawPreview() {
        const ctx = previewCanvas.getContext('2d');
        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    
        if (twibbonImage) {
            previewCanvas.width = twibbonImage.width;
            previewCanvas.height = twibbonImage.height;
    
            if (userPhotoImage) {
                const userPhotoWidth = userPhotoImage.width * userPhotoScale;
                const userPhotoHeight = userPhotoImage.height * userPhotoScale;
                ctx.drawImage(userPhotoImage, userPhotoX, userPhotoY, userPhotoWidth, userPhotoHeight);
            }
    
            ctx.drawImage(twibbonImage, 0, 0);
        }
    }
    
    downloadButton.addEventListener('click', function() {
        if (twibbonImage && userPhotoImage) {
            const ctx = previewCanvas.getContext('2d');
            previewCanvas.width = twibbonImage.width;
            previewCanvas.height = twibbonImage.height;

            ctx.drawImage(userPhotoImage, userPhotoX, userPhotoY, userPhotoImage.width * userPhotoScale, userPhotoImage.height * userPhotoScale);
            ctx.drawImage(twibbonImage, 0, 0);

            const downloadLink = document.createElement('a');
            downloadLink.href = previewCanvas.toDataURL();
            downloadLink.download = 'twibbonized_image.png';
            downloadLink.click();
        } else {
            alert('Upload foto twibbon dan foto anda terlebih dahulu');
        }
    });

    userPhotoScaleInput.addEventListener('input', function(event) {
        userPhotoScale = parseFloat(event.target.value);
        drawPreview();
    });

    userPhotoXInput.addEventListener('input', function(event) {
        userPhotoX = parseInt(event.target.value);
        drawPreview();
    });

    userPhotoYInput.addEventListener('input', function(event) {
        userPhotoY = parseInt(event.target.value);
        drawPreview();
    });

    function resetValues() {
        userPhotoXInput.value = 0;
        userPhotoYInput.value = 0;
        userPhotoScaleInput.value = 1;
        userPhotoScale = 1;
        userPhotoX = 0;
        userPhotoY = 0;
        drawPreview();
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

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTopBtn").style.display = "block";
  } else {
    document.getElementById("backToTopBtn").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

var startButton = document.querySelector('.start-button');

startButton.addEventListener('click', function(event) {
    event.preventDefault();

    var targetElement = document.getElementById('mulaiupload');

    targetElement.scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener("DOMContentLoaded", function() {
    const resetButton = document.getElementById('reset-button');
    const xRange = document.getElementById('user-photo-x');
    const yRange = document.getElementById('user-photo-y');
    const scaleRange = document.getElementById('user-photo-scale');

    resetButton.addEventListener('click', function() {
        xRange.value = 0;
        yRange.value = 0;
        scaleRange.value = 1;
    });
});


