import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    useEffect(() => {
        if (user) {
            setSideMenuData(user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
        }
    }, [user]);

    return (
        <div className='w-64 h-full bg-white border-r border-gray-200'>
            <div className='flex flex-col items-center py-5 px-4 border-b border-gray-200'>
                <div className='relative mb-3'>
                    {user?.profileImageUrl ? (
                        <img 
                            src={user.profileImageUrl}
                            alt='Profile'
                            className='w-16 h-16 rounded-full object-cover'
                        />
                    ) : (
                        <div className='bg-gray-200 border-2 border-dashed rounded-full w-16 h-16' />
                    )}
                </div>
                {user?.role === "admin" && (
                    <span className='text-xs font-medium text-white bg-primary px-2 py-0.5 rounded mb-2'>
                        Admin
                    </span>
                )}
                <h5 className='font-medium text-gray-800 truncate max-w-full'>
                    {user?.name || "User"}
                </h5>
                <p className='text-xs text-gray-500 truncate max-w-full'>
                    {user?.email || "user@example.com"}
                </p>
            </div>
            
            <div className='py-2'>
                {sideMenuData.map((item, index) => (
                    <button 
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-3 py-3 px-4 text-sm ${
                            activeMenu === item.label 
                                ? "text-primary bg-blue-50 border-r-4 border-primary"
                                : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className="text-lg" />
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SideMenu;