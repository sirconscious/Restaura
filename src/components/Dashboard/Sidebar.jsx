import React,{useState} from 'react';
import { FiMenu } from 'react-icons/fi';
import { FaChartBar, FaCog, FaUser, FaProjectDiagram, FaGraduationCap, FaUserFriends, FaFileAlt, FaCreditCard } from 'react-icons/fa';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
  
    
    <aside className="bg-white p-5 shadow-md w-64">
    <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 text-gray-800"
      >
        <FiMenu size={24} />
      </button>
  
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
      <h1 className="text-lg font-bold text-center mb-10 relative">Riad Saveur</h1>
      <ul className="space-y-4">
        <li><a href="#dashboard" className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-100"><FaChartBar className="mr-3" />Dashboard</a></li>
        <li><a href="#settings" className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-100"><FaCog className="mr-3" />Settings</a></li>
        {/* <li><a href="#profile" className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-100"><FaUser className="mr-3" />Profile</a></li>
        <li><a href="#projects" className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-100"><FaProjectDiagram className="mr-3" />Projects</a></li>
        <li><a href="#courses" className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-100"><FaGraduationCap className="mr-3" />Courses</a></li>
        <li><a href="#friends" className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-100"><FaUserFriends className="mr-3" />Friends</a></li>
        <li><a href="#files" className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-100"><FaFileAlt className="mr-3" />Files</a></li>
        <li><a href="#plans" className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-100"><FaCreditCard className="mr-3" />Plans</a></li> */}
      </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
