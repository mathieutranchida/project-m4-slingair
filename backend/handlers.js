"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

//DONE
const getFlights = (req, res) => {
  const getAllFlights = Object.keys(flights);
  return res.status(200).json({status: 200, flights: getAllFlights})
};

//NEED TO FIGURE THIS OUT
const getFlight = (req, res) => {
  // const getAllFlights = Object.entries(flights);
  // console.log(getAllFlights);
  const getAllFlights = Object.keys(flights);
  const selectedFlight = req.params.id;

  console.log(selectedFlight);

  if (getAllFlights == selectedFlight) {
    return res.status(200).json({status: 200, seating: Object.values(flights)})
  } else {
    return res.status(400).json({status: 400, message: "Error - The flight ID provided doesn't exist in our database."})
  }
};

const addReservations = (req, res) => {
  const newReservation = req.body;
  const {
    flight,
    seat,
    givenName,
    surname,
    email,
  } = newReservation;
  newReservation.id = uuidv4();
  // MODIFY THE SEAT TAKEN HERE
  reservations.push(newReservation);
  return res.status(201).json({status: 201, data: newReservation, message: "Your reservation has been successful."})
};

//DONE
const getReservations = (req, res) => {
  return res.status(200).json({status: 200, reservations: reservations})
};

//DONE
const getSingleReservation = (req, res) => {
  const selectedReservation = (reservations.find((reservation) => {
    return req.params.id === reservation.id
  }))
  if (selectedReservation) {
    return res.status(200).json({status: 200, reservation: selectedReservation})
  } else {
    return res.status(400).json({status: 400, message: "Error - This reservation ID is not in our database."})
  }
};

const deleteReservation = (req, res) => {
  const selectedReservation = (reservations.find((reservation) => {
    return reservation.id === req.params.id
  }))
  if (selectedReservation) {
    //ADD FUNCTIONALITY TO REMOVE FROM DB
    // const indexOfSelectedReservation = reservations.findIndex(selectedReservation);
    // reservations.splice(indexOfSelectedReservation, 1);
    //ADD FUNCTIONALITY TO REMOVE SEAT FROM DB
    res.status(200).json({status: 200, data: selectedReservation, message: "The reservation has been deleted."})
  } else {
    res.status(200).json({status: 200, message: "Error - The reservation ID is not valid."})
  }
};

const updateReservation = (req, res) => {
  //DO THIS
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
