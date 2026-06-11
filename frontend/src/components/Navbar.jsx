import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const name = localStorage.getItem("name");

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (
    <div className="bg-black p-5 flex justify-between items-center">

      <h1 className="text-3xl font-bold text-green-400">
        TeamSync
      </h1>

      <div className="flex items-center gap-4">

        <span>
          Welcome, {name}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;