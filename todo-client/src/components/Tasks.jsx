import { FaPlus } from "react-icons/fa";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

//
const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddTask = () => {
    setIsModalOpen(!isModalOpen);
  };
  // fetch data
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/tasks");
      return response.data;
    },
  });

  //   console.log(tasks.length);

  const todoTasks = tasks.filter((task) => task.category === "To-Do");
  const inProgressTasks = tasks.filter(
    (task) => task.category === "In Progress"
  );
  const doneTasks = tasks.filter((task) => task.category === "Done");

  return (
    <div className="max-w-5xl mx-auto bg">
      <div className="flex items-center justify-between p-4">
        <h3 className=" font-bold">Task Board: {tasks.length}</h3>
        <button
          onClick={handleAddTask}
          className="flex items-center justify-center  px-3.5 py-1.5 gap-2 bg-purple-500 rounded-full text-white  hover:bg-purple-600 transition duration-300 hover:cursor-pointer"
        >
          <FaPlus /> <p className="font-semibold">Add Task</p>
        </button>
      </div>
      {/* Add Task */}
      <AddTaskForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        refetch={refetch}
      />
      {/* task column */}
      <section className="  grid grid-cols-1 sm:grid-cols-3 mx-auto gap-4 min-h-screen p-2">
        <div className=" h-full p-3.5 bg-gray-200/60 rounded-md ">
          <h2 className="font-semibold text-xl mb-4">To do</h2>
          <div className="space-y-2.5">
            {todoTasks.length > 0 ? (
              todoTasks.map((task) => (
                <TaskCard key={task._id} task={task} refetch={refetch} />
              ))
            ) : (
              <p className="text-center text-gray-500">No Task Available</p>
            )}
          </div>
        </div>
        <div className=" h-full p-3.5 bg-gray-200/60 rounded-md">
          <h2 className="font-semibold text-xl mb-4">In Progress</h2>
          <div className="space-y-2.5">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map((task) => (
                <TaskCard key={task._id} task={task} refetch={refetch} />
              ))
            ) : (
              <p className="text-center text-gray-500">No Task Available</p>
            )}
          </div>
        </div>
        <div className=" h-full p-3.5 bg-gray-200/60 rounded-md">
          <h2 className="font-semibold text-xl mb-4">Done</h2>
          <div className="space-y-2.5">
            {doneTasks.length > 0 ? (
              doneTasks.map((task) => (
                <TaskCard key={task._id} task={task} refetch={refetch} />
              ))
            ) : (
              <p className="text-center text-gray-500">No Task Available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tasks;
