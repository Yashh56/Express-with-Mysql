const express = require("express");
const db = require("../config/db");


exports.profile = (req, res) => {
  const { username} = req.user;

  return res.status(200).send({username})
};
