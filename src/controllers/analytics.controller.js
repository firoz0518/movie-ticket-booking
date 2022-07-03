const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { moviesService } = require("../services");

const getVisitedAnalytics = catchAsync(async (req, res) => {
  const method = req.query.method ? req.query.method : "";
  if (!method) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Method not Found.");
  }
  const filter = req.query;
  if (method == "db-aggregation") {
    const result = await moviesService.getDbAggregationVisitedAnalytics(filter);
    res.send({ message: "Visitor(s) Summary", data: result });
  } else if (method == "js-algorithms") {
    const result = await moviesService.getJsAggregationVisitedAnalytics(filter);
    res.send({ message: "Visitor(s) Summary", data: result });
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Method not Found.");
  }
});

const getProfitAnalytics = catchAsync(async (req, res) => {
    const method = req.query.method ? req.query.method : "";
  if (!method) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Method not Found.");
  }
  const filter = req.query;
  if (method == "db-aggregation") {
    const result = await moviesService.getDbAggregationProfitAnalytics(filter);
    res.send({ message: "Visitor(s) Summary", data: result });
  } else if (method == "js-algorithms") {
    const result = await moviesService.getJsAggregationProfitAnalytics(filter);
    res.send({ message: "Visitor(s) Summary", data: result });
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Method not Found.");
  }
});
module.exports = { getVisitedAnalytics, getProfitAnalytics };
