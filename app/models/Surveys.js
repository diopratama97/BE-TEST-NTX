module.exports = (sequelize, Sequelize) => {
  const Surveys = sequelize.define(
    "Surveys",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      values: { type: Sequelize.STRING },
      userId: { type: Sequelize.INTEGER },
    },
    { freezeTableName: true }
  );
  return Surveys;
};
