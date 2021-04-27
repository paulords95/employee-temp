module.exports = async (req, res, next) => {
  const { dbConnectInsert, dbConnectSelect } = require("../db-connect");

  const currentDate = require("../utils/formatDate");

  const checkRegister = `select * from usu_t577 where usu_datreg = TO_DATE('26/04/2021','DD/MM/YYYY')   AND usu_codusu = :codUsu`;

  try {
    const result = await dbConnectSelect(checkRegister, req.body.codUsu);
    if (result.rows) {
      return res
        .status(401)
        .json(
          `Temperatura de ${result.rows[0][4].toFixed(
            1
          )}º já aferida na data de hoje para ${result.rows[0][3]}`
        );
    }

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(404).json("server error");
  }
};
