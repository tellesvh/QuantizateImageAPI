// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialize the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes")
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
    next();
});
// Setup server port
var port = process.env.PORT || 8000;
// Send message for default URL
app.get('/', (req, res) => res.send('Trab do Casseb: Quantização e Pixelização'));
// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Rodando na porta: " + port);
});