import mongo from "mongodb";
import baza from "./baza.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  async registracija(podatci) {
    await baza
      .collection("Korisnici")
      .createIndex({ email: 1 }, { unique: true });
    let doc = {
      email: podatci.email,
      password: await bcrypt.hash(podatci.password, 8),
    };
    try {
      let result = baza.collection("Korisnici").insertOne(doc);
      if ((await result) && (await result).insertedId) {
        return (await result).insertedId;
      }
    } catch (error) {
      if (error.code == 11000) {
        throw new Error("Korisnik već postoji!");
      }
    }
  },
  async prijava(email, password) {
    let korisnik = await baza.collection("Korisnici").findOne({ email: email });

    if (
      korisnik &&
      korisnik.password &&
      (await bcrypt.compare(password, korisnik.password))
    ) {
      delete korisnik.password;
      let token = jwt.sign(korisnik, process.env.SECRET, {
        algorithm: "HS512",
        expiresIn: "1 week",
      });
      return token;
    } else {
      throw new Error("Neuspijela prijava!");
    }
  },
  provjera(req, res, next) {
    try {
      let auth = req.headers.authorisation.split(" ");
      let tip = auth[0];
      let token = auth[1];

      if (tip != "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(token, process.env.SECRET);
        return next();
      }
    } catch (error) {
      return res.status(401).send();
    }
  },
};
