// Validator Helper
import { validationResult } from "express-validator";

const createValidator = (validations = [] ) => [
	...validations,
	(req, res, next) => {
		const errors = validationResult(req);

		if (errors.isEmpty()) return next();

		return res.status(400).send({
			err : errors.array(),
		});
	},
];

export default createValidator;