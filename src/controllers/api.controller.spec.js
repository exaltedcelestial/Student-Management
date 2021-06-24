require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const request = require("supertest");
const app = require("../testEntry");
const db = require("../models");
const seed = require("../seeders/seed");
const faker = require("faker");

const { truncate } = require("../testHelper");

const { fake } = require("faker");

const reset = async () => {
  await db.sequelize.drop()
  await db.sequelize.sync()
  await seed();
}
describe("Api Controller", () => {
  describe("Register API", () => {
    describe("Invalid body", () => {
      it("should fail without tutor ", async (done) => {
        const { statusCode, body } = await request(app).post("/api/register").send();
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail without students ", async (done) => {
        const { statusCode, body } = await request(app).post("/api/register").send({
          tutor: 't1@gmail.com',
          students: [],
        });
        const { message, details } = body;
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ students: '"students" must contain at least 1 items' }])
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail if tutor is not an email", async (done) => {
        const { statusCode, body } = await request(app).post("/api/register").send({
          tutor: '@gmail.com',
        });
        const { message, details } = body;
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" must be a valid email' }])
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail if students are not in email format", async (done) => {
        const { statusCode, body } = await request(app).post("/api/register").send({
          tutor: 't1@gmail.com',
          students: ['@gmail.com', '@gmail.com']
        });
        const { message, details } = body;
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ 0: '"students[0]" must be a valid email' }])
        expect(statusCode).toEqual(400);
        done();
      });
    });

    describe("Valid body", () => {
      beforeEach(async () => {
        await reset();
      })

      it("should pass for new tutor and students", async (done) => {
        const studentInfo = ['efg@gmail.com', 'hij@gmail.com']
          .sort((a, b) => a.localeCompare(b));
        const tutorEmail = 'abcd@gmail.com';
        const { statusCode } = await request(app).post("/api/register").send({
          tutor: tutorEmail,
          students: studentInfo,
        }).catch(e => console.log(e));
        const tutor = await db.Tutor.findOne({
          where: {
            email: tutorEmail,
          },
          include: {
            model: db.Student,
            as: 'subscriptions',
            required: true,
          }
        });
        const emails = tutor.subscriptions
          .map(s => s.email)
          .sort((a, b) => a.localeCompare(b));
        
        expect(emails).toEqual(studentInfo)
        expect(statusCode).toEqual(204)
        done();
      });

      it("should pass for existing tutor and new students", async (done) => {
        const studentInfo = ['lmn@gmail.com', 'opq@gmail.com']
          .sort((a, b) => a.localeCompare(b));
        const tutorEmail = 't1@gmail.com'; // exists after running seed()

        const { statusCode } = await request(app).post("/api/register").send({
          tutor: tutorEmail,
          students: studentInfo,
        });

        const tutor = await db.Tutor.findOne({
          where: {
            email: tutorEmail,
          },
          include: {
            model: db.Student,
            as: 'subscriptions',
            required: true,
          }
        });
        const emails = tutor.subscriptions.map(s => s.email)
          .sort((a, b) => a.localeCompare(b));

        expect(emails).toEqual(studentInfo)
        expect(statusCode).toEqual(204)
        done();
      });

      it("should pass for new tutor and old students", async (done) => {
        const studentInfo = ['s1@gmail.com', 's2@gmail.com']
          .sort((a, b) => a.localeCompare(b)); // exists after running seed()
        const tutorEmail = 'rst@gmail.com';

        const { statusCode } = await request(app).post("/api/register").send({
          tutor: tutorEmail,
          students: studentInfo,
        });

        const tutor = await db.Tutor.findOne({
          where: {
            email: tutorEmail,
          },
          include: {
            model: db.Student,
            as: 'subscriptions',
            required: true,
          }
        });
        const emails = tutor.subscriptions
          .map(s => s.email)
          .sort((a, b) => a.localeCompare(b));

        expect(emails).toEqual(studentInfo)
        expect(statusCode).toEqual(204)
        done();
      });
    });
  });

  describe("GetCommonStudents API", () => {
    describe("Invalid query", () => {
      it("should fail without tutor ", async (done) => {
        const { statusCode, body } = await request(app).post("/api/register").send();
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail if tutor is not an email ", async (done) => {
        const { statusCode, body } = await request(app).post("/api/register").send({
          tutor: '@gmail.com',
        });
        const { message, details } = body;
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" must be a valid email' }])
        expect(statusCode).toEqual(400);
        done();
      });
    });

    describe("Valid query", () => {
      it("should pass for single common tutor ", async (done) => {
        const tutor = await db.Tutor.findOne({ where: { email: 't1@gmail.com' } })
        const newStudents = await db.Student.findAll({
          where: {
            email: [
              's1@gmail.com',
              's2@gmail.com'
            ],
          },
        });
        await tutor.addSubscriptions(newStudents.map(s => s.id));
        const { statusCode, body } = await request(app).get("/api/getcommonsstudents?tutor=t1%40gmail.com");
        const { students } = body;
        expect(students.length).toEqual(2)
        // expect(details).toEqual([{ tutor: '"tutor" must be a valid email' }])
        expect(statusCode).toEqual(200);
        done();
      });

      it("should pass for multiple common tutor", async (done) => {
        done();
      });
    });
  });

  describe("SuspendStudent API", () => {
    describe("Invalid body", () => {
      it("should fail for nonexistent student", async (done) => {
        done();
      });
    });

    describe("Valid body", () => {
      it("should pass for existing student", async (done) => {
        done();
      });
    });
  });

  describe("ReceiveNotifications API", () => {
    describe("Invalid body", () => {
      it("should fail if tutor is empty", async (done) => {
        done();
      });

      it("should fail if notification is empty", async (done) => {
        done();
      });
    });
  });

  describe("Valid body", () => {
    it("should fail if tutor doesnt exist", async (done) => {
      done();
    });

    it("should pass and retrieve students that belongs to the tutor", async (done) => {
      done();
    });

    it("should pass and retrieve students that belongs to the tutor and mentioned students", async (done) => {
      done();
    });

    it("should pass and retrieve students that are not suspended only", async (done) => {
      done();
    });
  });
});
