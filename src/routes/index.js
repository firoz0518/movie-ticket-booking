const express = require("express");
const moviesRoute = require("./movies.route");
const analyticsRoute = require("./analytics.route");

const router = express.Router();
const defaultRoutes = [
  {
    path: "/movies",
    route: moviesRoute,
  },
  {
    path: "/analytics",
    route: analyticsRoute,
  },

];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
