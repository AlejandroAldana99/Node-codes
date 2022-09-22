/* Entiry controller file */
import { body }                       from "express-validator";
import { createValidator, getEntity } from '~/Helpers';
import * as constants                 from "~/Config/constants";

const entityListValidation = createValidator([
	body("startId").notEmpty().isNumeric().isInt({ min: 1, max: 20 }),
    body("endId").notEmpty().isNumeric().isInt({ min: 1, max: 20 }),
]);
const entityList = async (req, res) => {
    try {
        let { startId, endId } = req.body;
        let listIds = [];
        for (let i = startId; i <= endId; i++) {
            listIds.push(i);
        }
        let list = await Promise.all(listIds.map(id => getEntity(id)));
        list.sort(function(a, b) {
            var textA = a.data.name.toUpperCase();
            var textB = b.data.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        if (list.length > 0) {
            return res.status(200).send({
                status: 200,
                entity: list,
            });
        }
        else {
            return res.status(404).send({
                status: 404,
                Error: constants.notFoundError
            });
        }

    }
    catch (err) {
        console.error("[entity.controller -> entityList] ", err);
		return res.status(500).send({ err : constants.fatalError });
    }
};
export const getEntityList = [ entityListValidation, entityList ];