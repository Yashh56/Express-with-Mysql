const express = require("express");
const db = require("../config/db");


exports.profile = (req, res) => {
  const { username, email,password } = req.user;

  return res.status(200).send({username,email,password})
};
