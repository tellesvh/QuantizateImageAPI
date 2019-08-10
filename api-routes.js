let router = require('express').Router();
const multer = require('multer')

router.get('/', function (req, res) {
    res.json({
        status: 200,
        message: "Tudo certo."
    });
});

var uploads = multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename;
    },
});

var imageController = require('./controller/imageController');

// Rotas
router
    .route('/image')
    .post(uploads.single('photo'), imageController.new)

module.exports = router;
