const catchAsync = require("../utils/catchAsync");
const CRUD = require("./CRUD");

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await CRUD.updateTicket(Model, req.params.id, req.body);

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await CRUD.getTicket(Model, req.params.id);

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await CRUD.getAlltickets(Model, req.query);

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
