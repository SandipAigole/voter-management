const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const sequelize = require("./app/helpers/mysql-db-util");
// sequelize.sync();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to voter management application." });
});

// require('./app/routes/auth.routes')(app);
require("./app/routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});