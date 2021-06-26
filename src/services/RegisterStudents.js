import db from '../models';

const { Student, Tutor } = db;

class RegisterStudents {
  constructor(validatedArgs) {
    Object.assign(this, validatedArgs);
  }

  async findOrCreateTutor(transaction) {
    const options = {
      where: {
        email: this.tutor
      },
      defaults: {
        email: this.tutor
      }
    };

    if (transaction) Object.assign(options, transaction)

    const [tutor] = await Tutor.findOrCreate(options);

    return tutor;
  }

  async findOrCreateStudents(transaction) {
    const options = {
      ignoreDuplicates: true,
    }
    
    if (transaction) Object.assign(options, transaction);

    const studentsInfo = this.students.map((email) => ({ email }));
    const students = await Student.bulkCreate(studentsInfo, options)

    return Student.findAll({
      where: {
        email: students.map(s => s.email),
      },
    });
  }

  async call() {
    /* TODO: Implementation */
    return db.sequelize.transaction(async (transaction) => {

      const associate = async (tutor, students) => {
        return tutor.addSubscriptions(students.map(s => s.id));
      }
      
      const tutor = await this.findOrCreateTutor(transaction);
      const students = await this.findOrCreateStudents(transaction);
      await associate(tutor, students)
      return { success: true }
    }).catch(e => console.log(e));
  }
}

module.exports = RegisterStudents;
