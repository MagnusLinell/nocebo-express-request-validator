const Ajv = require('ajv');

const ajv = new Ajv();

const validateOptions = (options) => {
    if (!options || !options.schema) {
        throw Error("argument {schema: [schema]} must be set");
    }
    if (!options.schema.find) {
        throw Error("argument {schema: {find: [schema]}} must be set");
    }
    if (!options.schema.save) {
        throw Error("argument {schema: {save: [schema]}} must be set");
    }
    if (!options.schema.delete) {
        throw Error("argument {schema: {delete: [schema]}} must be set");
    }
};

const validateSchema = (options) => {
    const validateSave = ajv.compile(options.schema.save);
    const validateFind = ajv.compile(options.schema.find);
    const validateDelete = ajv.compile(options.schema.delete);
    return (req, res, next) => {
        const valid = false;
        if (req.method === 'POST' || req.method === 'PUT') {
            valid = validateSave(req.body);
        } else if (req.method === 'GET') {
            valid = validateFind(req.query);
        } else if (req.method === 'DELETE') {
            valid = validateDelete(req.query);
        }
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
