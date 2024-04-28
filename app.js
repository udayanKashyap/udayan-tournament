const express = require("express");
const app = express();
const cors = require("cors");
const hostelRouter = require("./routes/hostel.route");
const studentRouter = require("./routes/student.route")
const adminRouter = require("./routes/admin.route");
const tournamentRouter = require("./routes/tournament.route");
const errorHandler = require("./utils/errorHandler");

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
app.use("/student", studentRouter);
app.use("/admin", adminRouter)
app.use("/tournament", tournamentRouter);
//error handler
app.use(errorHandler);
app.listen(8000, () => {
  console.log("server running at http://localhost:8000 🔥");
});
