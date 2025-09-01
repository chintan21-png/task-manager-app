import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/50'>
            <div className='w-full max-w-md mx-4'>
                <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
                    <div className='flex items-center justify-between p-4 border-b'>
                        <h3 className='text-lg font-medium text-gray-900'>
                            {title}
                        </h3>
                        <button
                            type='button'
                            className='text-gray-500 hover:text-gray-700'
                            onClick={onClose}
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                            </svg>
                        </button>
                    </div>
                    <div className='p-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;