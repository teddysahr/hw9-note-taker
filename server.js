// DEPENDENCIES
const express = require("express");
const path = require("path");
const data = require("./db/db.json");

// SET UP APP & PORT
const app = express();
const PORT = 3001;

// MIDDLEWARES
app.use(express.static("public"));

// ROUTES
app.get("/helloworld", (req, res) => res.send("HELLO WORLD"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(data));

// START THE SERVER
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
