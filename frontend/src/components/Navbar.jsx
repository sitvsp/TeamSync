const [message, setMessage] = useState("");

const createTask = async (e) => {
  e.preventDefault();

  if (!title.trim()) {
    setMessage("Task cannot be empty");
    return;
  }

  try {
    await API.post(
      "/tasks",
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    setMessage("Task added successfully");

    getTasks();
  } catch (error) {
    setMessage(
      error.response?.data?.message ||
      "Failed to add task"
    );

    console.log(error);
  }
};