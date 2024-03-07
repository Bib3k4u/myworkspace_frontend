import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader'; // Import Loader component

const Home = () => {
  const [texts, setTexts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // State for initial loading

  useEffect(() => {
    fetchData(); // Fetch data initially when component mounts

    const fetchDataInterval = setInterval(() => {
      fetchData(); // Fetch data every 5 seconds
    }, 2000);

    return () => clearInterval(fetchDataInterval); // Cleanup interval on component unmount
  }, []); // Empty dependency array to run effect only once on mount

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://myworkspace.onrender.com/api/text?page=${currentPage}`);
      setTexts(response.data.texts.reverse()); // Reverse the array to show in descending order
    } catch (error) {
      console.error('Error fetching text:', error);
    } finally {
      // If this is the initial data fetch, set isLoading to false
      if (isLoading) {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true); // Show loader before deleting

    try {
      await axios.delete(`https://myworkspace.onrender.com/api/text/${id}`);
      // After deleting, fetch updated data
      fetchData();
      // Show toast notification
      toast.success('Khatam... Tata Bye-Bye');
    } catch (error) {
      console.error('Error deleting text:', error);
      toast.error('Failed to delete text. Please try again later.');
    } finally {
      setIsLoading(false); // Hide loader after deletion
    }
  };

  const handleCopyText = (content) => {
    navigator.clipboard.writeText(content);
    toast.success('Text copied to clipboard!');
  };

  const lastIndex = currentPage * 5;
  const firstIndex = lastIndex - 5;

  return (
    <div className="container mx-auto mt-8 relative">
      {isLoading && <Loader />} {/* Show Loader component only during initial data fetching */}
      <ToastContainer style={{ backgroundColor: 'white' }} bodyClassName="text-black" />

      <h1 className="text-2xl font-bold mb-4 tracking-widest">Recent Text</h1>

      <ul>
        {texts.slice(firstIndex, lastIndex).map((text, index) => (
          <li key={text.id} className="border-b md:m-3 md:p-3 lg:m-3 lg:p-3 border-gray-300 py-2 flex justify-between items-center">
            <span>{`${index + 1 + (currentPage - 1) * 5}. ${text.content}`}</span>
            
            <div className='m-8 flex flex-col md:flex-row lg:flex-row xl:flex-row  justify-between p-2'>
              <button className="bg-violet-500 hover:bg-violet-700 shadow-md text-black px-3 py-1 rounded m-2" onClick={() => handleCopyText(text.content)}>Copy</button>
              <button className="bg-violet-500 text-black hover:bg-violet-700 shadow-md px-3 py-1 rounded m-2 mr-2" onClick={() => handleDelete(text.id)}>Delete</button>
            </div>
            
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(texts.length / 5) }, (_, index) => (
          <button
            key={index + 1}
            className={`bg-violet-300 hover:bg-violet-400 text-gray-800 font-bold py-2 px-4 rounded-lg m-2 ${currentPage === index + 1 ? 'bg-gray-400' : ''
              }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
