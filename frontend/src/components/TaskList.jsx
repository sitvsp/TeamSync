import API from "../services/api";

function TaskList({
  tasks,
  getTasks,
}) {

  const token =
    localStorage.getItem("token");

  const updateTask = async (
    id,
    currentStatus
  ) => {
    try {
      const newStatus =
        currentStatus === "Pending"
          ? "Completed"
          : "Pending";

      await API.put(
        `/tasks/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(
        `/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-gray-800 p-4 rounded mb-3 flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">
              {task.title}
            </h3>

            <p
              className={
                task.status ===
                "Completed"
                  ? "text-green-400"
                  : "text-yellow-400"
              }
            >
              {task.status}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                updateTask(
                  task._id,
                  task.status
                )
              }
              className="bg-blue-500 px-3 py-1 rounded"
            >
              Toggle
            </button>

            <button
              onClick={() =>
                deleteTask(task._id)
              }
              className="bg-red-500 px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;