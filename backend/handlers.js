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

//DONE
const getFlight = (req, res) => {
  const selectedFlight = req.params.id;

  if (flights[selectedFlight]) {
    // USE ON FRONTEND
    // seatObjects = {};
    // flights[selectedFlight].forEach((seat) => {
    //   seatObjects[seat.id] = seat;
    // });
    return res.status(200).json({status: 200, seating: flights[selectedFlight]})
  } else {
    return res.status(400).json({status: 400, message: "Error - The flight ID provided doesn't exist in our database."})
  }
};

// DONE
const addReservations = (req, res) => {
  // Add a new reservation
  const newReservation = req.body;
  const {
    flight,
    seat,
    givenName,
    surname,
    email,
  } = newReservation;
  newReservation.id = uuidv4();

  // Change the seat availability to false
  flights[newReservation.flight].some((seat) => {
    console.log(newReservation.seat)
    if (seat.id === newReservation.seat) {
      seat.isAvailable = false;
      return true;
    }
  })

  // Push the reservation to the server and return
  reservations.push(newReservation);
  return res.status(201).json({status: 201, data: newReservation, message: "Your reservation has been successful."})
};

// DONE
const getReservations = (req, res) => {
  return res.status(200).json({status: 200, reservations: reservations})
};

// DONE
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

// DONE
const deleteReservation = (req, res) => {
  // Find the reservation
  const selectedReservation = (reservations.find((reservation) => {
    return reservation.id === req.params.id
  }))
  console.log(selectedReservation);
  if (selectedReservation) {

    // Remove reservation from database
    const indexOfSelectedReservation = reservations.findIndex((reservation) => {
      return reservation.id === req.params.id
    });
    console.log(indexOfSelectedReservation);
    reservations.splice(indexOfSelectedReservation, 1);

    // Set seat availability back to true
    flights[selectedReservation.flight].some((seat) => {
      if (seat.id === selectedReservation.seat) {
        seat.isAvailable = true;
        return true;
      }
    })

    // Main return of server
    res.status(200).json({status: 200, data: selectedReservation, message: "The reservation has been deleted."})
  } else {
    res.status(400).json({status: 400, message: "Error - The reservation ID is not valid."})
  }
};

const updateReservation = async (req, res) => {
  
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
