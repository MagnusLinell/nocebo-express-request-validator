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
        if (req.method === 'POST' || req.method === 'PUT') {
            if (!validateSave(req.body)) {
                return next({code: 'validation', error: validateSave.errors});
            }
        } else if (req.method === 'GET') {
            if (!validateFind(req.query)) {
                return next({code: 'validation', error: validateFind.errors});
            }
        } else if (req.method === 'DELETE') {
            if (!validateDelete(req.query)) {
                return next({code: 'validation', error: validateDelete.errors});
            }
        }
        next();
    }
};

module.exports = (options) => {
    validateOptions(options);
    return validateSchema(options);
};
