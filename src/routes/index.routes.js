const VisualRecognitionV3 = require ('ibm-watson/visual-recognition/v3');
const fs = require('fs');
const { Router } = require('express');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'sriosv',
    api_key: '551141971617259',
    api_secret: 'bqnhXJ6RZ5PEz8v3HlygI7TdcKA'
})
const router = Router();

router.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'Hello World'
    })
})

router.get('/add', (req, res) => {
    res.render('image_form');
});

router.post('/add', async (req, res) => {

    console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result.url);

    const visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: '3DeN5GN0szXkNUbZRP86uz6HD8ymsYJbYYhXB7EZa4jN',
    })

    var url = result.secure_url;

    var params = {
        url: url,
    };

    visualRecognition.classify(params, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(response, null, 2))
        }
    });

    res.render('image_form')
    await fs.unlink(req.file.path, (err) => {
        if(err) throw err;
        console.log('Archivo eliminado');
    })
})

module.exports = router;