module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    user: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Users;
};
