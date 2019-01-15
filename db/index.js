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

const addReservation = (id, resInfo, cb) => {
  // insert into db
  // cb()
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

const deleteReservation = (id, resInfo, cb) => {
  // delete record based on id
  // cb()
};

module.exports = {
  addReservation, getReservationInfo,
  updateReservation, deleteReservation
};
