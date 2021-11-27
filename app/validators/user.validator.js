const Joi = require(`joi`);

const apiHandler = require('../handler/api-handler')
module.exports = {

  createVoter: (req, res, next) => {
    const schemaObject = Joi.object().keys({
      voter_id: Joi.string().required().error(new Error(`Voter id is required`)),
      visited: Joi.any().required().error(new Error(`Visited is required`)),
      ward_number: Joi.any(),
      admin_id: Joi.any(),
      phone_number: Joi.string().required().error(new Error(`Phone number is required`)),
      full_name: Joi.any(),
      address: Joi.any(),
      area: Joi.any(),
    });

    Joi.validate(req.body, schemaObject, (err) => {
      if (err) {
        apiHandler.setErrorResponseAsIs("", err.message, res);
      } else {
        next();
      }
    });
  },

  updateVoterDetails: (req, res, next) => {
    const schemaObject = Joi.object().keys({
      voter_id: Joi.string().required().error(new Error(`Voter id is required`)),
      visited: Joi.any(),
      ward_number: Joi.any(),
      admin_id: Joi.any(),
      phone_number: Joi.any(),
      full_name: Joi.any(),
      address: Joi.any(),
      area: Joi.any(),
    });

    Joi.validate(req.body, schemaObject, (err) => {
      if (err) {
        apiHandler.setErrorResponseAsIs("", err.message, res);
      } else {
        next();
      }
    });
  },
};
