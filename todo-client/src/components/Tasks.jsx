import { FaPlus } from "react-icons/fa";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Spiner from "./Spiner";
import { AuthContext } from "../provider/AuthProvider";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddTask = () => setIsModalOpen(!isModalOpen);

  // Fetch tasks from API
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", email],
    queryFn: async () => {
      const response = await axios.get(
        "https://todo-task-pi-lyart.vercel.app/tasks",
        {
          params: { email },
        }
      );
      return response.data;
    },
  });

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
  }, [tasks]);

  // handle drag and drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    let sourceCategory, targetCategory;

    Object.entries(taskState).forEach(([category, tasks]) => {
      if (tasks.some((task) => task._id === activeId)) {
        sourceCategory = category;
      }
      if (tasks.some((task) => task._id === overId)) {
        targetCategory = category;
      }
    });

    // Fix: If dropping into an empty category
    if (!targetCategory) {
      targetCategory = overId; // Assigning `overId` as the targetCategory
    }

    if (!sourceCategory || !targetCategory) return;

    setTaskState((prev) => {
      let updatedState = { ...prev };

      if (sourceCategory === targetCategory) {
        // Moving within the same category
        const oldIndex = prev[sourceCategory].findIndex(
          (task) => task._id === activeId
        );
        const newIndex = prev[sourceCategory].findIndex(
          (task) => task._id === overId
        );

        updatedState[sourceCategory] = arrayMove(
          prev[sourceCategory],
          oldIndex,
          newIndex
        );
      } else {
        // Moving to a different category
        const movedTask = prev[sourceCategory].find(
          (task) => task._id === activeId
        );

        updatedState[sourceCategory] = prev[sourceCategory].filter(
          (task) => task._id !== activeId
        );

        // Ensure the target category exists before adding a task
        updatedState[targetCategory] = [
          { ...movedTask, category: targetCategory },
          ...(prev[targetCategory] || []), // Ensuring an array exists
        ];
      }

      return updatedState;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor)
  );

  if (isLoading) return <Spiner />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between p-4">
        <h3 className="font-bold text-xl">My Task Board: </h3>
        <button
          onClick={handleAddTask}
          className="flex items-center px-3.5 py-1.5 gap-2 bg-purple-500 rounded-full text-white hover:bg-purple-600 hover:cursor-pointer transition "
        >
          <FaPlus /> <p className="font-semibold">Add Task</p>
        </button>
      </div>

      <AddTaskForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        refetch={refetch}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
          <SortableContext
            items={taskState.todo.map((t) => t._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="h-full p-3.5 bg-gray-200/60 rounded-md">
              <h2 className="font-semibold text-xl mb-4">To Do 🆕</h2>
              <div className="space-y-2.5">
                {taskState.todo.length > 0 ? (
                  taskState.todo.map((task) => (
                    <TaskCard key={task._id} task={task} refetch={refetch} />
                  ))
                ) : (
                  <p className="text-center text-gray-500">No Task Available</p>
                )}
              </div>
            </div>
          </SortableContext>

          <SortableContext
            items={taskState.inProgress.map((t) => t._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="h-full p-3.5 bg-gray-200/60 rounded-md">
              <h2 className="font-semibold text-xl mb-4">In Progress ⌛</h2>
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
          </SortableContext>

          <SortableContext
            items={taskState.done.map((t) => t._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="h-full p-3.5 bg-gray-200/60 rounded-md">
              <h2 className="font-semibold text-xl mb-4">Done ✅</h2>
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
          </SortableContext>
        </section>
      </DndContext>
    </div>
  );
};

export default Tasks;
