const socket = new WebSocket(
  "ws://localhost:8000/ws?iracingId=229529&year=2023&season=1&categoryId=2"
);

// console.log({ socket });

socket.addEventListener("message", (event) => {
  console.log("ws message", event.data);
});
