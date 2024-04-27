const express = require("express");
const app = express();
const cors = require("cors");
const hostelRouter = require("./routes/hostel.route");

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());
//routes
app.use("/hostel", hostelRouter);

app.listen(8000, () => {
  console.log("server running at http://localhost:8000 🔥");
});
