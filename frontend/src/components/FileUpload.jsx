import { useState } from "react";
import API from "../services/api";

function FileUpload() {

  const [file, setFile] = useState(null);

  const [uploadedFile, setUploadedFile] =
    useState("");

  const token =
    localStorage.getItem("token");

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

      setUploadedFile(
        `http://localhost:5002${res.data.filePath}`
      );

      alert("File Uploaded");

    } catch (error) {

      console.log(error);

      alert("Upload Failed");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-8">

      <h2 className="text-2xl font-bold mb-4">
        File Sharing
      </h2>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        className="mb-4"
      />

      <button
        onClick={uploadFile}
        className="bg-blue-500 px-4 py-2 rounded ml-2"
      >
        Upload
      </button>

      {uploadedFile && (
        <div className="mt-4">

          <p className="text-green-400">
            Uploaded Successfully
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