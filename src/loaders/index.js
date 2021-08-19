
const ExpressServer = require("./server/expressServer");
const sequelize = require("../loaders/sequelize/index");
const config = require("../config");
const logger = require("./logger");


const startServer = async()=>{ 

  try {
    
    await sequelize.authenticate();    
    logger.info("DB loaded and connected")
    
    const server = new ExpressServer()
    logger.info("Express loaded");
  
    server.start();
    logger.info(`###########################
      Server listening on port: ${config.port}
      ###########################
    `);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

    
    
}

module.exports = startServer;



