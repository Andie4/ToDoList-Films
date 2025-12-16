
require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// console.log(process.env.SECRET_KEY);
require("./Services/mongo");
// require("./Services/passport")(app);



app.use(morgan("tiny"));
app.use(cors({ credentials: true, origin: "*" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// require("./Services/passport")(app);

app.use("/user", require("./Controllers/user"));


app.get("/", (req, res) => {
  res.send("API - Last deploy: " + new Date().toISOString());
});

//ne fonctionne pas re chercher le pblm ou supp
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
