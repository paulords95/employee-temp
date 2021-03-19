const router = require("express").Router();

const { dbConnectSelect } = require("../db-connect");

router.get("/get-employees", async (req, res) => {
  try {
    const employees = await dbConnectSelect(
      "select usu_nomusu, usu_codusu, usu_nrocra from usu_t522 where usu_nrocra is not null ORDER BY 1 ASC"
    );
    const response = [];
    if (employees.rows) {
      for (let i of employees.rows) {
        response.push({
          name: i[0],
          cod: i[1],
          nCra: i[2],
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
