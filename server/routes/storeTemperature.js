const router = require("express").Router();

const { dbConnectInsert } = require("../db-connect");

const checkIfTempWasTaken = require("../middleware/checkIfTempWasTaken");

const currentDate = require("../utils/formatDate")();

router.post("/store-temperature", checkIfTempWasTaken, async (req, res) => {
  try {
    const { codUsu, codNameUsu, tmpAfe } = req.body;
    const d = new Date();
    const time = d.getHours() * 60 + d.getMinutes();

    const insertQuery = `
      INSERT INTO USU_T577 (USU_CODEMP, USU_DATREG, USU_CODUSU, USU_NOMUSU, USU_TMPAFE, USU_HORREG) VALUES
    (
      1,
      TO_DATE('${currentDate}','DD/MM/YYYY'),
      :codUsu,
      (select usu_nomusu from usu_t522 where usu_codusu =:codNameUsu),
      :tmpAfe,
      :horReg
    )
    `;

    dbConnectInsert(insertQuery, codUsu, codNameUsu, tmpAfe, time);

    res.status(200).json("Temperatura registrada com sucesso");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
