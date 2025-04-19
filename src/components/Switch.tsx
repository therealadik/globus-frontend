import React, { useState, useEffect } from 'react';

interface SwitchProps {
  leftLabel: string;
  rightLabel: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({ leftLabel, rightLabel, value, onChange, className = '' }) => {
  const [isLeft, setIsLeft] = useState(value === leftLabel);

  useEffect(() => {
    setIsLeft(value === leftLabel);
  }, [value, leftLabel]);

  const handleLeftClick = () => {
    if (!isLeft) {
      setIsLeft(true);
      onChange(leftLabel);
    }
  };

  const handleRightClick = () => {
    if (isLeft) {
      setIsLeft(false);
      onChange(rightLabel);
    }
  };

  return (
    <div className={`w-full rounded h-10 flex p-1 relative items-center bg-gray-200 ${className}`}>
      <div 
        className="w-full flex justify-center cursor-pointer relative z-10"
        onClick={handleLeftClick}
      >
        <span className={`text-sm font-medium ${isLeft ? 'text-white' : 'text-gray-700'}`}>
          {leftLabel}
        </span>
      </div>
      <div 
        className="w-full flex justify-center cursor-pointer relative z-10"
        onClick={handleRightClick}
      >
        <span className={`text-sm font-medium ${!isLeft ? 'text-white' : 'text-gray-700'}`}>
          {rightLabel}
        </span>
      </div>
      <div
        className={`bg-indigo-600 shadow w-1/2 rounded h-8 transition-all absolute top-[4px] ${
          isLeft ? 'left-1' : 'left-[calc(50%-4px)]'
        }`}
      />
    </div>
  );
};

export default Switch; 