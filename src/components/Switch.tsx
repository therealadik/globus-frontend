import React, { useState, useEffect } from 'react';

interface SwitchProps {
  leftLabel: string;
  rightLabel: string;
  leftValue: string;
  rightValue: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ leftLabel, rightLabel, leftValue, rightValue, value, onChange, className = '', disabled = false }) => {
  const [isLeft, setIsLeft] = useState(value === leftValue);

  useEffect(() => {
    setIsLeft(value === leftValue);
  }, [value, leftValue]);

  const handleLeftClick = () => {
    if (!isLeft && !disabled) {
      setIsLeft(true);
      onChange(leftValue);
    }
  };

  const handleRightClick = () => {
    if (isLeft && !disabled) {
      setIsLeft(false);
      onChange(rightValue);
    }
  };

  return (
    <div className={`w-full rounded h-10 flex p-1 relative items-center bg-gray-200 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div 
        className={`w-full flex justify-center relative z-10 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={handleLeftClick}
      >
        <span className={`text-sm font-medium ${isLeft ? 'text-white' : 'text-gray-700'}`}>
          {leftLabel}
        </span>
      </div>
      <div 
        className={`w-full flex justify-center relative z-10 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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