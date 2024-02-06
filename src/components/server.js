const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todoist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/tasks", async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const task = await Task.create({ name, description, date });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { name, description, date } = req.body;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { name, description, date },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
