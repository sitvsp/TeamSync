import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import API from "../services/api";

const socket = io("http://localhost:5002");

function ChatBox() {

  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  const name =
    localStorage.getItem("name");

  useEffect(() => {

    fetchMessages();

    socket.on(
      "receiveMessage",
      (message) => {

        setMessages((prev) => [
          ...prev,
          message,
        ]);

      }
    );

    return () => {
      socket.off("receiveMessage");
    };

  }, []);

  const fetchMessages = async () => {

    try {

      const res =
        await API.get("/messages");

      setMessages(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  const sendMessage = () => {

    if (!text.trim()) return;

    socket.emit("sendMessage", {
      sender: name,
      text,
    });

    setText("");

  };

  return (
    <div className="bg-gray-800 rounded p-4 mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Team Chat
      </h2>

      <div className="h-80 overflow-y-auto border border-gray-600 rounded p-3 mb-4">

        {messages.map((msg) => (

          <div
            key={msg._id || Math.random()}
            className="mb-3"
          >
            <span className="font-bold text-green-400">
              {msg.sender}
            </span>

            <span>
              {" "}
              : {msg.text}
            </span>

          </div>

        ))}

      </div>

      <div className="flex gap-2">

        <input
          type="text"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Type message..."
          className="flex-1 p-3 rounded text-black"
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 px-4 rounded"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatBox;