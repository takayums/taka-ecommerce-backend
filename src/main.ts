import { app } from "./application/app";
import { logger } from "./application/logging";
import "dotenv/config";

const port = process.env.PORT;

app.listen(port, () => {
  logger.info(`Server success running on port http://localhost:${port}`);
});
