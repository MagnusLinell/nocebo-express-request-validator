const Ajv = require('ajv');

const ajv = new Ajv();

const validateOptions = (options) => {
    if (!options || !options.schema) {
        throw Error("argument {schema: [schema]} must be set");
    }
};

const validateSchema = (options) => {
    const validate = ajv.compile(options.schema);
    return (req, res, next) => {
        const valid = validate(req.body);
        if (!valid) {
            return next({code: 'validation', error: validate.errors});
        }
        next();
    }
};

module.exports = (options) => {
    validateOptions(options);
    return validateSchema(options);
};
