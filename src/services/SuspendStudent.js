import db from '../models';

class SuspendStudent {
  constructor(validatedArgs) {
    Object.assign(this, validatedArgs);
  }

  async call() {
    const { Student } = db;

    const student = await Student.findOne({
      where: {
        email: this.student,
      },
    });

    if (!student) throw new Error('Student does not exist');
    if (!student.suspensionDate) {
      student.suspensionDate = new Date();
      await student.save();
    }
    return student;
  }
}

module.exports = SuspendStudent;
