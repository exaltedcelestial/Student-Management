const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsToMany(models.Student, { through: "Tutors_Students" });
      this.belongsToMany(models.Student, { as: 'subscriptions', through: "Subscriptions", });
    }

    constructor(doc) {
      super(doc);
      Object.assign(this, doc);
    }
  }
  Tutor.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tutor",
    }
  );
  return Tutor;
};
