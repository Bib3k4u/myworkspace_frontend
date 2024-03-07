// TextEditor.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextEditor = () => {
  const [content, setContent] = useState('');

  const handleSave = async () => {
    // Check if the content is empty
    if (!content.trim()) {
      toast.error('Ye toh Nalla h... Kux Likh Bhai');
      return;
    }
  
    try {
      await axios.post('https://myworkspace.onrender.com/api/save', { content });
      setContent('');
      toast.success('Boht Badhiya...Saabaasshh');
    } catch (error) {
      console.error('Error saving text:', error);
      toast.error('Failed to save text. Please try again later.');
    }
  };
  

  return (
    <div className="container mx-auto mt-8 flex flex-col justify-center">
      <ToastContainer />
      <textarea
        className="border border-gray-400 p-2 w-full h-72"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className='flex justify-end'>
      <button
        className="bg-violet-500 hover:bg-violet-700 text-black px-16 rounded-lg font-semibold tracking-widest py-2 mt-4 drop-shadow-lg"
        onClick={handleSave}
      >
        Save
      </button>
      </div>
    </div>
  );
};

export default TextEditor;
