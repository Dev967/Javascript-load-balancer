const mysql = require('mysql');

const con = mysql.createConnection({
  host: "0.0.0.0",
  user: "user",
  password: "password",
  port: 80,
  database: "db-1"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("CONNECTED TO DATABASE")
});

exports.connection = con;