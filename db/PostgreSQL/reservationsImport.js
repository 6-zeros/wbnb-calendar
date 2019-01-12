const { Client } = require('pg');
const path = require('path');

const client = new Client({
  host: 'localhost',
  database: 'sdc'
});

const createReservationsTable = `
  CREATE TABLE reservations (
    id INT PRIMARY KEY NOT NULL,
    room_id INT NOT NULL,
    start_date VARCHAR(70) NOT NULL,
    end_date VARCHAR(70) NOT NULL,
    adults INT NOT NULL,
    children INT NOT NULL,
    infants INT NOT NULL
  );
`;

const importReservationsData = (fileNum) => {
  if (fileNum === 31) {
    console.log('------ reservations data successfully imported');
    client.end();
    return;
  }
  const zeroPaddedFileNum = fileNum < 10 ? `0${String(fileNum)}` : String(fileNum);
  const shortFileName = `reservationData_${zeroPaddedFileNum}.csv`;
  const fullFileName = `${path.join(__dirname, `../reservationData/${shortFileName}`)}`;
  const copyString = `COPY reservations FROM '${fullFileName}' DELIMITER ',' CSV HEADER`;
  client.query(copyString, (err) => {
    if (err) throw err;
    console.log(`-------- succesfully imported data from ${shortFileName}`);
    importReservationsData(fileNum + 1);
  });
};

client.connect()
  .then(() => console.log('-- connected to database sdc'))
  .then(() => client.query('DROP TABLE IF EXISTS reservations'))
  .then(() => client.query(createReservationsTable))
  .then(() => console.log('---- created reservations table'))
  .then(() => console.log('------ beginning to import reservations data'))
  .then(() => importReservationsData(1));
