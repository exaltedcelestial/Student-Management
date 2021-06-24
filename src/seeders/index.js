require("../setupDotenv");
const seed = require("./seed");

((async () => {
  try {
    await seed();
    console.log('==========================================')
    console.log('Finished Populating Database');
    console.log('==========================================')
  } catch (error) {
    console.log(error)    
  } finally {
    process.exit();
  }
})())