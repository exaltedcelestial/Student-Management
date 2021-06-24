import db from '../models';
class FetchCommonStudents {
  constructor(validatedArgs) {
    Object.assign(this, validatedArgs);
  }

  async call() {
    const { Student, Tutor, Op } = db;
    return Student.findAll()
  }
}

module.exports = FetchCommonStudents;
