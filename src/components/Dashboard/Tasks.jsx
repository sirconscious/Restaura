import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Tasks = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Latest Tasks</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center">
          <div>
            <span className="font-semibold">Record One New Video</span>
            <p className="text-sm text-gray-500">Record Python Create Exe Project</p>
          </div>
          <FaTrashAlt className="text-red-500 cursor-pointer" />
        </li>
        <li className="flex justify-between items-center">
          <div>
            <span className="font-semibold">Write Article</span>
            <p className="text-sm text-gray-500">Write Low Level vs High Level Languages</p>
          </div>
          <FaTrashAlt className="text-red-500 cursor-pointer" />
        </li>
      </ul>
    </div>
  );
};

export default Tasks;
