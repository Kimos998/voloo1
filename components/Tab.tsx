
import React from 'react';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  const baseClasses = 'py-4 px-6 text-center font-semibold cursor-pointer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50';
  const activeClasses = 'bg-gray-100 text-gray-900 border-b-2 border-indigo-500';
  const inactiveClasses = 'bg-gray-200 text-gray-600 hover:bg-gray-300/70';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      role="tab"
      aria-selected={isActive}
    >
      {label}
    </button>
  );
};

export default Tab;
