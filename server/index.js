const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());

//routes
app.use("/employees", require("./routes/getEmployees"));

app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
