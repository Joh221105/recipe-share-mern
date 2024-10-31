import React, { useState } from "react";

const Accordion = ({ title, children, constantHeight = '400px' }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="mb-4 overflow-hidden">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full p-4 text-left bg-white border rounded-t-lg focus:outline-none"
      >
        <span className="font-semibold">{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      <div
        style={{ height: isOpen ? constantHeight : 0 }} 
        className={`transition-all duration-300 ease-in-out overflow-hidden`} 
      >
        <div className="p-4 border-t" style={{ height: constantHeight, overflowY: 'auto' }}> 
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
