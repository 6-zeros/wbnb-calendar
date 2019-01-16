# CRUD API

## CREATE
- Route: app.post('/api/rooms/:id')
- Reservation info will come through the body of the request
- Room id will be contained in the url
- Calls the addReservation function which will insert the reservation info (associated with the provided room_id) into the reservations table

## READ
- Route: app.get('/api/rooms/:id')
- Room id will be contained in the url
- Calls the getReservationInfo function which will query the database for room and reservation information relevant to the provided room_id

## UPDATE
- Route: app.put('/api/reservations/:id')
- New reservation info will come through the body of the request
- Reservation id will be contained in the url
- Calls the updateReservation function which will update the reservation information relevant to the provided reservation_id

## DELETE
- Route: app.delete('/api/reservations/:id')
- Reservation id will be contained in the url
- Calls the deleteReservation function which will delete the record with the provided reservation_id