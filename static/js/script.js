document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('convert-form');
    const imageContainer = document.getElementById('image-container');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const shareBtn = document.getElementById('share-btn');
    const favBtn = document.getElementById('fav-btn');
    const reportBtn = document.getElementById('report-btn');
    const codeInput = document.getElementById('code');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        updatePreview();
    });

    codeInput.addEventListener('input', function () {
        updatePreview();
    });

    fullscreenBtn.addEventListener('click', function () {
        if (!document.fullscreenElement) {
            imageContainer.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    shareBtn.addEventListener('click', function () {
        alert('Share functionality is not implemented yet.');
    });

    favBtn.addEventListener('click', function () {
        alert('Add to Favs functionality is not implemented yet.');
    });

    reportBtn.addEventListener('click', function () {
        alert('Report Bug functionality is not implemented yet.');
    });

    function updatePreview() {
        const code = document.getElementById('code').value;
        const language = document.getElementById('language').value;
        const style = document.getElementById('style').value;
        const fontFamily = document.getElementById('font-family').value;
        const fontSize = document.getElementById('font-size').value;
        const tabSize = document.getElementById('tab-size').value;
        const shadow = document.getElementById('shadow').value;
        const imageQuality = document.getElementById('image-quality').value;
        const padding = document.getElementById('padding').value;
        const lineNumbers = document.getElementById('line-numbers').value;
        const watermark = document.getElementById('watermark').value;
        const layout = document.getElementById('layout').value;

        fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                language: language,
                style: style,
                font_family: fontFamily,
                font_size: fontSize,
                tab_size: tabSize,
                shadow: shadow,
                image_quality: imageQuality,
                padding: padding,
                line_numbers: lineNumbers,
                watermark: watermark,
                layout: layout
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.highlighted_code) {
                imageContainer.innerHTML = data.highlighted_code;
            } else if (data.error) {
                imageContainer.innerHTML = `<p class="has-text-danger">${data.error}</p>`;
            }
        })
        .catch(error => {
            imageContainer.innerHTML = `<p class="has-text-danger">An error occurred: ${error.message}</p>`;
        });
    }
});