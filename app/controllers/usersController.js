const { login, register } = require("../validation/users.validation");
const db = require("../models");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/auth");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { error, value } = login.validate(req.body);
    if (error) {
      return res.status(400).send({
        statusCode: 400,
        message: error.message,
        success: false,
      });
    }

    const [checkLogin] = await db.sequelize.query(
      `SELECT * FROM "Users" WHERE "digits" = '${value.digits}' LIMIT 1`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (!checkLogin) {
      return res.status(404).send({
        statusCode: 404,
        message: "Users not found",
        success: false,
      });
    }

    const verifyPassword = bcrypt.compareSync(
      value.password,
      checkLogin.password
    );

    if (!verifyPassword) {
      return res.status(400).send({
        statusCode: 400,
        message: "Password not match",
        success: false,
      });
    }

    const resp = {
      userId: checkLogin.id,
      token: jwt.sign(
        {
          id: checkLogin.id,
          fullname: checkLogin.fullname,
          role: checkLogin.role,
        },
        config.secret,
        { expiresIn: 1800 }
      ),
    };

    return res.status(200).send({
      statusCode: 200,
      success: true,
      data: resp,
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      success: false,
    });
  }
};

exports.register = async (req, res) => {
  const { error, value } = register.validate(req.body);
  if (error) {
    return res.status(400).send({
      statusCode: 400,
      message: error.message,
      success: false,
    });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).send({
      statusCode: 403,
      message: "Forbidden",
      success: false,
    });
  }

  try {
    const [password, [checkUser], [checkId]] = await Promise.all([
      bcrypt.hashSync(value.password, config.salt),
      db.sequelize.query(
        `SELECT * FROM "Users" WHERE "digits" = '${value.digits}' LIMIT 1`,
        {
          type: QueryTypes.SELECT,
        }
      ),
      db.sequelize.query(`SELECT COUNT("id") AS lastId FROM "Users"`, {
        type: QueryTypes.SELECT,
      }),
    ]);

    if (checkUser) {
      return res.status(409).send({
        statusCode: 409,
        message: "Already exist",
        success: false,
      });
    }

    const sql = `INSERT INTO "Users" 
    ("id","digits", "fotoUrl","workType","positionTitle","lat","lon","company","fullname","role","password","createdAt","updatedAt") 
    VALUES (${Number(checkId.lastid) + 1},'${value.digits}','${
      value.fotoUrl
    }','${value.workType}','${value.positionTitle}',${value.lat},${
      value.lon
    },'${value.company}','${value.fullname}','${
      value.role
    }','${password}',NOW(),NOW());`;

    await db.sequelize.query(sql, {
      type: QueryTypes.INSERT,
    });

    return res.status(201).send({
      statusCode: 201,
      message: "Users create!",
      success: true,
      data: value,
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      success: false,
    });
  }
};
