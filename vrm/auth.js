import mongo from "mongodb";
import baza from "./baza.js";
import bcrypt from "bcrypt";

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
};
