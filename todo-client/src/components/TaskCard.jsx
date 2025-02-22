import axios from "axios";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formateDateTime } from "../utils/fomateDateTime";
import { RxCross1 } from "react-icons/rx";
import EditTask from "./EditTask";
import toast from "react-hot-toast";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, refetch }) => {
  const { _id, title, description, time, category } = task || {};
  const { formattedDate, formattedTime } = formateDateTime(time);
  // console.log(task);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://todo-task-pi-lyart.vercel.app/tasks/${id}`
      );

      if (data.deletedCount > 0) {
        refetch();
        toast.success("Successfully Deleted!");
      }
    } catch (error) {
      // console.log("Delete Task", error);
    }
  };

  // handle edit task

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEdit = async (id) => {
    const { data: task } = await axios.get(
      `https://todo-task-pi-lyart.vercel.app/tasks/${id}`
    );
    setIsEditModalOpen(true);
    // console.log(task);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: _id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white shadow-md rounded-lg p-2.5 border-l-4 border-gray-400"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 truncate">
            {title}
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
        <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
          <p> {formattedDate}</p>
          <p> {formattedTime}</p>
        </div>

        <div className="flex items-center justify-between mt-2.5">
          <button
            onClick={() => handleEdit(_id)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition duration-300 p-1 rounded  bg-gray-200 hover:cursor-pointer"
          >
            <FaEdit className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleDelete(_id)}
            className="flex items-center gap-1 text-red-700 hover:text-red-800 transition duration-300 p-1 rounded  bg-gray-200 hover:cursor-pointer"
          >
            <MdDelete className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* modal */}
      <EditTask
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        refetch={refetch}
        task={task}
      ></EditTask>
    </>
  );
};

export default TaskCard;
