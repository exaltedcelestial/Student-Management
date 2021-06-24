const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV == "test") {
  dotenv.config({ path: path.resolve('.env.test') });
} else {
  dotenv.config({ path: path.resolve('.env') });
}