import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayOut';
import AvatarGroup from "../../components/AvatarGroup";
import moment from "moment";
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task.todoChecklist];
    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;
      try {
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
          { todoChecklist }
        );
        if (response.status === 200) {
          setTask(response.data?.task || task);
        }
      } catch (error) {
        // Revert on error
        todoChecklist[index].completed = !todoChecklist[index].completed;
      }
    }
  };

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {task && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6">
              <div className='flex items-center justify-between'>
                <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>{task.title}</h2>
                <div className={`text-xs md:text-sm font-medium ${getStatusColor(task.status)} px-4 py-1.5 rounded-full`}>
                  {task.status}
                </div>
              </div>
              
              <div className='mt-6'>
                <InfoBox label="Description" value={task.description} />
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-6'>
                <div>
                  <InfoBox label="Priority" value={task.priority} />
                </div>
                <div>
                  <InfoBox 
                    label="Due Date" 
                    value={task.dueDate ? moment(task.dueDate).format("Do MMM YYYY") : "N/A"} 
                  />
                </div>
                <div>
                  <label className='text-xs font-medium text-slate-500 mb-2 block'>Assigned To</label>
                  <AvatarGroup
                    avatars={task.assignedTo?.map(item => item.profileImageUrl) || []}
                    maxVisible={5}
                  />
                </div>
              </div>
              
              {task.todoChecklist && task.todoChecklist.length > 0 && (
                <div className='mt-6'>
                  <label className='text-sm font-medium text-slate-700 mb-3 block'>Todo Checklist</label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    {task.todoChecklist.map((item, index) => (
                      <TodoCheckList
                        key={`todo_${index}`}
                        text={item.text}
                        isChecked={item.completed}
                        onChange={() => updateTodoChecklist(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {task.attachments?.length > 0 && (
                <div className='mt-6'>
                  <label className='text-sm font-medium text-slate-700 mb-3 block'>Attachments</label>
                  <div className="space-y-3">
                    {task.attachments.map((link, index) => (
                      <Attachment
                        key={`link_${index}`}
                        link={link}
                        index={index}
                        onClick={() => handleLinkClick(link)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => (
  <div className="mb-4">
    <label className='text-xs font-medium text-slate-500 block mb-1'>{label}</label>
    <p className='text-sm text-gray-800'>{value}</p>  
  </div>
);

const TodoCheckList = ({ text, isChecked, onChange }) => (
  <div className='flex items-center gap-3 p-2 hover:bg-white rounded-md transition-colors'>
    <input
      type='checkbox'
      checked={isChecked}
      onChange={onChange}
      className='w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary cursor-pointer'
    />
    <p className={`text-sm ${isChecked ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{text}</p>
  </div>
);

const Attachment = ({ link, index, onClick }) => {
  // Extract domain from URL for display
  let displayLink = link;
  try {
    const url = new URL(link.includes('://') ? link : `https://${link}`);
    displayLink = url.hostname + url.pathname;
  } catch (e) {
    // If URL parsing fails, use the original link
  }
  
  return (
    <div 
      className='flex justify-between items-center bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer' 
      onClick={onClick}
    >
      <div className='flex items-center gap-3 truncate'>
        <span className='text-xs text-gray-500 font-medium flex-shrink-0'>
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <p className='text-sm text-gray-700 truncate' title={link}>{displayLink}</p>
      </div>
      <LuSquareArrowOutUpRight className='text-gray-400 flex-shrink-0' />
    </div>
  );
};