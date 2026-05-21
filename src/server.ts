import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import app from "./index";
import config from "./config";
import { initDB } from "./db";

const main = async () => {
  await initDB();
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main();
