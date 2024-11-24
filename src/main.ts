import express, { Express, Response, Request } from "express";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send({ status: "success" });
  console.log("yeeee");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
  console.log("Running on port 3000");
});
