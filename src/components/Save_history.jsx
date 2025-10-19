import React from 'react';

const Save_history = () => {
  return (
    // Sidebar for history (1/4 width)
    <div className="w-1/4 h-full overflow-y-auto border-r border-gray-300 bg-white">
      <h1 className="p-4 font-bold text-lg border-b border-gray-200">History</h1>
      <div className="p-2">
        {/* History items yahan add karenge */}
        <p className="text-gray-500">No history yet</p>
      </div>
    </div>
  );
};

export default Save_history;