import { MongoClient } from "mongodb";
const connectionString =
  "mongodb+srv://primjer:primjer@vrm.jfsfr73.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);
let conn = null;
try {
  console.log("Trying to establish connection...");
  conn = await client.connect();
  console.log(conn);
} catch (e) {
  console.error(e);
}
let baza = conn.db("VRM");
export default baza;
