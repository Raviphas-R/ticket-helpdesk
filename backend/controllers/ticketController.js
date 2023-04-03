const Ticket = require("../models/ticketModel");
const AppError = require("../utils/appError");
const factory = require("./handleFactory");

exports.getAllTicket = factory.getAll(Ticket);
exports.getTicket = factory.getOne(Ticket);
exports.createTicket = factory.createOne(Ticket);
exports.updateTicket = factory.updateOne(Ticket);
