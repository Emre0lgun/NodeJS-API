"use strict";
const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const app_config = require("../config/app_config");

const Arananlar = sequelize.define(
    "arananlar",
    {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }
    },
    {
        schema: app_config.sequelize.schema
    }
);

module.exports = Arananlar;
