const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsToMany(models.Student, { through: "Tutors_Students" });
      this.belongsToMany(models.Tutor, { as: 'subscriptions', through: "Subscription", });
      this.belongsToMany(models.Tutor, { as: 'suspensions', through: "Suspension" });
    }
  }
  Student.init(
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
      modelName: "Student",
    }
  );
  return Student;
};
