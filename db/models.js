const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  price: Number,
  stars: Number,
  service_fee: Number,
  cleaning_fee: Number,
});

const reservationSchema = new mongoose.Schema({
  _id: Number,
  room_id: Number,
  start_date: Date,
  end_date: Date,
  adults: Number,
  children: Number,
  infants: Number,
});

const Room = mongoose.model('Room', roomSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports.Room = Room;
module.exports.Reservation = Reservation;
