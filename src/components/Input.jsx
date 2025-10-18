import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = ({ type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-80">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="focus:outline-none w-full text-gray-700"
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  );
};

export default Input;
