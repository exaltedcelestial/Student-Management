require("./setupDotenv");

const db = require("./models");

(async () => {
  console.log('================================================')
  console.log('environment:', process.env.NODE_ENV)
  console.log('================================================')
  await db.sequelize.sync({ force: true });
  process.exit()
})()
