const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { exportTasksReport, exportUsersReport } = require("../controllers/reportController");
const router = express.Router();

console.log("Loaded reportRoutes.js - router object:", router);
console.log("typeof exportTasksReport:", typeof exportTasksReport);
console.log("typeof exportUsersReport:", typeof exportUsersReport);


router.get("/export/tasks", protect, adminOnly, exportTasksReport); //Export all tasks as Excel/PDF
router.get("/export/users", protect, adminOnly, exportUsersReport); //Export user-task report

module.exports = router;