import React from "react";

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-10">
          <a href="#" className="text-white text-lg font-semibold">
            Logo
          </a>
          <ul className="ml-6 space-x-4 flex">
            <li>
              <a href="/" className="text-gray-300 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/hotelList" className="text-gray-300 hover:text-white">
                Hotels
              </a>
            </li>
            
          </ul>
        </div>
        <div className="flex items-center">
          <h1 className="text-white	font-semibold">This is Demo for StayBook</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
