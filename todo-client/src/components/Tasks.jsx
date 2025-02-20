import { FaPlus } from "react-icons/fa";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import { useState } from "react";

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddTask = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="max-w-5xl mx-auto bg">
      <div className="flex items-center justify-between p-4">
        <h3 className=" font-bold">Task Board</h3>
        <button
          onClick={handleAddTask}
          className="flex items-center justify-center  px-3.5 py-1.5 gap-2 bg-purple-500 rounded-full text-white  hover:bg-purple-600 transition duration-300 hover:cursor-pointer"
        >
          <FaPlus /> <p className="font-semibold">Add Task</p>
        </button>
      </div>
      {/*  */}
      <AddTaskForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      {/* task column */}
      <section className="  grid grid-cols-1 sm:grid-cols-3 mx-auto gap-4 min-h-screen p-2">
        <div className=" h-full p-3.5 bg-gray-200/60 rounded-md">
          <h2 className="font-semibold text-xl m-2">To do</h2>

          <TaskCard />
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
        </div>
        <div className="border">
          2<h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
        </div>
        <div>
          3<h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
          <h2>hello</h2>
        </div>
      </section>
    </div>
  );
};

export default Tasks;
