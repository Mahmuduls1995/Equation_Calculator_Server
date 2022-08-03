const express = require("express");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const objectId = require('mongodb').ObjectId;
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// DB_USER=Calculator-Equation
// DB_PASS=wbhyqsZoUudyM3UE

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fzbub.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log("Database connect sucess");
    
    const alphabetsCollection = client
      .db("Equation-Calculator")
      .collection("alphabets");

    app.get("/alphabets", async (req, res) => {
      const query = {};
      const cursor = alphabetsCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    // app.post('/alphabet', async (req, res) => {
    //     const order = req.body;
    //     const result = await dateCollection.insertOne(order);
    //     res.send(result);
    // })


} finally {
    
}
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Calculator app listening on port ${port}`);
});
