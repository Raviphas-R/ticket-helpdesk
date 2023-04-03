const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Ticket = require("../models/ticketModel");

dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

const DB = "mongodb://0.0.0.0:27017/tickets";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection succesful"));

const tickets = JSON.parse(
  fs.readFileSync(`${__dirname}/ticket.json`, "utf-8")
);

const importData = async () => {
  try {
    await Ticket.create(tickets);
    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Ticket.deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
