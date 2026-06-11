import { useRef, useState } from "react";
import { io } from "socket.io-client";
import API from "../services/api";

const socket = io("http://localhost:5002");

function FileUpload({ selectedUser }) {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState("");

  const inputRef = useRef(null);

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await API.post(
        "/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      const fileUrl = res.data.filePath;

      setUploadedFile( `http://localhost:5002${fileUrl}`);

      socket.emit("sendMessage", {
        sender: name,
        receiver: selectedUser,
        fileUrl,
        fileName: file.name,
        chatType: selectedUser
          ? "private"
          : "group",
      });

      alert("File Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Share File
      </h2>

      <div className="flex items-center gap-4 mb-4">

        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={() =>
            inputRef.current.click()
          }
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Choose File
        </button>

        <span className="text-gray-300 text-sm">
          {file
            ? file.name
            : "No file chosen"}
        </span>

        {file && (
          <button
            onClick={removeFile}
            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-sm"
          >
            Remove
          </button>
        )}

      </div>

      <button
        onClick={uploadFile}
        className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Upload
      </button>

      {uploadedFile && (
        <div className="mt-4">

          <p className="text-green-400">
            File Uploaded Successfully
          </p>

          <a
            href={uploadedFile}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            Open File
          </a>

        </div>
      )}

    </div>
  );
}

export default FileUpload;