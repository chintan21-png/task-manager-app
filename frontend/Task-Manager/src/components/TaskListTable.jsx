import React from 'react';
import moment from 'moment';

const TaskListTable = ({ tableData }) => {
    const getStatusBadgeColor = (status) => {
        switch(status) {
            case "Completed":
                return "bg-green-100 text-green-800";
            case "Pending":
                return "bg-purple-100 text-purple-800";
            case "In Progress":
                return "bg-cyan-100 text-cyan-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getPriorityBadgeColor = (priority) => {
        switch(priority) {
            case "High":
                return "bg-red-100 text-red-800";
            case "Medium":
                return "bg-orange-100 text-orange-800";
            case "Low":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className='overflow-x-auto rounded-lg'>
            <table className='w-full'>
                <thead>
                    <tr className='text-left bg-gray-50'>
                        <th className='py-2 px-3 text-gray-600 font-medium text-xs'>Name</th>
                        <th className='py-2 px-3 text-gray-600 font-medium text-xs'>Status</th>
                        <th className='py-2 px-3 text-gray-600 font-medium text-xs'>Priority</th>
                        <th className='py-2 px-3 text-gray-600 font-medium text-xs hidden md:table-cell'>Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((task) => (
                        <tr key={task._id} className='border-b border-gray-100 hover:bg-gray-50'>
                            <td className='py-2 px-3 text-gray-800 text-xs max-w-[150px] truncate'>
                                {task.title}
                            </td>
                            <td className='py-2 px-3'>
                                <span className={`px-2 py-1 text-xs rounded ${getStatusBadgeColor(task.status)}`}>
                                    {task.status}
                                </span>
                            </td>
                            <td className='py-2 px-3'>
                                <span className={`px-2 py-1 text-xs rounded ${getPriorityBadgeColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                            </td>
                            <td className='py-2 px-3 text-gray-600 text-xs text-nowrap hidden md:table-cell'>
                                {task.createdAt ? moment(task.createdAt).format("Do MMM YY") : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskListTable;