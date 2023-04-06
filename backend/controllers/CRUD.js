const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getTicket = async (Model, id) => {
  const doc = await Model.findById(id);

  if (!doc) {
    throw new AppError(
      "Cannot get ticket, No document found with that ID",
      404
    );
  }

  return doc;
};

exports.updateTicket = async (Model, id, body) => {
  const doc = await Model.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    throw new AppError(
      "Cannot update ticket, No document found with that ID",
      404
    );
  }
  return doc;
};

exports.getAlltickets = async (Model, query) => {
  const feature = new APIFeatures(Model.find(), query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await feature.query;
  if (doc.length === 0) {
    throw new AppError("Please check your URL query is correct?", 404);
  }
  return doc;
};
