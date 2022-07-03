const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const conn = require("../utils/ApiError");
const mysql = require("mysql");
var _ = require("lodash");
const async = require("async");


var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "movie_tickets",
});

/**
 * Create a Movie Ticket
 * @param {Object} ticketBody
 */
const createMovieTicket = async (ticketBody) => {
  const { customerName, movieTitle, movieTime, ticketPrice } = ticketBody;
  const query =
    "Insert into tickets(customer_name,movie_title,movie_time,ticket_price,created_date) VALUES('" +
    customerName +
    "','" +
    movieTitle +
    "','" +
    movieTime +
    "','" +
    ticketPrice +
    "',NOW())";
  const ticket = await mySqlQueryExecute(query);
  return ticket;
};

const getMovieTickets = async () => {
  const query = "SELECT * FROM tickets";
  const tickets = await mySqlQueryExecute(query);
  return tickets;
};

const getMovieTicketById = async (movieId) => {
  const query = "SELECT * FROM tickets where id =" + movieId;
  const ticket = await mySqlQueryExecute(query);
  return ticket[0];
};

const updateMovieTicketById = async (movieId, updateBody) => {
  const { customerName, movieTitle, movieTime, ticketPrice } = updateBody;
  const ticket = await getMovieTicketById(movieId);
  if (ticket.length == 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Ticket not found");
  }
  const query =
    "Update tickets set customer_name = '" +
    customerName +
    "',movie_title ='" +
    movieTitle +
    "',movie_time='" +
    movieTime +
    "',ticket_price='" +
    ticketPrice +
    "' where id=" +
    movieId;
  const updateTicket = await mySqlQueryExecute(query);
  return updateTicket;
};

const deleteMovieTicketById = async (movieId) => {
  const ticket = await getMovieTicketById(movieId);
  if (ticket.length == 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Ticket not found");
  }
  const query = "DELETE from tickets where id=" + movieId;
  await mySqlQueryExecute(query);
  return true;
};

const getDbAggregationVisitedAnalytics = async (filter) => {
  const startDate = filter.startDate;
  const endDate = filter.endDate;
  const query =
    "select MONTHNAME(created_date) as month,count(*) as summaryVisits  from (SELECT * from tickets where (DATE(created_date) BETWEEN '" +
    startDate +
    "' AND '" +
    endDate +
    "')) as t GROUP BY YEAR(created_date), MONTH(created_date)";
  const analytics = await mySqlQueryExecute(query);
  return analytics;
};

const getJsAggregationVisitedAnalytics = async (filter) => {
  const startDate = filter.startDate;
  const endDate = filter.endDate;
  const query =
    "SELECT *,concat(YEAR(created_date),'-',MONTH(created_date)) as month,MONTHNAME(created_date) as month_name from tickets where (DATE(created_date) BETWEEN '" +
    startDate +
    "' AND '" +
    endDate +
    "')";
  const analytics = await mySqlQueryExecute(query);
  var groupByMonth = _.chain(analytics).groupBy("month").value();
  let finalList = [];
  async.eachSeries(
    Object.keys(groupByMonth),
    function (eachRow, callback) {
          var visitorsCount = groupByMonth[eachRow] ? groupByMonth[eachRow].length : 0;
          var visitorsArr = {
            month: groupByMonth[eachRow][0].month_name,
            summaryVisits: visitorsCount
          }
          finalList.push(visitorsArr);
          callback();
    },
    (error) => {
      if (!error) {
        return finalList;
      } else {
        return [];
      }
    }
  );
  return finalList;
};

const getDbAggregationProfitAnalytics = async (filter) => {
  const startDate = filter.startDate;
  const endDate = filter.endDate;
  const query =
    "select MONTHNAME(created_date) as month,SUM(ticket_price) as summaryProfit  from (SELECT * from tickets where (DATE(created_date) BETWEEN '" +
    startDate +
    "' AND '" +
    endDate +
    "')) as t GROUP BY YEAR(created_date), MONTH(created_date)";
  const analytics = await mySqlQueryExecute(query);
  return analytics;
};

const getJsAggregationProfitAnalytics = async (filter) => {
  const startDate = filter.startDate;
  const endDate = filter.endDate;
  const query =
    "SELECT *,concat(YEAR(created_date),'-',MONTH(created_date)) as month,MONTHNAME(created_date) as month_name from tickets where (DATE(created_date) BETWEEN '" +
    startDate +
    "' AND '" +
    endDate +
    "')";
  const analytics = await mySqlQueryExecute(query);
  var groupByMonth = _.chain(analytics).groupBy("month").value();
  let finalList = [];
  async.eachSeries(
    Object.keys(groupByMonth),
    function (eachRow, callback) {
          var summaryProfit = 0;
          for (var i = 0; i < groupByMonth[eachRow].length; i++) {
            summaryProfit = summaryProfit + groupByMonth[eachRow][i].ticket_price;
          }
          var visitorsArr = {
            month: groupByMonth[eachRow][0].month_name,
            summaryProfit: summaryProfit
          }
          finalList.push(visitorsArr);
          callback();
    },
    (error) => {
      if (!error) {
        return finalList;
      } else {
        return [];
      }
    }
  );
  return finalList;
};

const mySqlQueryExecute = async (query) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log("connection Failed"); // not connected!
        resolve(false);
      }
      // Use the connection
      connection.query(query, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) {
          console.log("sqlError", error.message);
          resolve([]);
        }
        if (results) {
          resolve(results);
        }
        // Don't use the connection here, it has been returned to the pool.
      });
    });
  });
};

module.exports = {
  createMovieTicket,
  getMovieTickets,
  getMovieTicketById,
  updateMovieTicketById,
  deleteMovieTicketById,
  getDbAggregationVisitedAnalytics,
  getJsAggregationVisitedAnalytics,
  getDbAggregationProfitAnalytics,
  getJsAggregationProfitAnalytics
};
