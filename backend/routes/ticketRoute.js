const express = require("express");
const ticketController = require("../controllers/ticketController");

const router = express.Router();

router
  .route("/")
  .get(ticketController.getAllTicket)
  .post(ticketController.createTicket);

router
  .route("/:id")
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket);

module.exports = router;
