const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");



exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT email FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(400).send("Email already exists");
    }
    if (email.length <3) {
      return res.status(403).send("Email is invalid");
    }
    if (username.length <3) {
      return res.status(403).send("Username is invalid");
    }
    if (password.length <3) {
      return res.status(403).send("Password is invalid");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    await db.query(insertQuery, [username, email, hashedPassword]);

    return res.status(201).json({ email, username });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }
    if (username.length <3) {
      return res.status(401).send("Username is invalid");
    }
    if (password.length <3) {
      return res.status(403).send("Password is invalid");
    }
    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Internal Error" });
  }
};
