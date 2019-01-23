const newRelic = require('newrelic');
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
    res.send(`-- success creating reservation for room id ${id}`);
  });
});

// READ
app.get('/api/rooms/:id', (req, res) => {
  const { id } = req.params;
  getReservationInfo(id, (err, result) => {
    if (err) {
      res.status(500).send('error');
    } else {
      res.send(result);
    }
  });
});

// UPDATE
app.put('/api/reservations/:id', (req, res) => {
  const { id } = req.params;
  const { start_date, end_date, adults, children, infants } = req.body;
  const newReservationInfo = { start_date, end_date, adults, children, infants };
  updateReservation(id, newReservationInfo, () => {
    res.send(`-- success updating reservation id ${id}`);
  });
});

// DELETE
app.delete('/api/reservations/:id', (req, res) => {
  const { id } = req.params;
  deleteReservation(id, () => {
    res.send(`-- success deleting reservation id ${id}`);
  });
});

// ------------------------- MAIN ------------------------- //

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
