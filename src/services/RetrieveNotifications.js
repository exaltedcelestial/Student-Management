import db from '../models';
import { Joi } from 'express-validation';

class RetrieveNotifications {
  constructor(validatedArgs) {
    Object.assign(this, validatedArgs);
  }

  get mentionedEmails() {
    const emailSchema = Joi.object({
      email: Joi.string().email().required(),
    });

    return this.notification
      .split(/\s+/)
      .filter((word) => {
        if (word.startsWith('@')) {
          const { error } = emailSchema.validate({
            email: word.substring(1)
          })

          return !error;
        }
        return false;
      })
      .map(n => n.substring(1))
  }

  async call() {
    const { Tutor, Student } = db;
    const tutor = await Tutor.findOne({
      where: {
        email: this.tutor,
      },
      include: [
        {
          model: Student,
          as: 'subscriptions',
          required: false, // so that tutor won't be null if there's no subs
          where: {
            suspensionDate: null,
          },
        }
      ],
    });

    const { subscriptions: students } = tutor;
    if (!tutor) throw new Error('Tutor not registered.');

    const mentionedStudents = await Student.findAll({
      where: {
        email: this.mentionedEmails,
        suspensionDate: null,
      }
    })

    const emails = students.concat(mentionedStudents)
      .map(s => s.email)
      .filter(e => e); // needs filtering since subscriptions could return object with null fields

    return Array.from(new Set(emails));
  }
}

module.exports = RetrieveNotifications;
