const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
const auth = require('./routes/auth')
const cookieParser = require('cookie-parser')

app.use(
  cors({ 
    origin: "http://localhost:3000", 
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", routes);
app.use("/", auth)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://mongodb:27017/kba_courses");// // need to change after docker ...service name change to LOCALHOST to ui
// 2nd mongodb is the service name above .

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
