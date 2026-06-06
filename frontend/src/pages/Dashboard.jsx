import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api.js";

import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import ChatBox from "../components/ChatBox";
import FileUpload from "../components/FileUpload";

function Dashboard() {
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const [title, setTitle] =
    useState("");

  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const res = await API.get(
        "/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

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

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-900 text-white p-8">

        <div className="bg-gray-800 p-6 rounded-lg">

          <h2 className="text-2xl font-bold mb-4">
            Task Manager
          </h2>

          <form
            onSubmit={createTask}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Enter Task..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="flex-1 p-3 rounded text-black"
            />

            <button
              className="bg-green-500 px-5 rounded"
            >
              Add Task
            </button>
          </form>

          <TaskList
            tasks={tasks}
            getTasks={getTasks}
          />
        </div>

        <ChatBox />

        <FileUpload />

      </div>
    </>
  );
}

export default Dashboard;