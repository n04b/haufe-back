module.exports = (sequelize, Sequelize) => {
  const Favorites = sequelize.define("favorites", {
    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    character: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    selected: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Favorites;
};
