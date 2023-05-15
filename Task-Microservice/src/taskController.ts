import express from "express";
import Task, { ITask } from "./task.model";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving task" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving tasks" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const task: ITask = new Task({ title, description });
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, done },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task" });
  }
});

router.put("/complete/:id", async (req, res) => {
  try {
    const { done } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { done },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

export default router;
