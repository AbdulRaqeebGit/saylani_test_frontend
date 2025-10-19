import React, { useState } from "react";

// Custom Icon Components for Eye/EyeSlash
const EyeIcon = (props) => (
  <svg {...props} className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);
const EyeSlashIcon = (props) => (
  <svg {...props} className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.79 5.86a8 8 0 0 1 12.35 6.13c-.01.51-.15.98-.38 1.41M16.42 16.42c-.52.28-1.09.52-1.69.7A10 10 0 0 1 2 12c3-7 10-7 10-7M4.47 4.47l15.06 15.06M9.5 12a2.5 2.5 0 0 0 2.5 2.5"/></svg>
);

/**
 * Reusable input component with optional password visibility toggle
 */
const Input = ({ label, type = "text", placeholder = "", value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  // Determine the actual input type
  const effectiveType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 mb-1 font-medium text-sm">{label}</label>}
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-300 transition duration-150">
        <input
          name={name}
          type={effectiveType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
        />
        {/* Password visibility toggle button */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="ml-2 text-gray-500 hover:text-indigo-600 transition"
            aria-label="toggle password visibility"
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;