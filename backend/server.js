const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Read users from users.json
function getUsers() {
  const data = fs.readFileSync("./users.json");
  return JSON.parse(data);
}

// Save users to users.json
function saveUsers(users) {
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
}

// SIGNUP API
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  let users = getUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({
      success: false,
      message: "Email already registered",
    });
  }

  users.push({ name, email, password });
  saveUsers(users);

  return res.json({
    success: true,
    message: "Signup successful",
  });
});

// LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  let users = getUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  // ⭐ RETURN THE USER HERE (You are missing this)
  return res.json({
    success: true,
    message: "Login successful",
    user: {
      name: user.name,
      email: user.email
    }
  });
});


app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
