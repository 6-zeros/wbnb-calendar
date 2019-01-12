const { Client } = require('pg');
const path = require('path');

const client = new Client({
  host: 'localhost',
  database: 'sdc'
});

const createRoomsTable = `
  CREATE TABLE rooms (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    price INT NOT NULL,
    stars REAL NOT NULL,
    service_fee INT NOT NULL,
    cleaning_fee INT NOT NULL
  );
`;

const importRoomsData = (fileNum) => {
  if (fileNum === 11) {
    console.log('------ rooms data successfully imported');
    client.end();
    return;
  }
  const zeroPaddedFileNum = fileNum < 10 ? `0${String(fileNum)}` : String(fileNum);
  const shortFileName = `roomData_${zeroPaddedFileNum}.csv`;
  const fullFileName = `${path.join(__dirname, `../roomData/${shortFileName}`)}`;
  const copyString = `COPY rooms FROM '${fullFileName}' DELIMITER ',' CSV HEADER`;
  client.query(copyString, (err) => {
    if (err) throw err;
    console.log(`-------- succesfully imported data from ${shortFileName}`);
    importRoomsData(fileNum + 1);
  });
};

client.connect()
  .then(() => console.log('-- connected to database sdc'))
  .then(() => client.query('DROP TABLE IF EXISTS reservations'))
  .then(() => client.query('DROP TABLE IF EXISTS rooms'))
  .then(() => client.query(createRoomsTable))
  .then(() => console.log('---- created rooms table'))
  .then(() => console.log('------ beginning to import rooms data'))
  .then(() => importRoomsData(1));
