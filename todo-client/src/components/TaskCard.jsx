import axios from "axios";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// title, description, timestamp, category
const TaskCard = ({ task, refetch }) => {
  const { _id, title, description, timestamp, category } = task || {};

  const handleDelete = async (id) => {
    console.log("Delete this", id);
    const { data } = await axios.delete(`http://localhost:5000/tasks/${id}`);
    refetch();
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-2.5 border-l-4 border-blue-400">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {title} boss
        </h3>
        <span
          className={`inline-block mb-4 p-1 text-sm font-medium text-white rounded-full ${
            category === "To-Do"
              ? "bg-yellow-500"
              : category === "In Progress"
              ? "bg-blue-500"
              : "bg-green-500"
          }`}
        ></span>
      </div>
      <p className="text-gray-600 text-sm mt-1 line-clamp-3">
        {description || "No description provided."}
      </p>
      <div className="text-xs text-gray-500 mt-2">{timestamp}</div>

      {/* indicator */}
      <div className="flex items-center justify-between mt-2.5">
        <FaEdit className="hover:cursor-pointer text-gray-600" />
        <MdDelete
          onClick={() => handleDelete(_id)}
          className="hover:cursor-pointer text-gray-800"
        />
      </div>
    </div>
  );
};

export default TaskCard;
