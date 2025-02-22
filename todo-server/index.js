require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  MongoClient,
  ServerApiVersion,
  Timestamp,
  ObjectId,
} = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54rjrr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    console.log("DB connected");
    // db
    const db = client.db("taskApp");
    const tasksCollection = db.collection("tasks");
    const usersCollection = db.collection("users");

    // Save or Update a user in the db
    app.post("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const isExists = await usersCollection.findOne({ email });
      if (isExists) {
        // console.log("Already exists", isExists);
        return res.send({ message: "User already exists", user: isExists });
      }
      const result = await usersCollection.insertOne(user);
      // console.log("create newUser", result);
      return res.send(result);
    });

    // get all users
    app.get("/users", async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    // api routes for todos
    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      res.send(result);
    });

    app.get("/tasks", async (req, res) => {
      const { email } = req.query;
      const filter = email ? { owner: email } : {};
      const tasks = await tasksCollection.find(filter).toArray();
      // console.log(tasks);
      res.send(tasks);
    });

    app.get("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const task = await tasksCollection.findOne({ _id: new ObjectId(id) });
      res.send(task);
    });

    app.put("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;

      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: data,
      };
      const result = await tasksCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await tasksCollection.deleteOne(filter);
      res.send(result);
    });

    app.patch("/tasks/:id", async (req, res) => {
      const { category, position } = req.body;
      const taskId = req.params.id;

      try {
        const result = await tasksCollection.updateOne(
          { _id: new ObjectId(taskId) }, // Filter to find the task by ID
          { $set: { category, position } } // Update operation
        );

        if (result.matchedCount === 0) {
          return res.status(404).send("Task not found");
        }

        res.status(200).send("Task updated successfully");
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send("Error updating task");
      }
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

run();

app.get("/", (req, res) => {
  res.send("Hello Tasks!");
});

app.listen(port, () => {
  console.log(`Sever is Running on ${port}`);
});
