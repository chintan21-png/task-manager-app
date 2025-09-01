const express = require("express");
const router = express.Router();
const { protect, adminOnly} = require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");

console.log("Loaded taskRoutes.js - router object:", router);

//Task Management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // Get All Tasks (Admin: all, user: assigned)
router.get("/:id", protect , getTaskById);
router.post("/", protect, adminOnly, createTask); //Create a task (Admin only)
router.put("/:id", protect , updateTask); //Update task details
router.delete("/:id" , protect, adminOnly , deleteTask); //Delete a task (Admin only)
router.put("/:id/status" , protect, updateTaskStatus); // update task status
router.put("/:id/todo", protect , updateTaskChecklist); //update task checklist

module.exports = router;