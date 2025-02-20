import React from "react";
// title, description, timestamp, category
const TaskCard = ({ task }) => {
  const { title, description, timestamp, category } = task || {};
  return (
    <div className="bg-white shadow-md rounded-lg p-2.5 border-l-4 border-blue-400">
      <h3 className="text-xl font-semibold text-gray-800 truncate">
        {title} boss
      </h3>
      <p className="text-gray-600 text-sm mt-1 line-clamp-3">
        {description || "No description provided."}
      </p>
      <div className="text-xs text-gray-500 mt-2">{timestamp} hi</div>

      {/* indicator */}
      <span
        className={`inline-block mt-3 p-1 text-sm font-medium text-white rounded-full ${
          category === "To-Do"
            ? "bg-yellow-500"
            : category === "In Progress"
            ? "bg-blue-500"
            : "bg-green-500"
        }`}
      >
        
      </span>
    </div>
  );
};

export default TaskCard;
