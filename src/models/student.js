const { Model } = require("sequelize");

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
      this.belongsToMany(models.Tutor, { as: 'subscriptions', through: "Subscriptions", });
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
      suspensionDate: {
        type: DataTypes.DATE,
        defaultValue: null,
      }
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
