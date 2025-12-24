// DashboardLayout.jsx
import React from 'react';
import SideMenu from './SideMenu';

const DashboardLayOut = ({ children, activeMenu }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <SideMenu activeMenu={activeMenu} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden p-4 bg-white/70 backdrop-blur-sm"> 
        {children}
      </div>
    </div>
  );
};

export default DashboardLayOut;
