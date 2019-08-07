const fs = require('fs');
const imagemagickCli = require('imagemagick-cli');

exports.new = function (req, res) {

    var amount = 1.001 - req.body.pixelizationAmount;
    var pixelizationCoef1 = 100 * amount;
    var pixelizationCoef2 = 100 / amount;

    imagemagickCli.exec("magick convert " +
        "./" + req.file.path +
        // Color quantity
        " +dither -colors " + req.body.colors +
        needsGrayscale(req.body.grayscale) +
        // `-scale ${pixelizationCoef1}% -scale ${pixelizationCoef2}% ` +
        `-scale ${pixelizationCoef1}% ` +
        req.file.path + "-new")
        .then(({ stdout, stderr }) => {
            var photo = fs.readFileSync("./" + req.file.path + "-new")
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(photo)
            fs.unlink("./" + req.file.path, (err) => {
                if (err) {
                    console.log("Falhou ao deletar imagem:" + err);
                } else {
                    console.log('Imagem deletada com sucesso.');
                }
            });
            fs.unlink("./" + req.file.path + "-new", (err) => {
                if (err) {
                    console.log("Falhou ao deletar imagem:" + err);
                } else {
                    console.log('Imagem deletada com sucesso.');
                }
            });
        });
}

function needsGrayscale(grayscaleValue) {
    if (grayscaleValue === "true") {
        return " -grayscale Rec709Luminance "
    } else {
        return " "
    }
}