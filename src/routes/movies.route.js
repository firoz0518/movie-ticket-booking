const express = require("express");
const validate = require("../middlewares/validate");
const moviesController = require("../controllers/movies.controller");
const moviesValidation = require("../validations/movies.validation");
const auth = require("../middlewares/auth");
const router = express.Router();

router
.route("/")
  .post(
    auth(),
    validate(moviesValidation.createMovieTicket),
    moviesController.createMovieTicket
  )
  .get(
    auth(),
    moviesController.getMovieTickets
  );

  router
  .route("/:movieId")
  .get(
    auth(),
    validate(moviesValidation.getMovieTicketById),
    moviesController.getMovieTicketById
  )
  .patch(
    auth(),
    validate(moviesValidation.updateMovieTicketById),
    moviesController.updateMovieTicketById
  )
  .delete(
    auth(),
    validate(moviesValidation.getMovieTicketById),
    moviesController.deleteMovieTicketById
  );

module.exports = router;
