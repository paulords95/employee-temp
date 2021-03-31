const router = require("express").Router();

const { dbConnectSelect } = require("../db-connect");

const currentDate = require("../utils/formatDate")();

const convertMinutesToHours = require("../utils/minutesToHours");

router.get("/get-temperatures", async (req, res) => {
  try {
    const query = `select usu_nomusu, usu_tmpafe, usu_horreg from usu_t577 where usu_datreg = TO_DATE(:dat,'DD/MM/YYYY')`;
    const temperatures = await dbConnectSelect(query, currentDate);
    const response = [];
    if (temperatures.rows) {
      for (let i of temperatures.rows) {
        response.push({
          name: i[0],
          temp: i[1],
          time: convertMinutesToHours(i[2]),
        });
      }
    }
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
