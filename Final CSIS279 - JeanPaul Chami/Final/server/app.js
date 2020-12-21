
var http = require("http");
var express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
var app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.enable('trust proxy');

var UserRoutes = require('./routes/user.routes');
app.use('/api/users', UserRoutes);

var itemRoutes = require('./routes/items.routes');
app.use('/api/items', ItemsRoutes);

var PriceRoutes = require('./routes/prices.routes');
app.use('/api/prices', PriceRoutes);


server.listen(port, () => console.log(`Listening on port ${port}`));