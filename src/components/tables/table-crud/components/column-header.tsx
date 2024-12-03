import React from 'react';

interface ColumnHeaderProps {
  title: string;
  key: string; // Include key for React's list rendering
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({ title }) => {
  return (
    <div className="p-2.5 xl:p-5">
      <h5 className="text-sm font-medium uppercase xsm:text-base">
        {title}
      </h5>
    </div>
  );
};

export default ColumnHeader;