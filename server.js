// DEPENDENCIES
const express = require("express");
const path = require("path");
const data = require("./db/db.json");
const uuid = require("./helpers/uuid");
const fs = require("fs");

// SET UP APP & PORT
const app = express();
const PORT = 3001;

// MIDDLEWARES
app.use(express.static("public"));

// GET ROUTES
app.get("/helloworld", (req, res) => res.send("HELLO WORLD"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(data));

app.get("/api/notes/:id", (req, res) => {
  const requestedNote = req.params.id.toLowerCase();

  for (let i = 0; i < data.length; i++) {
    if (requestedNote === data[i].id.toLowerCase()) {
      return res.json(data[i]);
    }
  }

  // Return a message if the term doesn't exist in our DB
  return res.json("No note found");
});

// POST ROUTES
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      review_id: uuid(),
    };

    // Convert the data to a string so we can save it
    //const reviewString = JSON.stringify(newReview);

    const noteArray = JSON.parse(fs.readFileSync(`./db/db.json`));

    console.log(noteArray);

    noteArray.push(newNote);

    // Write the string to a file
    fs.writeFile(`./db/db.json`, JSON.stringify(noteArray), (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newNote.title} has been written to JSON file`
          )
    );

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }
});

// DELETE ROUTES
app.delete("/api/notes/:id", (req, res) => {
  const deleteNote = req.params.id.toLowerCase();

  for (let i = 0; i < data.length; i++) {
    if (deleteNote === data[i].id.toLowerCase()) {
      return res.json(data[i]);
    }
  }

  // Return a message if the term doesn't exist in our DB
  return res.json("No note found");
});

// START THE SERVER
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
