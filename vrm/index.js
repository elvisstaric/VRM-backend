import express, { Router } from "express";
import cors from "cors";
import baza from "./baza.js";

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use(router);

let port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

router.route("/objekt").get(async (req, res) => {
  async function dohvat() {
    const collection = baza.collection("Objekti");
    let result = await collection.find({}).toArray();
    return result;
  }
  let objekti = await dohvat();
  res.json(objekti);
});
