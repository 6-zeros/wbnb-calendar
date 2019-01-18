import axios from 'axios';
import {
  setPrice, setStars, setCleaningFee, setBookedDates, setServiceFee,
} from './bookingActions';

const getData = roomID => (
  (dispatch) => {
    axios.get(`/api/rooms/${roomID}`)
      .then(({ data }) => {
        const price = data[0].price;
        const stars = data[0].stars;
        const cleaningFee = data[0].cleaning_fee;
        const serviceFee = data[0].service_fee;
        const bookedDates = data.map(obj => {
          const guests = {
            adults: obj.adults,
            children: obj.children,
            infants: obj.infants
          };

          return {
            startDate: obj.start_date,
            endDate: obj.end_date,
            guests: guests
          };
        });

        dispatch(setPrice(price));
        dispatch(setStars(stars));
        dispatch(setCleaningFee(cleaningFee));
        dispatch(setBookedDates(bookedDates));
        dispatch(setServiceFee(serviceFee));
        // dispatch(setPrice(data.price));
      });
  }
);

const reserveDate = (roomID, payload) => (
  (dispatch) => {
    axios.patch(`/api/rooms/${roomID}`, payload)
      .then(() => {
        /* eslint-disable-next-line */
        window.alert('Booked');
        dispatch(getData(roomID));
      });
  }
);

export { getData, reserveDate };
