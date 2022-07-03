const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const {moviesService} = require('../services');

const createMovieTicket = catchAsync(async (req, res) => {
  const ticket = await moviesService.createMovieTicket(req.body);
  if(!ticket){
    throw(new ApiError(httpStatus.BAD_REQUEST,"Failed to create Movie Ticket"));
  }
  res.status(httpStatus.CREATED).send({ message: "Ticket Created Successfully", data: [] });
});

const getMovieTickets = catchAsync(async (req, res) => {
  const tickets = await moviesService.getMovieTickets();
  res.send({ message: "Ticket(s) List", data: tickets ? tickets : [] });
});

const getMovieTicketById = catchAsync(async (req, res) => {
  const ticket = await moviesService.getMovieTicketById(req.params.movieId);
  if(!ticket){
    throw(new ApiError(httpStatus.BAD_REQUEST,"Ticket not found"));
  }
  res.send({ message: "Ticket Information", data: ticket });
});

const updateMovieTicketById = catchAsync(async (req, res) => {
  const ticket = await moviesService.updateMovieTicketById(req.params.movieId,req.body);
  if(!ticket){
    throw(new ApiError(httpStatus.BAD_REQUEST,"Ticket not found"));
  }
  res.send({ message: "Ticket updated Successfully", data: [] });
});

const deleteMovieTicketById = catchAsync(async (req, res) => {
  const ticket = await moviesService.deleteMovieTicketById(req.params.movieId);
  res.send({ message: "Ticket deleted Successfully", data: [] });
});


module.exports = {
  createMovieTicket,
  getMovieTickets,
  getMovieTicketById,
  updateMovieTicketById,
  deleteMovieTicketById,
};
