import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import API from "../services/api";

const socket = io("http://localhost:5002");

function ChatBox({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const name = localStorage.getItem("name");
  const chatRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/messages");

      if (!selectedUser) {
        setMessages(
          res.data.filter(
            (msg) => msg.chatType === "group"
          )
        );
      } else {
        setMessages(
          res.data.filter(
            (msg) =>
              msg.chatType === "private" &&
              (
                (msg.sender === name &&
                  msg.receiver === selectedUser) ||
                (msg.sender === selectedUser &&
                  msg.receiver === name)
              )
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    socket.emit("registerUser", name);

    fetchMessages();

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      sender: name,
      receiver: selectedUser,
      text,
      chatType: selectedUser
        ? "private"
        : "group",
    });

    setText("");
  };

  return (
    <div className="bg-gray-800 rounded p-4">

      <h2 className="text-2xl font-bold mb-4">
        {selectedUser
          ? `Chat with ${selectedUser}`
          : "Group Chat"}
      </h2>

      <div
        ref={chatRef}
        className="bg-gray-700 h-80 overflow-y-auto border border-gray-600 rounded p-3 mb-4"
      >

        {messages.map((msg) => (
          <div key={msg._id} className="mb-4">

            <div>
              <span className="font-bold text-green-400">
                {msg.sender}
              </span>

              <span className="ml-2">
                {msg.text}
              </span>
            </div>
            
            {msg.fileUrl && (
              <div className="ml-2">
                <a
                  href={`http://localhost:5002${msg.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline"
                >
                  {msg.fileName}
                </a>
              </div>
            )}

            {msg.createdAt && (
              <div className="text-xs text-gray-400 ml-2">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            )}

          </div>
        ))}

      </div>

      <div className="flex gap-2">

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 px-5 py-3 rounded-lg hover:bg-green-600"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatBox;