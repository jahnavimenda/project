//server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");

const app = express();
const port = 3000;

// Parse URL-encoded bodies (from forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (e.g., index.html)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/forms.html"));
});

// Handle form submission
app.post("/submit", (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    gender,
    dob,
    address,
    city,
    state,
    pincode,
    country,
    hobbies,
    otherHobby,
    qualifications,
    coursesApplied,
  } = req.body;
  let hobbiesArr = [];
  if (Array.isArray(hobbies)) {
    hobbiesArr = hobbies;
  } else if (hobbies) {
    hobbiesArr = [hobbies];
  }
  if (otherHobby && otherHobby.trim() !== "") {
    hobbiesArr.push(otherHobby.trim());
  }

  const hobbiesStr =  hobbiesArr.join(",");
  const qualificationsStr = Array.isArray(qualifications)
    ? qualifications.join(",")
    : qualifications;

  const sql = `INSERT INTO student 
  (firstname, lastname, email, phone, gender, dob, address, city, state, pincode, country, hobbies, qualifications, coursesApplied) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      firstname,
      lastname,
      email,
      phone,
      gender,
      dob,
      address,
      city,
      state,
      pincode,
      country,
      hobbiesStr,
      qualificationsStr,
      coursesApplied,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting into database:", err);
        return res.status(500).send("Database error");
      }
      res.send("User added successfully!");
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
