export const BASE_URL = "https://taskfyer-v6zj.onrender.com";

//utils/apiPaths.js
export const API_PATHS = {
    AUTH : {
        REGISTER : "/api/auth/register", // Register a new user(Admin or Member)
        LOGIN : "/api/auth/login", //Authenticate user & return JWT token
        GET_PROFILE : "/api/auth/profile",//GET logged-in user details 
    },

    USERS : {
        GET_ALL_USERS : "/api/users", //Get all users (Admin only)
        GET_USER_BY_ID : (userId) => `/api/users/${userId}`, //Get user by id
        CREATE_USER : "/api/users", //Create a new user (Admin only)
        UPDATE_USER : (userId) => `/api/users/${userId}`, //Update user details
        DELETE_USER : (userId) => `/api/users/${userId}`, //Delete a user
    },

    TASKS : {
        GET_DASHBOARD_DATA : "/api/tasks/dashboard-data", //Get dashboard data
        GET_USER_DASHBOARD_DATA : "/api/tasks/user-dashboard-data", //User dashboard data
        GET_ALL_TASKS : "/api/tasks", //Get all tasks(Admin : all , User : only assigned tasks)
        GET_TASK_BY_ID : (taskId) => `/api/tasks/${taskId}`, //Task by id
        CREATE_TASK : "/api/tasks", //Create tasks (Admin only)
        UPDATE_TASK : (taskId) => `/api/tasks/${taskId}`, //Update task details
        DELETE_TASK : (taskId) => `/api/tasks/${taskId}`, //Delete task
        UPDATE_TASK_STATUS : (taskId) => `/api/tasks/${taskId}/status`, //Update task status
        UPDATE_TODO_CHECKLIST : (taskId) => `/api/tasks/${taskId}/todo`, //Update todo checklist
    },

    REPORTS : {
        EXPORT_TASKS : "/api/reports/export/tasks", //Download all tasks as an excel
        EXPORT_USERS : "/api/reports/export/users", //Download all users as an excel
    },

    IMAGE : {
        UPLOAD_IMAGE : "/api/auth/upload-image",
    },
};
