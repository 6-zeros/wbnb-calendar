// const mongoose = require('mongoose');
// const { Room, Reservation } = require('./models.js');

// mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true}, () => {
//   console.log('-- connected to db sdc');
// });

// mongoimport -d sdc -c rooms --type csv --file dummyData.csv --headerline

// "for i in db/roomData/*.csv; do { mongoimport --db sdc --collection rooms --type csv --file $i --headerline & }; done"