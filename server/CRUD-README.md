# CRUD API

> Implementation and functionality will be finalized after final database is chosen
  
## CREATE
Route: app.post('/api/rooms/:id')
Reservation info will come through the body of the request
Room id will be contained in the url
Calls the addReservation function which will handle database insertion

## READ
Route: app.get('/api/rooms/:id')
Room id will be contained in the url
Calls the readReservation function which will query the database on roomId

## UPDATE
Route: app.put('/api/rooms/:id')
New reservation info will come through the body of the request
Room id will be contained in the url
Calls the updateReservation function which will query the database for the roomId and update it

## DELETE
Route: app.delete('/api/rooms/:id')
Reservation info will come through the body of the request
Room id will be contained in the url
Calls the deleteReservation function which will query the database on roomId and delete the necessary recrods