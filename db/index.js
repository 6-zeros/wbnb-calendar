// DATABASE CONNECTION
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'georgeqian',
  database: 'sdc'
});

pool.connect((err) => {
  if (err) { throw err; }
});

const addReservation = (room_id, resInfo, cb) => {
  const { start_date, end_date, adults, children, infants } = resInfo;
  const queryString = `INSERT INTO reservations (room_id, start_date, end_date, adults, children, infants)
                       VALUES (${room_id}, ${start_date}, ${end_date}, ${adults}, ${children}, ${infants})`;

  pool.query(queryString, (err) => {
    if (err) { throw err; }
    cb();
  });
};

const getReservationInfo = (id, cb) => {
  const queryString = `SELECT * FROM rooms JOIN reservations ON 
                       rooms.id = reservations.room_id AND
                       rooms.id = ${id}`;

  pool.query(queryString, (err, result) => {
    if (err) { throw err; }
    cb(result.rows);
  });
};

const updateReservation = (id, newResInfo, cb) => {
  // update record with id id
  // cb()
};

const deleteReservation = (id, cb) => {
  const queryString = `DELETE FROM reservations WHERE id = ${id}`;

  pool.query(queryString, (err) => {
    if (err) { throw err; }
    cb();
  });
};

module.exports = {
  addReservation, getReservationInfo,
  updateReservation, deleteReservation
};
