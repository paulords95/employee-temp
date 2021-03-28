module.exports = async (req, res, next) => {
  const { dbConnectInsert, dbConnectSelect } = require("../db-connect");
  const d = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const formatBr = d
    .toLocaleDateString("pt-BR", options)
    .split("-")
    .reverse()
    .join("/");

  const newDate = new Date(formatBr);

  const checkRegister = `select * from usu_t577 where usu_datreg = TO_DATE('${formatBr}','DD/MM/YYYY')   AND usu_codusu = :codUsu`;

  try {
    const result = await dbConnectSelect(checkRegister, req.params.codUsu);
    if (result.rows) {
      return res.json("temperature already taken");
    }

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(404).json("server error");
  }
};
