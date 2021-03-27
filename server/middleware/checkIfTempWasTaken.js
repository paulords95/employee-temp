module.exports = async (req, res, next) => {
  const { dbConnectInsert, dbConnectSelect } = require("../db-connect");
  const checkRegister = `select * from usu_t577 where usu_datreg = TO_DATE('27/03/2021', 'DD/MM/YYYY') AND usu_codusu = :codUsu`;

  try {
    const result = await dbConnectSelect(checkRegister, req.params.codUsu);
    if (result.rows) {
      return res.json("temperature already taken");
    }

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(404).json("not taken");
  }
};
