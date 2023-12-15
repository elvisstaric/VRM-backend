import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

//Registracija i login

app.get("/login", (req, res) => {
  if (user_loging) {
    res.status(200);
    res.send();
  } else {
    res.status(401);
    res.send();
  }
});

app.post("/registracija", (req, res) => {
  users.push(req.body);
  res.status(201);
  res.send();
});

//Objekti

app.get("/objekt", (req, res) => {
  res.json(objekti);
});

app.get("/objekt/:id", (req, res) => {
  res.json(trazeni_obj);
});

app.post("/objekt", (req, res) => {
  objekti.push(req.body);
  res.status(201);
  res.send();
});

app.patch("/objekt/:id", (req, res) => {
  const id = req.params?.id;
  const podatci = req.body;
  res.status(201);
  res.send();
});

app.delete("/objekt/:id", (req, res) => {
  if (trazeni_obj) {
    res.status(200);
    res.send();
  } else {
    res.status(400);
    res.send();
  }
});

//Personal

app.get("/osoba", (req, res) => {
  res.json(personal);
});

app.get("/osoba/:id", (req, res) => {
  res.json(trazena_osoba);
});

app.post("/osoba", (req, res) => {
  personal.push(req.body);
  res.status(201);
  res.send();
});

app.patch("/osoba/:id", (req, res) => {
  const id = req.params?.id;
  const podatci = req.body;
  res.status(201);
  res.send();
});

app.delete("/osoba/:id", (req, res) => {
  if (trazena_osoba) {
    res.status(200);
    res.send();
  } else {
    res.status(400);
    res.send();
  }
});

//Rezervacije

app.get("/rezervacija", (req, res) => {
  res.json(rezervacije);
});

app.get("/rezervacija/:id", (req, res) => {
  res.json(trazena_rez);
});

app.post("/rezervacija", (req, res) => {
  rezervacije.push(req.body);
  res.status(201);
  res.send();
});

app.patch("/rezervacija/:id", (req, res) => {
  const id = req.params?.id;
  const podatci = req.body;
  res.status(201);
  res.send();
});

app.delete("/reazervacija/:id", (req, res) => {
  if (trazena_rez) {
    res.status(200);
    res.send();
  } else {
    res.status(400);
    res.send();
  }
});

//Čišćenja

app.get("/ciscenje", (req, res) => {
  res.json(ciscenja);
});

app.get("/ciscenje/:id", (req, res) => {
  res.json(trazeno_ciscenje);
});

app.post("/ciscenje", (req, res) => {
  rezervacije.push(req.body);
  res.status(201);
  res.send();
});

app.patch("/ciscenje/:id", (req, res) => {
  const id = req.params?.id;
  const podatci = req.body;
  res.status(201);
  res.send();
});

app.delete("/ciscenje/:id", (req, res) => {
  if (trazeno_ciscenje) {
    res.status(200);
    res.send();
  } else {
    res.status(400);
    res.send();
  }
});

//Održavanja

app.get("/odrzavanja", (req, res) => {
  res.json(ciscenja);
});

app.get("/odrzavanje/:id", (req, res) => {
  res.json(trazeno_odrzavanje);
});

app.post("/odrzavanje", (req, res) => {
  rezervacije.push(req.body);
  res.status(201);
  res.send();
});

app.patch("/odrzavanje/:id", (req, res) => {
  const id = req.params?.id;
  const podatci = req.body;
  res.status(201);
  res.send();
});

app.delete("/odrzavanje/:id", (req, res) => {
  if (trazeno_odrzavanje) {
    res.status(200);
    res.send();
  } else {
    res.status(400);
    res.send();
  }
});

//Financije objekta

app.get("/financije_objekt/:id", (req, res) => {
  let id_objekta = req.params.id;
  let trazene_finaincije;

  res.json(trazene_finaincije);
});

//Financije personal

app.get("/financije_personal/:id", (req, res) => {
  let id_pers = req.params.id;
  let trazene_finaincije;

  res.json(trazene_finaincije);
});

app.patch("/financije_personal/:id", (req, res) => {
  const id = req.params?.id;
  const podatci = req.body;
  res.status(201);
  res.send();
});
app.listen(3000);
