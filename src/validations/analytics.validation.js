const Joi = require("joi");

const getVisitedAnalytics = {
  query: Joi.object().keys({
    method: Joi.string().required().valid("db-aggregation","js-algorithms"),
    startDate:Joi.string().required(),
    endDate:Joi.string().required(),
  }),
};

const getProfitAnalytics = {
    query: Joi.object().keys({
      method: Joi.string().required().valid("db-aggregation","js-algorithms"),
      startDate:Joi.string().required(),
      endDate:Joi.string().required(),
    }),
  };

module.exports = {
    getVisitedAnalytics,
    getProfitAnalytics,
};
