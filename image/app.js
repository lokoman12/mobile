const express = require('express');
const app = express();
const path = require('path');

// Установка директории, где хранятся изображения
const assetsDir = path.join(__dirname, 'assets');

app.get('/get_image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(assetsDir, imageName);

    res.sendFile(imagePath);
});

const PORT = 6666;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
