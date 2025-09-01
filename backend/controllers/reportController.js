const path = require("path");
const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

console.log("📁 Resolving Task from:", path.resolve(__dirname, "../models/Task"));

/**
 * Export all tasks as Excel
 * Route: GET /api/reports/export/tasks
 * Access: Admin only
 */
const exportTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Task Report");

    worksheet.columns = [
      { header: "Task ID", key: "_id", width: 25 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Status", key: "status", width: 20 },
      { header: "Due Date", key: "dueDate", width: 20 },
      { header: "Assigned To", key: "assignedTo", width: 30 },
    ];

    tasks.forEach((task) => {
      let assignedToText = "Unassigned";

      if (Array.isArray(task.assignedTo)) {
        assignedToText = task.assignedTo
          .map((user) => `${user.name} (${user.email})`)
          .join(", ");
      } else if (task.assignedTo) {
        assignedToText = `${task.assignedTo.name} (${task.assignedTo.email})`;
      }

      worksheet.addRow({
        _id: task._id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate?.toISOString().split("T")[0] || "",
        assignedTo: assignedToText,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="tasks_report.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exporting tasks:", error);
    res.status(500).json({
      message: "Error exporting tasks",
      error: error.message,
    });
  }
};

/**
 * Export user-task summary as Excel
 * Route: GET /api/reports/export/users
 * Access: Admin only
 */
const exportUsersReport = async (req, res) => {
  try {
    const users = await User.find().select("name email _id").lean();
    const tasks = await Task.find().populate("assignedTo", "name email _id");

    const userTaskMap = {};

    users.forEach((user) => {
      userTaskMap[user._id] = {
        name: user.name,
        email: user.email,
        taskCount: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
      };
    });

    tasks.forEach((task) => {
      const assignedUsers = Array.isArray(task.assignedTo)
        ? task.assignedTo
        : task.assignedTo
        ? [task.assignedTo]
        : [];

      assignedUsers.forEach((user) => {
        const userStats = userTaskMap[user._id];
        if (userStats) {
          userStats.taskCount += 1;
          switch (task.status) {
            case "Pending":
              userStats.pendingTasks += 1;
              break;
            case "In Progress":
              userStats.inProgressTasks += 1;
              break;
            case "Completed":
              userStats.completedTasks += 1;
              break;
          }
        }
      });
    });

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("User Task Report");

    worksheet.columns = [
      { header: "User Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 40 },
      { header: "Total Assigned Tasks", key: "taskCount", width: 20 },
      { header: "Pending Tasks", key: "pendingTasks", width: 20 },
      { header: "In Progress Tasks", key: "inProgressTasks", width: 20 },
      { header: "Completed Tasks", key: "completedTasks", width: 20 },
    ];

    Object.values(userTaskMap).forEach((userStats) => {
      worksheet.addRow(userStats);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users_report.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exporting users report:", error);
    res.status(500).json({
      message: "Error exporting users report",
      error: error.message,
    });
  }
};

module.exports = {
  exportTasksReport,
  exportUsersReport,
};
