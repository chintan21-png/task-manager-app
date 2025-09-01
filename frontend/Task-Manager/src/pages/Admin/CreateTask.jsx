import React, { useEffect, useState } from 'react';
import DashboardLayOut from '../../components/layouts/DashboardLayOut';
import { PRIORITY_DATA } from '../../utils/data';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { LuTrash2 } from 'react-icons/lu';
import moment from 'moment';
import SelectDropdown from '../../components/Inputs/SelectDropdown';
import SelectUsers from '../../components/Inputs/SelectUsers';
import TodoListInput from '../../components/Inputs/TodoListInput';
import AddAttachmentsInput from '../../components/Inputs/AddAttachmentsInput';
import Modal from '../../components/Modal';
import DeleteAlert from "../../components/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData(prevData => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  const createTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist?.map((item) => 
        typeof item === 'object' ? item : { text: item, completed: false }
      );
      
      const payload = {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        assignedTo: taskData.assignedTo,
        attachments: taskData.attachments,
        todoChecklist: todolist, 
      };
      
      if (taskData.dueDate) {
        payload.dueDate = new Date(taskData.dueDate).toISOString();
      }
      
      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, payload);
      toast.success("Task Created Successfully");
      clearData();
     
    } catch (error) {
      console.error("Error creating task:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Failed to create task");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    setLoading(true);
    try {
      const todolist = taskData.todoChecklist?.map((item) => 
        typeof item === 'object' ? item : { text: item, completed: false }
      );
      
      const payload = {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        assignedTo: taskData.assignedTo,
        attachments: taskData.attachments,
        todoChecklist: todolist,
      };
      
      if (taskData.dueDate) {
        payload.dueDate = new Date(taskData.dueDate).toISOString();
      }
      
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId), 
        payload
      );
      
      toast.success("Task Updated Successfully");
      
    } catch (error) {
      console.error("Error updating task:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Failed to update task");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async () => {
    setError("");
    
    if (!taskData.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due date is required.");
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any member");
      return;
    }
    
    if (taskId) {
      updateTask();
    } else {
      createTask();
    }
  };
  
  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);
        setTaskData({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate ? moment(taskInfo.dueDate).format("YYYY-MM-DD") : "",
          assignedTo: taskInfo.assignedTo?.map((item) => item?._id) || [],
          todoChecklist: taskInfo.todoChecklist || [],
          attachments: taskInfo.attachments || [],
        });
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      setOpenDeleteAlert(false);
      toast.success("Task deleted successfully");
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Error deleting task:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsById();
    }
  }, [taskId]);

  return (
    <DashboardLayOut activeMenu="Create Task">
      <div className='mt-5 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='form-card'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl md:text-xl font-medium'>
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button 
                  className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer'
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className='text-base' /> Delete
                </button>
              )}
            </div>
            
            <div className='mt-4'>
              <label className='text-xs font-medium text-slate-600'>Task Title</label>
              <input 
                placeholder='Create App UI'
                className='form-input w-full'
                value={taskData.title}
                onChange={({target}) => handleValueChange("title", target.value)}
              />
            </div>
            
            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>Description</label>
              <textarea
                placeholder='Describe Task'
                className='form-input w-full'
                rows={4}
                value={taskData.description}
                onChange={({target}) => handleValueChange("description", target.value)}
              />
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2'>
              <div>
                <label className='text-xs font-medium text-slate-600'>Priority</label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>
              
              <div>
                <label className='text-xs font-medium text-slate-600'>Due Date</label>
                <input 
                  className='form-input w-full'
                  value={taskData.dueDate}
                  onChange={({target}) => handleValueChange("dueDate", target.value)}
                  type='date'                
                />
              </div>
              
              <div>
                <label className='text-xs font-medium text-slate-600'>Assign To</label>
                <SelectUsers 
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                />
              </div>
            </div>
            
            <div className='mt-4'>
              <label className='text-xs font-medium text-slate-600'>TODO Checklist</label>
              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={(value) => handleValueChange("todoChecklist", value)}
              />
            </div>
            
            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>Add Attachments</label>
              <AddAttachmentsInput
                attachments={taskData.attachments}
                setAttachments={(value) => handleValueChange("attachments", value)}
              />
            </div>
            
            {error && (
              <p className='text-xs font-medium text-red-500 mt-5'>{error}</p>
            )}
            
            <div className='flex justify-end mt-7'>
              <button 
                className='add-btn'
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "PROCESSING..." : (taskId ? "UPDATE TASK" : "CREATE TASK")}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayOut>
  );
};

export default CreateTask;