const { callmeWebSocket } = require("../controllers/exampleController");

module.exports = (cron) => {
  cron.schedule("3 * * * *", async () => {
    await callmeWebSocket();
    console.log("Running task callmewebsocket every 3 minutes");
  });
};
