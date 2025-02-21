import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

const TaskColumn = ({ id, title, tasks, setTaskState, refetch }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="h-full p-3.5 bg-gray-200/60 rounded-md">
      <h2 className="font-semibold text-xl mb-4">{title}</h2>
      <SortableContext items={tasks.map((task) => task._id)}>
        <div className="space-y-2.5">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <SortableTask
                key={task._id}
                task={task}
                setTaskState={setTaskState}
                columnId={id}
                refetch={refetch}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No Task Available</p>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

// Sortable Task Component (Wraps TaskCard)
const SortableTask = ({ task, refetch }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <TaskCard task={task} refetch={refetch} />
    </div>
  );
};

export default TaskColumn;
