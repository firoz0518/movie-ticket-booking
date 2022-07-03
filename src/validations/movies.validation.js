const Joi = require("joi");

const createMovieTicket = {
  body: Joi.object().keys({
    customerName: Joi.string().required().label("Customer Name"),
    movieTitle: Joi.required().label("Movie Title"),
    movieTime: Joi.string().required().label("Movie Time"),
    ticketPrice: Joi.number().required().label("Ticket Price"),
  }),
};

const getMovieTicketById = {
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
};

const updateMovieTicketById = {
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      customerName: Joi.string().required().label("Customer Name"),
      movieTitle: Joi.required().label("Movie Title"),
      movieTime: Joi.string().required().label("Movie Time"),
      ticketPrice: Joi.number().required().label("Ticket Price"),
    })
    .min(1),
};

module.exports = {
  createMovieTicket,
  getMovieTicketById,
  updateMovieTicketById,
};
