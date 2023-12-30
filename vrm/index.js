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

router.route("/objekt").get(auth.provjera, async (req, res) => {
  async function dohvat() {
    const collection = baza.collection("Objekti");
    let result = await collection
      .find({
        korisnik: req.headers.korisnik,
      })
      .toArray();
    return result;
  }
  let objekti = await dohvat();
  res.json(objekti);
});

router.route("/rezervacija").get(auth.provjera, async (req, res) => {
  async function dohvat() {
    const collection = baza.collection("Rezervacije");
    let result = await collection
      .find({
        objekt_id: req.headers.id_obj,
      })
      .toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

router.route("/osoba").get(auth.provjera, async (req, res) => {
  async function dohvat() {
    const collection = baza.collection("Personal");
    let result = await collection
      .find({
        korisnik: req.headers.korisnik,
      })
      .toArray();
    return result;
  }
  let personal = await dohvat();
  res.json(personal);
});

router.route("/odrzavanje").get(auth.provjera, async (req, res) => {
  async function dohvat() {
    const collection = baza.collection("Odrzavanja");
    let result = await collection
      .find({
        objekt_id: req.headers.id_obj,
      })
      .toArray();
    return result;
  }
  let odrzavanja = await dohvat();
  res.json(odrzavanja);
});

router.route("/ciscenje").get(auth.provjera, async (req, res) => {
  async function dohvat() {
    const collection = baza.collection("Ciscenja");
    let result = await collection
      .find({
        objekt_id: req.headers.id_obj,
      })
      .toArray();
    return result;
  }
  let ciscenja = await dohvat();
  res.json(ciscenja);
});

router.route("/rezervacija/:id").get(auth.provjera, async (req, res) => {
  async function dohvat() {
    const id = req.params.id;
    const collection = baza.collection("Rezervacije");
    let result = await collection.find({ _id: new ObjectId(id) }).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

router.route("/osoba/:id").get(auth.provjera, async (req, res) => {
  async function dohvat() {
    const id = req.params.id;
    const collection = baza.collection("Personal");
    let result = await collection.find({ _id: new ObjectId(id) }).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

router.route("/odrzavanje/:id").get(auth.provjera, async (req, res) => {
  async function dohvat() {
    const id = req.params.id;
    const collection = baza.collection("Odrzavanja");
    let result = await collection.find({ _id: new ObjectId(id) }).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

router.route("/objekt/:id").get(auth.provjera, async (req, res) => {
  async function dohvat() {
    const id = req.params.id;
    const collection = baza.collection("Objekti");
    let result = await collection.find({ _id: new ObjectId(id) }).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

router.route("/ciscenje/:id").get(auth.provjera, async (req, res) => {
  async function dohvat() {
    const id = req.params.id;
    const collection = baza.collection("Ciscenja");
    let result = await collection.find({ _id: new ObjectId(id) }).toArray();
    return result;
  }
  let rezervacije = await dohvat();
  res.json(rezervacije);
});

router.route("/rezervacija").post(auth.provjera, async (req, res) => {
  let rezervacija = req.body;
  try {
    baza.collection("Rezervacije").insertOne(rezervacija.podatci);

    return res.status(200).send();
  } catch (error) {
    res.json(error);
  }
});

router.route("/osoba").post(auth.provjera, async (req, res) => {
  let osoba = req.body;
  try {
    baza.collection("Personal").insertOne(osoba.podatci);

    return res.status(200).send();
  } catch (error) {
    res.json(error);
  }
});

router.route("/objekt").post(auth.provjera, async (req, res) => {
  let objekt = req.body;
  try {
    baza.collection("Objekti").insertOne(objekt.podatci);

    return res.status(200).send();
  } catch (error) {
    res.json(error);
  }
});

router.route("/odrzavanje").post(auth.provjera, async (req, res) => {
  let odrzavanje = req.body;
  try {
    baza.collection("Odrzavanja").insertOne(odrzavanje.podatci);

    return res.status(200).send();
  } catch (error) {
    res.json(error);
  }
});

router.route("/ciscenje").post(auth.provjera, async (req, res) => {
  let ciscenje = req.body;
  try {
    baza.collection("Ciscenja").insertOne(ciscenje.podatci);

    return res.status(200).send();
  } catch (error) {
    res.json(error);
  }
});
