const Arananlar = require("../tables/arananlar");
const sequelize = require("../config/sequelize");
const app_config = require("../config/app_config");
const {where, unescapeJSON} = require('../utils');

module.exports = {
    create(req, res) {
        req.body = unescapeJSON(req.body);
        console.log(req.body);
        if(req.body.id)
            req.body.id = parseInt(req.body.id);
        console.log(req.body.status);
        return Arananlar.create({
            ...req.body
        })
            .then(Sample => res.status(201).send(Sample))
            .catch(error => {
                console.log("error",error);
                res.status(400).send(error)
            });
    },
    update(req, res) {
        req.body = unescapeJSON(req.body);
        const {id, ...rest} = req.body;

        return Arananlar.update(
            {
                ...rest
            },
            {
                where: {
                    id
                }
            }
        )
            .then(Sample => res.status(201).send(Sample))
            .catch(error => res.status(400).send(error));
    },
    deleteRecord(req, res) {
        req.body = unescapeJSON(req.body);
        return Arananlar.destroy({
            where: {
                ...req.body


            }
        })
            .then(() => res.status(201).send({status: 201, message: "Deleted", ...req.body}))
            .catch(error => res.status(400).send(error));
    },
    fetchData(req, res) {
        req.body = unescapeJSON(req.body);
        const params = {attributes: ["id"]};
        if (req.body) params.where = {...(params.where || {}), ...req.body};

        return sequelize.query(
            `select * from arananlars
            ${where(params.where)}
            `,
            {replacements: params.where, type: sequelize.QueryTypes.SELECT}
        )
            .then(Sample => res.status(201).send(Sample))
            .catch(error => res.status(400).send(error));
    },

    sync() {
        return Arananlar.sync();
    }
};
