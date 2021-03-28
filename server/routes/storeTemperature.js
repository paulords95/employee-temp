const router = require("express").Router();

const { dbConnectInsert } = require("../db-connect");

const checkIfTempWasTaken = require("../middleware/checkIfTempWasTaken");

router.get("/store-temperature", checkIfTempWasTaken, async (req, res) => {
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
    (select usu_nomusu from usu_t522 where usu_codusu =:nomUsu),
    :tmpAfe,
    :horReg
  )
  `;

    const params = {
      codUsu: req.params.codUsu,
      nomUsu: req.params.nomUsu,
      tmpAfe: parseFloat(req.params.tmpAfe),
      horReg: req.params.horReg,
    };

    dbConnectInsert(
      req,
      res,
      insertQuery,
      params.codUsu,
      params.nomUsu,
      params.tmpAfe,
      params.horReg
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
