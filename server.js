const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");

const app = express();

// Bodyparser middleware
//app.use(
//     bodyParser.urlencoded({
//       extended: false
//     })
//   );
//   app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true})
    .then( () => console.log("Connected successfully"))
    .catch(err => console.log(err));

// Specify port
const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}.`));
