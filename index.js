const express = require("express");

const app = express();

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("./dist/index.html");
});

app.get("/simulate-crash", (req, res) => {
  res.send("Simulating Server Crash!");
  console.log(`Oops Error. something went wrong! Crashing...`);
  process.exit(1);
});

app.get("/version", (req, res) => {
  res.send("App running version 1.0");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Application running on 0.0.0.0:${PORT}`));
