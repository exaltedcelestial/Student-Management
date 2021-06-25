import db from '../models';
class FetchCommonStudents {
  constructor(validatedArgs) {
    Object.assign(this, validatedArgs);
  }

  get tutorArr() {
    if (Array.isArray(this.tutor)) return this.tutor;
    return [this.tutor];
  }

  async call() {
    const { Tutor, Student } = db;
    const tutors = await Tutor.findAll({
      where: {
        email: this.tutorArr,
      },
      include: {
        model: Student,
        as: 'subscriptions',
        required: true,
      },
    })
    const students = tutors.reduce((mem, curr) => {
      const { subscriptions } = curr;
      return mem.concat(subscriptions.map(s => s.email))
    }, []);
    return students;
  }
}

module.exports = FetchCommonStudents;
