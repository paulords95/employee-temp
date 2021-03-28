module.exports = async (req, res, next) => {
  const { dbConnectInsert, dbConnectSelect } = require("../db-connect");

  const currentDate = require("../utils/formatDate")();

  const checkRegister = `select * from usu_t577 where usu_datreg = TO_DATE('${currentDate}','DD/MM/YYYY')   AND usu_codusu = :codUsu`;

  try {
    const result = await dbConnectSelect(checkRegister, req.body.codUsu);
    if (result.rows) {
      return res
        .status(401)
        .json(
          `Temperatura já aferida para ${
            result.rows[0][3]
          } na data de hoje | ${result.rows[0][4].toFixed(1)}º`
        );
    }

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(404).json("server error");
  }
};
