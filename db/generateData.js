const fs = require('fs');

const entryCount = 10000000;

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
  const month = (index % 12) + 1;
  const day = generateRandomNumber(10, 15, 'int');
  return new Date(year, month, day);
};

const generateRandomEndDate = (index) => {
  const year = 2019;
  const month = (index % 12) + 1;
  const day = generateRandomNumber(16, 21, 'int');
  return new Date(year, month, day);
};

const generateAndWriteRoomData = () => {
  const stream = fs.createWriteStream('roomData.txt');
  let i = 1;

  const write = () => {
    let proceed = true;
    while (i <= entryCount && proceed) {
      progressLog(i, 'roomData.txt');
      const entry = {
        id: i,
        name: `Room ${i}`,
        price: generateRandomNumber(50, 150, 'int'),
        stars: generateRandomNumber(1, 5, 'double'),
        service_fee: generateRandomNumber(10, 25, 'int'),
        cleaning_fee: generateRandomNumber(50, 75, 'int'),
      };
      const entryAndNewLine = `${JSON.stringify(entry)}\n`;
      proceed = stream.write(entryAndNewLine);
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
  const stream = fs.createWriteStream('reservationData.txt');
  let i = 1;

  const write = () => {
    let proceed = true;
    while (i <= entryCount && proceed) {
      progressLog(i, 'reservationData.txt');
      const entry = {
        id: i,
        room_id: generateRandomNumber(1, entryCount, 'int'),
        start_date: generateRandomStartDate(i),
        end_date: generateRandomEndDate(i),
        adults: generateRandomNumber(1, 3, 'int'),
        children: generateRandomNumber(1, 3, 'int'),
        infants: generateRandomNumber(1, 2, 'int'),
      };
      const entryAndNewLine = `${JSON.stringify(entry)}\n`;
      proceed = stream.write(entryAndNewLine);
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
// generateAndWriteReservationData();
