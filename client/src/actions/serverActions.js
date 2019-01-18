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
      });
  }
);

const reserveDate = (roomID, payload) => (
  (dispatch) => {
    const processedPayload = {
      start_date: `'${payload.startDate}'`,
      end_date: `'${payload.endDate}'`,
      adults: payload.guests.adults,
      children: payload.guests.children,
      infants: payload.guests.infants
    }

    axios.post(`/api/rooms/${roomID}`, processedPayload)
      .then(() => {
        window.alert('Booked');
        dispatch(getData(roomID));
      });
  }
);

export { getData, reserveDate };
