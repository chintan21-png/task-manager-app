import React from 'react';

const UserCard = ({ userInfo }) => {
  return (
    <div className='user-card p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img
            src={userInfo?.profileImageUrl || '/default-avatar.png'}
            alt={`${userInfo?.name || 'User'} avatar`}
            className='w-12 h-12 rounded-full object-cover border-2 border-gray-200'
          />
          <div>
            <p className='text-sm font-medium text-gray-800'>{userInfo?.name}</p>
            <p className='text-xs text-gray-500 truncate max-w-[140px]'>{userInfo?.email}</p>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`flex-1 text-center py-2 px-1 rounded-md ${getStatusStyles()}`}>
      <span className='block text-sm font-bold'>{count}</span>
      <span className='text-xs font-medium'>{label}</span>
    </div>
  );
};