import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
await init();
const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");
const db = client.database("deno");
export default db;
// const users = db.collection("users");
// users.insertOne({ name: "Sarthak" });
