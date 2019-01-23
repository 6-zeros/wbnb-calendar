const { Pool } = require('pg');
const config = require('./psqlConfig.js');

// const pool = new Pool({
//   host: 'localhost',
//   user: 'georgeqian',
//   database: 'sdc'
// });

const pool = new Pool(config);

pool.connect((err) => {
  if (err) { throw err; }
});

const addReservation = (room_id, resInfo, cb) => {
  const { start_date, end_date, adults, children, infants } = resInfo;
  const queryString = `INSERT INTO reservations (room_id, start_date, end_date, adults, children, infants)
                       VALUES (${room_id}, ${start_date}, ${end_date}, ${adults}, ${children}, ${infants});`;

  pool.query(queryString, (err) => {
    if (err) { throw err; }
    cb();
  });
};

const getReservationInfo = (id, cb) => {
  const queryString = `SELECT * FROM rooms JOIN reservations ON 
                       rooms.id = reservations.room_id AND
                       rooms.id = ${id};`;

  pool.query(queryString, (err, result) => {
    if (err) { 
      cb(err); 
    } else if (result.rows.length !== 0) {
      cb(null, result.rows);
    } else {
      // no reservations for provided room id
      // fetch room information only
      const roomInfoQueryString = `SELECT * FROM rooms WHERE id = ${id};`;
      pool.query(roomInfoQueryString, (err1, result1) => {
        if (err1) { 
          cb(err1);
        } else {
          cb(null, result1.rows);
        }
      })
    }
  });
};

const updateReservation = (res_id, newResInfo, cb) => {
  const { start_date, end_date, adults, children, infants } = newResInfo;
  const queryString = `UPDATE reservations SET start_date=${start_date}, end_date=${end_date},
                       adults=${adults}, children=${children}, infants=${infants} WHERE id=${res_id};`;
  
  pool.query(queryString, (err) => {
    if (err) { throw err; }
    cb();
  });
};

const deleteReservation = (id, cb) => {
  const queryString = `DELETE FROM reservations WHERE id = ${id};`;

  pool.query(queryString, (err) => {
    if (err) { throw err; }
    cb();
  });
};

module.exports = {
  addReservation, getReservationInfo,
  updateReservation, deleteReservation
};
