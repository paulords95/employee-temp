const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());

//////
const checkIfTempWasTaken = require("./middleware/checkIfTempWasTaken");

//routes
app.use("/employees", require("./routes/getEmployees"));

app.get(
  "/api/checkiftempwastaken/:codUsu",
  checkIfTempWasTaken,
  async (req, res) => {
    try {
      res.json("foi");
    } catch (error) {
      res.send("server error");
    }
  }
);

app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
