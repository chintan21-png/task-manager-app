import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers, LuUser } from 'react-icons/lu'; // Import LuUser for fallback
import Modal from '../Modal';
import AvatarGroup from '../AvatarGroup';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);
    
    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if (response.data?.length > 0) {
                setAllUsers(response.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    
    const toggleUserSelection = (userId) => {
        setTempSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };
    
    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    const selectedUserAvatars = allUsers
        .filter(user => selectedUsers.includes(user._id))
        .map(user => user.profileImageUrl || null); // Ensure no empty strings

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([]);
        }
    }, [selectedUsers]);

    return ( 
        <div className='mt-2'>
            {selectedUserAvatars.length === 0 ? (
                <button className='card-btn' onClick={() => setIsModalOpen(true)}>
                    <LuUsers className='text-sm' /> Add Members
                </button>
            ) : (
                <div onClick={() => setIsModalOpen(true)}>
                    <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Select Users"
            >
                <div className='h-[60vh] overflow-y-auto'>
                    {allUsers.map(user => (
                        <div
                            key={user._id}
                            className='flex items-center gap-3 p-3 border-b border-gray-200'
                        >
                            {user.profileImageUrl ? (
                                <img
                                    src={user.profileImageUrl}
                                    alt={user.name}
                                    className='w-10 h-10 rounded-full object-cover'
                                />
                            ) : (
                                <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
                                    <LuUser className='text-gray-500' />
                                </div>
                            )}
                            <div className='flex-1'>
                                <p className='font-medium text-gray-800'>
                                    {user.name}
                                </p>
                                <p className='text-xs text-gray-500'>{user.email}</p>
                            </div>
                            <input 
                                type='checkbox'
                                checked={tempSelectedUsers.includes(user._id)}
                                onChange={() => toggleUserSelection(user._id)}
                                className='w-4 h-4 text-primary rounded'
                            />
                        </div>
                    ))}
                </div>
                <div className='flex justify-end gap-4 pt-4 border-t mt-4'>
                    <button 
                        className='px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded'
                        onClick={() => setIsModalOpen(false)}
                    >
                        CANCEL
                    </button>
                    <button 
                        className='px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary-dark'
                        onClick={handleAssign}
                    >
                        DONE
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default SelectUsers;