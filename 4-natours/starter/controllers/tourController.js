const fs = require('fs');

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: {
      tours: data,
    },
  });
};

const getTourByID = (req, res) => {
  const id = +req.params.id;
  const tour = data.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour with such id not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newRecord = req.body;
  newRecord.id = data[data.length - 1].id + 1;
  data.push(newRecord);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(data),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newRecord,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = data.find((el) => el.id === id);
  const updatedTour = Object.assign(tour, req.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(data),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const id = +req.params.id;
  const tour = data.find((el) => el.id === id);
  data.splice(data.indexOf(tour), 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(data),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

const checkID = (req, res, next, val) => {
  const id = +val;
  const tour = data.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour with such id not found',
    });
  }
  next();
};
const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or email',
    });
  }
  next();
};
module.exports = {
  getAllTours,
  getTourByID,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
};
