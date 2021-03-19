const oracledb = require("oracledb");
require("dotenv").config();

const user = process.env.USER;
const password = process.env.PASSWORD;
const connectString = process.env.CONNECTIONSTRING;

const dbConnectSelect = async (query, ...parameters) => {
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
    });

    console.log("Conectado a base");
    result = await connection.execute(query, [...parameters]);
  } catch (err) {
    return err.message;
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Conexão fechada");
        if (result.rows.length == 0) {
          return "query não retornou nada";
        } else {
          return result;
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};

const dbConnectInsert = async (query, ...parameters) => {
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
    });

    console.log("Conectado a base");
    result = await connection.execute(query, [...parameters], {
      autoCommit: true,
    });
    return result;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Conexão fechada");
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};

exports.dbConnectSelect = dbConnectSelect;
exports.dbConnectInsert = dbConnectInsert;
