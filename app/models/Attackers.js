module.exports = (sequelize, Sequelize) => {
  const Attackers = sequelize.define(
    "Attackers",
    {
      id: { primaryKey: true, type: Sequelize.UUID },
      sourceCountry: { type: Sequelize.STRING(50) },
      destinationCountry: { type: Sequelize.STRING(50) },
      millisecond: { type: Sequelize.INTEGER },
      type: { type: Sequelize.STRING(50) },
      weight: { type: Sequelize.INTEGER },
    },
    { timestamps: false, freezeTableName: true }
  );
  return Attackers;
};
