import http from "k6/http";

export let options = {
  vus: 100,
  duration: "5m",
  rps: 50
};

export default function() {
  const randomRoomId = Math.floor(Math.random() * 10000000) + 1;
  const url = `http://localhost:8080/api/rooms/${randomRoomId}`;
  http.get(url);
};




