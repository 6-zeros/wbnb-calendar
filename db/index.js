// DATABASE CONNECTION

const addReservation = (id, resInfo, cb) => {
  // insert into db
  // cb()
};

const readReservation = (id, cb) => {
  // find record based on id
  // cb(resulting record)

  // MONGO VERSION
  // Reservations.findOne({ _id: id })
  //   .then((result) => {
  //     cb(result);
  //   });
};

const updateReservation = (id, newResInfo, cb) => {
  // update record with id id
  // cb()
};

const deleteReservation = (id, resInfo, cb) => {
  // delete record based on id
  // cb()
};

module.exports.addReservation = addReservation;
module.exports.readReservation = readReservation;
module.exports.updateReservation = updateReservation;
module.exports.deleteReservation = deleteReservation;
