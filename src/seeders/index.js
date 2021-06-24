import {register} from '../controllers/api.controller';
const seed = require("./seed");

((async () => {
  await seed();
  process.exit();
})())