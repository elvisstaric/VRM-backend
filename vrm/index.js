import dotenv from "dotenv";
dotenv.config();
import express, { Router } from "express";
import cors from "cors";
import baza from "./baza.js";
import { ObjectId } from "mongodb";
import auth from "./auth.js";

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use(router);

let port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

router.route("/korisnik").post(async (req, res) => {
  let korisnik = req.body;
  let status;
  try {
    status = await auth.registracija(korisnik);
    res.json({ Status: status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/korisnik").get(async (req, res) => {
  let email = req.query.email;
  let password = req.query.password;

  try {
    let result = await auth.prijava(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
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

//treba dodati da dohvaća samo za taj objekt!!
router.route("/rezervacija").get(async (req, res) => {
  async function dohvat() {
    const collection = baza.collection("Rezervacije");
    let result = await collection.find({}).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

//treba dodati da dohvaća samo za tog korisnika!!!!
router.route("/osoba").get(async (req, res) => {
  async function dohvat() {
    const collection = baza.collection("Personal");
    let result = await collection.find({}).toArray();
    return result;
  }
  let personal = await dohvat();
  res.json(personal);
});

//dodati da dohvaca samo za taj objekt
router.route("/odrzavanje").get(async (req, res) => {
  async function dohvat() {
    const collection = baza.collection("Odrzavanja");
    let result = await collection.find({}).toArray();
    return result;
  }
  let odrzavanja = await dohvat();
  res.json(odrzavanja);
});

//dodati da dohvaca samo za taj objekt
router.route("/ciscenje").get(async (req, res) => {
  async function dohvat() {
    const collection = baza.collection("Ciscenja");
    let result = await collection.find({}).toArray();
    return result;
  }
  let ciscenja = await dohvat();
  res.json(ciscenja);
});

router.route("/rezervacija/:id").get(async (req, res) => {
  async function dohvat() {
    const id = req.params.id;
    const collection = baza.collection("Rezervacije");
    let result = await collection.find({ _id: new ObjectId(id) }).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

router.route("/osoba/:id").get(async (req, res) => {
  async function dohvat() {
    const id = req.params.id;
    const collection = baza.collection("Personal");
    let result = await collection.find({ _id: new ObjectId(id) }).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

router.route("/odrzavanje/:id").get(async (req, res) => {
  async function dohvat() {
    const id = req.params.id;
    const collection = baza.collection("Odrzavanja");
    let result = await collection.find({ _id: new ObjectId(id) }).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

router.route("/objekt/:id").get(async (req, res) => {
  async function dohvat() {
    const id = req.params.id;
    const collection = baza.collection("Objekti");
    let result = await collection.find({ _id: new ObjectId(id) }).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

router.route("/ciscenje/:id").get(async (req, res) => {
  async function dohvat() {
    const id = req.params.id;
    const collection = baza.collection("Ciscenja");
    let result = await collection.find({ _id: new ObjectId(id) }).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});
