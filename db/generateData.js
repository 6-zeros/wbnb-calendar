const fs = require('fs');

const entryCount = 30000000;

const progressLog = (index, fileName) => {
  if (index === 1) {
    console.log(`WRITING TO ${fileName}`);
  }
  if (index === Math.floor(1 * entryCount / 10)) {
    console.log('-- 10% complete');
  }
  if (index === Math.floor(2 * entryCount / 10)) {
    console.log('---- 20% complete');
  }
  if (index === Math.floor(3 * entryCount / 10)) {
    console.log('------ 30% complete');
  }
  if (index === Math.floor(4 * entryCount / 10)) {
    console.log('-------- 40% complete');
  }
  if (index === Math.floor(5 * entryCount / 10)) {
    console.log('---------- 50% complete');
  }
  if (index === Math.floor(6 * entryCount / 10)) {
    console.log('------------ 60% complete');
  }
  if (index === Math.floor(7 * entryCount / 10)) {
    console.log('-------------- 70% complete');
  }
  if (index === Math.floor(8 * entryCount / 10)) {
    console.log('---------------- 80% complete');
  }
  if (index === Math.floor(9 * entryCount / 10)) {
    console.log('------------------ 90% complete');
  }
  if (index === entryCount) {
    console.log(`-------------------- SUCCESSFULLY WRITTEN TO ${fileName}`);
  }
};

const generateRandomNumber = (min, max, type) => {
  if (type !== 'int' && type !== 'double') {
    return new Error('Unexpected argument type. Acceptable inputs are \'int\' or \'double\'');
  }
  let result = Math.random() * (max - min + 1) + min;
  if (type === 'int') { result = Math.floor(result); }
  return result;
};

const generateRandomStartDate = (index) => {
  const year = 2019;
  const month = (index % 12);
  const day = generateRandomNumber(10, 15, 'int');
  return new Date(year, month, day);
};

const generateRandomEndDate = (index) => {
  const year = 2019;
  const month = (index % 12);
  const day = generateRandomNumber(16, 21, 'int');
  return new Date(year, month, day);
};

const generateAndWriteRoomData = () => {
  const stream = fs.createWriteStream('roomData.csv');
  const headers = 'id,name,price,stars,service_fee,cleaning_fee\n';
  stream.write(headers);

  let i = 1;

  const write = () => {
    let proceed = true;
    while (i <= entryCount && proceed) {
      progressLog(i, 'roomData.csv');

      let entry = '';
      entry += `${i},`;
      entry += `Room ${i},`;
      entry += `${generateRandomNumber(50, 150, 'int')},`;
      entry += `${generateRandomNumber(1, 5, 'double')},`;
      entry += `${generateRandomNumber(10, 25, 'int')},`;
      entry += `${generateRandomNumber(50, 75, 'int')}\n`;

      proceed = stream.write(entry);
      i += 1;
    }

    if (!proceed) {
      stream.once('drain', () => {
        write();
      });
    }
  };

  write();
};

const generateAndWriteReservationData = () => {
  const stream = fs.createWriteStream('reservationData.csv');
  const headers = 'id,room_id,start_date,end_date,adults,children,infants\n';
  stream.write(headers);

  let i = 1;

  const write = () => {
    let proceed = true;
    while (i <= entryCount && proceed) {
      progressLog(i, 'reservationData.csv');

      let entry = '';
      entry += `${i},`;
      entry += `${generateRandomNumber(1, 10000000, 'int')},`;
      entry += `${generateRandomStartDate(i)},`;
      entry += `${generateRandomEndDate(i)},`;
      entry += `${generateRandomNumber(1, 3, 'int')},`;
      entry += `${generateRandomNumber(1, 3, 'int')},`;
      entry += `${generateRandomNumber(1, 2, 'int')}\n`;

      proceed = stream.write(entry);
      i += 1;
    }

    if (!proceed) {
      stream.once('drain', () => {
        write();
      });
    }
  };

  write();
};

// generateAndWriteRoomData();
generateAndWriteReservationData();
