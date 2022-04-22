import "dotenv/config";
import express from "express";

import { URLController } from "./controller/URLController";

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.emit("pronto"))
  .catch((error: any) => console.log(error));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const urlController = new URLController();

app.post("/shorten", urlController.shorten);
app.get("/:hash", urlController.redirect);

const PORT = process.env.PORT;

app.on("pronto", () => {
  app.listen(PORT, () =>
    console.log(`Servidor executando em http://localhost:${PORT}`)
  );
});
