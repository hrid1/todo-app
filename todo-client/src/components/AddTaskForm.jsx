// react icons
import axios from "axios";
import { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { validateFrom } from "../utils/validation";
import { AuthContext } from "../provider/AuthProvider";

const AddTaskForm = ({ isModalOpen, setIsModalOpen, refetch }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  console.log(user.email);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "To-Do",
    owner: user?.email,
    time: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateFrom(taskData)) return;

    // console.log("TaskData ", taskData);

    // send it to server
    const { data } = await axios.post("https://todo-task-pi-lyart.vercel.app/tasks", taskData);

    try {
      // Reset form
      setTaskData({
        title: "",
        description: "",
        category: "To-Do",
        owner: user?.email,
        time: new Date().toISOString(),
      });
      setIsLoading(false);
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${
        isModalOpen ? " visible" : " invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
    >
      <div
        className={`${
          isModalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
        }  bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
      >
        <RxCross1
          className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer right-0 absolute"
          onClick={() => setIsModalOpen(false)}
        />
        <div className="w-full flex flex- items-end p-4 justify-between border-b border-[#d1d1d1]">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label
                className="text-[1rem] font-[500] text-[#464646]"
                htmlFor="title"
              >
                Title (max 50 characters)
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                maxLength="50"
                required
                className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-purple-500"
              />
            </div>

            <div>
              <label
                className="text-[1rem] font-[500] text-[#464646]"
                htmlFor="description"
              >
                Description (max 200 characters)
              </label>
              <textarea
                id="description"
                name="description"
                value={taskData.description}
                onChange={handleChange}
                maxLength="200"
                className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-purple-500"
                rows="3"
              />
            </div>

            <div>
              <label
                className="text-[1rem] font-[500] text-[#464646]"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={taskData.category}
                onChange={handleChange}
                className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-purple-500"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-4 w-full bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300 hover:cursor-pointer"
            >
              {isLoading ? "Adding" : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
