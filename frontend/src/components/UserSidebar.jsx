import { useEffect, useState } from "react";
import API from "../services/api";

function UserSidebar({
  selectedUser,
  setSelectedUser,
}) {
  const [users, setUsers] = useState([]);

  const currentUser = localStorage.getItem("name");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");

      const filteredUsers =
        res.data.filter(
          (user) =>
            user.name !== currentUser
        );

      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div className="w-72 bg-gray-800 rounded-lg p-4">

      <h2 className="text-xl font-bold mb-4">
        Users
      </h2>

      <button
        onClick={() =>
          setSelectedUser(null)
        }
        className={`w-full text-left p-3 rounded mb-2 ${
          selectedUser === null
            ? "bg-green-500"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
      >
        Group Chat
      </button>

      {users.map((user) => (
        <button
          key={user._id}
          onClick={() =>
            setSelectedUser(user.name)
          }
          className={`w-full text-left p-3 rounded mb-2 ${
            selectedUser === user.name
              ? "bg-green-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {user.name}
        </button>
      ))}
    </div>
  );
}

export default UserSidebar;