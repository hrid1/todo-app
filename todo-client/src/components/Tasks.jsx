import { FaPlus } from "react-icons/fa";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  closestCorners,
  DndContext,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

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

  // Group tasks by category
  const [taskState, setTaskState] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    if (tasks.length > 0) {
      setTaskState({
        todo: tasks.filter((task) => task.category === "To-Do"),
        inProgress: tasks.filter((task) => task.category === "In Progress"),
        done: tasks.filter((task) => task.category === "Done"),
      });
    }
  }, [tasks]); // Runs when `tasks` updates

  console.log(tasks);
  console.log(taskState);

  // handle dragable
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const sourceColumn = active.data.current.sortable.containerId;
    const targetColumn = over.data.current?.sortable.containerId;

    if (!sourceCategory || !targetCategory || sourceCategory === targetCategory)
      return;
    // Find the dragged task
    const movedTask = taskState[sourceCategory].find(
      (task) => task._id === activeId
    );
    // Update state
    setTaskState((prev) => ({
      ...prev,
      [sourceCategory]: prev[sourceCategory].filter(
        (task) => task._id !== activeId
      ),
      [targetCategory]: [
        ...prev[targetCategory],
        { ...movedTask, category: targetCategory },
      ],
    }));
  };
  return (
    <div className="max-w-6xl mx-auto bg">
      <div className="flex items-center justify-between p-4">
        <h3 className=" font-bold text-xl">My Task Board: {tasks.length}</h3>
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
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <section className="  grid grid-cols-1 sm:grid-cols-3 mx-auto gap-4 md:gap-6 min-h-screen p-2">
          <div className=" h-full p-3.5 bg-gray-200/60 rounded-md ">
            <h2 className="font-semibold text-xl mb-4">To do</h2>
            <div className="space-y-2.5">
              {taskState?.todo?.length > 0 ? (
                taskState?.todo?.map((task) => (
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
              {taskState.inProgress.length > 0 ? (
                taskState.inProgress.map((task) => (
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
              {taskState.done.length > 0 ? (
                taskState.done.map((task) => (
                  <TaskCard key={task._id} task={task} refetch={refetch} />
                ))
              ) : (
                <p className="text-center text-gray-500">No Task Available</p>
              )}
            </div>
          </div>
        </section>
      </DndContext>
    </div>
  );
};

export default Tasks;
