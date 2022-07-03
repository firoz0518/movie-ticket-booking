const express = require("express");
const validate = require("../middlewares/validate");
const analyticsController = require("../controllers/analytics.controller");
const analyticsValidation = require("../validations/analytics.validation");
const auth = require("../middlewares/auth");
const router = express.Router();

router
.route("/visited")
  .get(
    auth(),
    validate(analyticsValidation.getVisitedAnalytics),
    analyticsController.getVisitedAnalytics
  );

  router
  .route("/profit")
  .get(
    auth(),
    validate(analyticsValidation.getProfitAnalytics),
    analyticsController.getProfitAnalytics
  );

module.exports = router;
