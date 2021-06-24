import db from '../models';
class RegisterStudents {
  constructor(validatedArgs) {
    Object.assign(this, validatedArgs);
  }

  async call() {
    /* TODO: Implementation */
    const { Student, Tutor, Op } = db;
    return db.sequelize.transaction(async (transaction) => {

      const regStudents = async () => {
        const existingStudents = await Student.findAll({
          where: {
            email: this.students,
          },
        });
        const existingEmails = existingStudents
          .map(s => s.email)
          .reduce((mem, curr) => {
            return Object.assign(mem, { [curr]: true });
          }, {});
        const newEmails = this.students.filter(e => !existingEmails[e]);
        const newStudents = await Promise.all(newEmails.map(async (email) => {
          return Student.create({ email });
        }));
        return existingStudents.concat(newStudents);
      }

      const regTutor = async () => {
        const tutor = await Tutor.findOne({ where: { email: this.tutor }, transaction });

        if (tutor) return tutor;

        return Tutor.create({ email: this.tutor });
      }

      const associate = async (tutor, students) => {
        return tutor.addSubscriptions(students.map(s => s.id));
      }
      
      const tutor = await regTutor();
      const students = await regStudents();
      await associate(tutor, students)
      // const t = await Tutor.findAll({
      //   where: {
      //     email: tutor.email,
      //   },
      //   include: {
      //     model: db.Student,
      //     as: 'subscriptions',
      //     required: true,
      //   },
      // })
      return { success: true }
    }).catch(e => console.log(e));
  }
}

module.exports = RegisterStudents;
