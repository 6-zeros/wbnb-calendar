const fs = require('fs');

const entryCount = 30000000;
const startNewFileCount = 1000000;

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
  const headers = 'id,name,price,stars,service_fee,cleaning_fee\n';

  let i = 1;
  let fileNum = 1;
  let zeroPaddedFileNum, fileName, stream;

  const write = () => {
    let proceed = true;
    while (i <= entryCount && proceed) {
      if (i % startNewFileCount === 1) {
        zeroPaddedFileNum = fileNum < 10 ? '0' + String(fileNum) : String(fileNum);
        fileName = `roomData/roomData_${zeroPaddedFileNum}.csv`;
        stream = fs.createWriteStream(fileName);
        stream.write(headers);
        fileNum += 1;
        console.log(`-- writing to ${fileName} --`);
      }

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
  const headers = 'id,room_id,start_date,end_date,adults,children,infants\n';

  let i = 1;
  let fileNum = 1;
  let zeroPaddedFileNum, fileName, stream;

  const write = () => {
    let proceed = true;
    while (i <= entryCount && proceed) {
      if (i % startNewFileCount === 1) {
        zeroPaddedFileNum = fileNum < 10 ? '0' + String(fileNum) : String(fileNum);
        fileName = `reservationData/reservationData_${zeroPaddedFileNum}.csv`;
        stream = fs.createWriteStream(fileName);
        stream.write(headers);
        fileNum += 1;
        console.log(`-- writing to ${fileName} --`);
      }

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
// generateAndWriteReservationData();
