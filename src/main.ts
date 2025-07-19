import "dotenv/config";

import { app } from "@/application/app";
import { logger } from "@/application/logging";

const port = process.env.PORT;

app.listen(port, () => {
  logger.info(`Server success running on port http://localhost:${port}`);
});
