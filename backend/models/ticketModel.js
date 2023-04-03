const mongoose = require("mongoose");
const slugify = require("slugify");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Ticket must have title"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please describe the ticket"],
  },
  contactInfo: {
    type: String,
    required: [true, "Ticket must have contact information."],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: Date,
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Resolved", "Rejected"],
    default: "pending",
  },
});

ticketSchema.index({ createAt: -1 });

ticketSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
