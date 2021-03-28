const router = require("express").Router();

const { dbConnectInsert } = require("../db-connect");

const checkIfTempWasTaken = require("../middleware/checkIfTempWasTaken");

router.post("/store-temperature", checkIfTempWasTaken, async (req, res) => {
  console.log(req.params);
  const d = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const formatBr = d
    .toLocaleDateString("pt-BR", options)
    .split("-")
    .reverse()
    .join("/");

  const newDate = new Date(formatBr);

  try {
    const insertQuery = `
    INSERT INTO USU_T577 (USU_CODEMP, USU_DATREG, USU_CODUSU, USU_NOMUSU, USU_TMPAFE, USU_HORREG) VALUES
  (
    1,
    TO_DATE('${formatBr}','DD/MM/YYYY'),
    :codUsu,
    (select usu_nomusu from usu_t522 where usu_codusu =:codNameUsu),
    :tmpAfe,
    :horReg
  )
  `;

    const params = {
      codUsu: req.body.codUsu,
      codNameUsu: req.body.codNameUsu,
      tmpAfe: parseFloat(req.body.tmpAfe),
      horReg: req.body.horReg,
    };

    dbConnectInsert(
      insertQuery,
      params.codUsu,
      params.codNameUsu,
      params.tmpAfe,
      params.horReg
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
