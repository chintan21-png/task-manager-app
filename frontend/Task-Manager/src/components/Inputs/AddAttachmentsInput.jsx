import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2'
import { LuPaperclip } from 'react-icons/lu'

const AddAttachmentsInput = ({attachments, setAttachments}) => {
    const [option, setOption] = useState("")
    
    // Function to handle adding an option
    const handleAddOption = () => {
        if(option.trim()) {
            setAttachments([...attachments, option.trim()]);
            setOption("");
        }
    };
    
    // Function to handle deleting an option
    const handleDeleteOption = (index) => {
        const updatedArr = attachments.filter((_, idx) => idx !== index);
        setAttachments(updatedArr);
    };
    
    // Enter key adds attachment
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddOption();
        }
    };

  return (
    <div className="mt-2">
        {attachments.length > 0 && (
            <div className="mb-3 border border-gray-200 rounded-md divide-y divide-gray-100">
                {attachments.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center px-3 py-2.5 bg-white hover:bg-gray-50"
                    >
                        <div className="flex items-center">
                            <LuPaperclip className="text-gray-400 mr-2" />
                            <p className="text-sm text-gray-800">{item}</p>
                        </div>
                        <button
                            type="button"
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            onClick={() => handleDeleteOption(index)}
                            aria-label="Remove attachment"
                        >
                            <HiOutlineTrash className="text-lg text-gray-400 hover:text-red-500" />
                        </button>
                    </div>
                ))}
            </div>
        )}
        
        <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-blue-500">
                <LuPaperclip className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Add File Link"
                    value={option}
                    onChange={({ target }) => setOption(target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full text-sm outline-none bg-transparent"
                />
            </div>
            <button
                type="button"
                className="flex items-center gap-1 bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleAddOption}
            >
                <HiMiniPlus className="text-base" />
                Add
            </button>
        </div>
    </div>
  )
}

export default AddAttachmentsInput