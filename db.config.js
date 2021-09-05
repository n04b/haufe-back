module.exports = {
  host: "mysqldb",
  user: "root",
  password: "12345",
  db: "haufe",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
