const router = require("express").Router();

const { dbConnectSelect } = require("../db-connect");

const currentDate = require("../utils/formatDate");

const convertMinutesToHours = require("../utils/minutesToHours");

router.get("/get-temperatures", async (req, res) => {
  try {
    const query = `select usu_nomusu, usu_tmpafe, usu_horreg from usu_t577 where usu_datreg = TO_DATE('26/04/2021','DD/MM/YYYY') order by 3`;
    const temperatures = await dbConnectSelect(query);
    const response = [];
    if (temperatures.rows) {
      let total = 0;
      let count = 0;
      for (let i of temperatures.rows) {
        let num = parseFloat(i[1].toFixed(1));
        count++;
        total += num;
        response.push({
          name: i[0],
          temp: i[1].toFixed(1),
          time: convertMinutesToHours(i[2]),
        });
      }
      const avgTemp = total.toFixed(1) / count;
      console.log(avgTemp.toFixed(2));
    }

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
