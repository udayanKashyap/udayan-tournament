const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require('jsonwebtoken')
const hostelRouter = require("./routes/hostel.route");
const studentRouter = require("./routes/student.route")
const adminRouter = require("./routes/admin.route");
const tournamentRouter = require("./routes/tournament.route");
const matchRouter = require("./routes/match.route");

const errorHandler = require("./utils/errorHandler");
const catchAsync = require("./utils/catchAsync");
const { jwt_secret } = require("./utils/config");

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());
//routes
app.post('/verify', catchAsync((req, res) => {
  const { token } = req.body
  const data = jwt.verify(token, jwt_secret)
  res.send({ ...data })
}))

app.use("/hostel", hostelRouter);
app.use("/student", studentRouter);
app.use("/admin", adminRouter)
app.use("/tournament", tournamentRouter);
app.use("/matches", matchRouter);
//error handler
app.use(errorHandler);
app.listen(8000, () => {
  console.log("server running at http://localhost:8000 🔥");
});
