// const domain = process.env.DOMAIN || '172.17.0.2';
// const domain = 'localhost';
// const mongoose = require('mongoose');
// const Reservations = require('../db/models/reservations.js');

// mongoose.connect(`mongodb://${domain}/errbnb`, { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to Database on: ', domain);
//   });

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const {
  addReservation, getReservationInfo,
  updateReservation, deleteReservation,
} = require('../db/index.js');

const app = express();
const PORT = 8080;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(express.static('client/dist'));

// ------------------------- CRUD OPERATIONS ------------------------- //

// CREATE
app.post('/api/rooms/:id', (req, res) => {
  const { id } = req.params;
  const { start_date, end_date, adults, children, infants } = req.body;
  const reservationInfo = { start_date, end_date, adults, children, infants };
  addReservation(id, reservationInfo, () => {
    res.send(`success creating reservation for room id ${id}`);
  });
});

// READ
app.get('/api/rooms/:id', (req, res) => {
  const { id } = req.params;
  getReservationInfo(id, (result) => {
    res.send(result);
  });
});

// UPDATE
app.put('/api/reservations/:id', (req, res) => {
  const { newReservationInfo } = req.body;
  const { id } = req.params;
  updateReservation(id, newReservationInfo, () => {
    res.send(`success updating reservation for room id ${id}`);
  });
});

// DELETE
app.delete('/api/reservations/:id', (req, res) => {
  const { id } = req.params;
  deleteReservation(id, () => {
    res.send(`success deleting reservation associated with room id ${id}`);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// app.patch('/api/rooms/:id', (req, res) => {
//   const { id } = req.params;
//   const payload = req.body;
//   Reservations.findByIdAndUpdate({ _id: Number(id) })
//     .then((results) => {
//       const transformedDates = [];
//       results.bookedDates.forEach((date) => {
//         transformedDates.push(date.startDate.valueOf());
//         transformedDates.push(date.endDate.valueOf());
//       });
//       const includesStartDate = transformedDates.includes(new Date(payload.startDate).valueOf());
//       const includesEndDate = transformedDates.includes(new Date(payload.endDate).valueOf());
//       if (includesStartDate && includesEndDate) {
//         res.end('Duplicate Entry');
//       } else {
//         results.bookedDates.push(payload);
//         results.save(() => {
//           res.end('Saved to DB');
//         });
//       }
//     });
// });
