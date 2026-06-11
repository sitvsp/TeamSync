import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import FileUpload from "../components/FileUpload";
import UserSidebar from "../components/UserSidebar";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const name = localStorage.getItem("name");

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-900 text-white px-6 pb-6">

        <h1 className="text-xl mb-6">
          Hello {name}
        </h1>


        <div className="flex gap-6">

          <UserSidebar
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />

          <div className="flex-1">

            <ChatBox
              selectedUser={selectedUser}
            />

            <FileUpload
              selectedUser={selectedUser}
            />

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;