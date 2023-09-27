const db = require("../models");
const { QueryTypes, Op } = require("sequelize");
const { createSurvey } = require("../validation/survey.validation");

exports.refactoreMe1 = async (req, res) => {
  // function ini sebenarnya adalah hasil survey dri beberapa pertnayaan, yang mana nilai dri jawaban tsb akan di store pada array seperti yang ada di dataset
  try {
    const data = await db.sequelize.query(`SELECT * FROM "Surveys"`, {
      type: QueryTypes.SELECT,
    });

    return res.status(200).send({
      statusCode: 200,
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      success: false,
    });
  }
};

exports.refactoreMe2 = async (req, res) => {
  // function ini untuk menjalakan query sql insert dan mengupdate field "dosurvey" yang ada di table user menjadi true, jika melihat data yang di berikan, salah satu usernnya memiliki dosurvey dengan data false
  const { error, value } = createSurvey.validate(req.body);
  if (error) {
    return res.status(400).send({
      statusCode: 400,
      message: error.message,
      success: false,
    });
  }

  try {
    const [checkUser] = await db.sequelize.query(
      `SELECT id,dosurvey FROM "Users" WHERE id = ${value.userId} LIMIT 1`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (!checkUser) {
      return res.status(404).send({
        statusCode: 404,
        message: "UserId not found",
        success: false,
      });
    }
    if (checkUser.dosurvey) {
      return res.status(403).send({
        statusCode: 403,
        message: "User was doing dosurvey",
        success: false,
      });
    }

    const sqlUpdate = `UPDATE "Users" SET dosurvey = true WHERE id = ${value.userId}`;
    const sqlInsert = `INSERT INTO "Surveys" ("userId", values,"createdAt","updatedAt") VALUES ('${
      value.userId
    }', '{${value.values.toString()}}',NOW(),NOW());`;

    await db.sequelize.query(sqlInsert, {
      type: QueryTypes.INSERT,
    });
    await db.sequelize.query(sqlUpdate, {
      type: QueryTypes.UPDATE,
    });

    return res.status(201).send({
      statusCode: 201,
      message: "Survey sent successfully!",
      success: true,
      data: value,
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: "Cannot post survey.",
      success: false,
    });
  }
};

exports.callmeWebSocket = async (req, res) => {
  db.sequelize
    .query(`select * from "Attackers"`)
    .then((data) => {
      console.log(data[0]);
      res.status(200).send({
        statusCode: 200,
        success: true,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        statusCode: 500,
        message: "Cannot post survey.",
        success: false,
      });
    });
};

exports.getData = (req, res) => {
  // do something
};
