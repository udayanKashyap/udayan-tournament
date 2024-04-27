const express = require("express");
const db = require("./db/db.js");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());

app.listen(8000, () => {
  console.log("server running at http://localhost:8000 🔥");
});
