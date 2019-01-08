// const domain = process.env.DOMAIN || '172.17.0.2';
const domain = 'localhost';
const mongoose = require('mongoose');
const Reservation = require('../models/reservations.js');

const generateRandomNumber = (min, max, type = 'int') => {
  if (type === 'int') {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  if (type === 'double') {
    return Math.random() * (max - min + 1) + min;
  }
  return new Error('Unexpected argument type. Acceptable inputs are \'int\' or \'double\'');
};

const generateRandomBoolean = () => !!Math.floor(Math.random() * 2);


const generateThreeRandomDatesPerYear = (year) => {
  const dates = [];

  // iterate for all 12 months
  for (let i = 0; i < 12; i += 1) {
    const randomStartDate1 = generateRandomNumber(1, 5, 'int');
    const randomEndDate1 = generateRandomNumber(6, 11, 'int');
    const randomStartDate2 = generateRandomNumber(12, 15, 'int');
    const randomEndDate2 = generateRandomNumber(16, 20, 'int');
    const randomStartDate3 = generateRandomNumber(21, 24, 'int');
    const randomEndDate3 = generateRandomNumber(25, 28, 'int');

    const date1 = {
      startDate: new Date(year, i, randomStartDate1),
      endDate: new Date(year, i, randomEndDate1),
    };
    dates.push(date1);

    const date2 = {
      startDate: new Date(year, i, randomStartDate2),
      endDate: new Date(year, i, randomEndDate2),
    };
    dates.push(date2);
    const date3 = {
      startDate: new Date(year, i, randomStartDate3),
      endDate: new Date(year, i, randomEndDate3),
    };
    dates.push(date3);
  }
  return dates;
};

const generateData = (numberOfEntries) => {
  const fakeData = [];

  for (let i = 0; i < numberOfEntries; i += 1) {
    const entry = {
      _id: i,
      price: generateRandomNumber(50, 150, 'int'),
      stars: generateRandomNumber(1, 5, 'double'),
      weeklyViewCount: generateRandomNumber(100, 1000, 'int'),
      serviceFee: generateRandomNumber(10, 25, 'int'),
      weeklyDiscountPercent: generateRandomNumber(5, 10, 'int'),
      isRareFind: generateRandomBoolean(),
      cleaningFee: generateRandomNumber(50, 75, 'int'),
      bookedDates: generateThreeRandomDatesPerYear(2019),
    };
    fakeData.push(entry);
  }
  return fakeData;
};

const seedDB = (data) => {
  // Remove everything in the DB first.
  Reservation.deleteMany({}, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Database Cleared');
      // Add everything!
      Reservation.insertMany(data)
        .then(() => process.exit());
    }
  });
};
mongoose.connect(`mongodb://${domain}/errbnb`, { useNewUrlParser: true });
const data = generateData(100);
seedDB(data);

module.exports.data = data;
