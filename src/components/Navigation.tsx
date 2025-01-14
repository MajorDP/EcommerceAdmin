import { Link, useNavigate } from "react-router-dom";
import "../globals.css";
import { checkSession, logout } from "../api/auth";

function Navigation() {
  const user = checkSession();
  const navigate = useNavigate();
  return (
    <section className="border-r border-black h-screen bg-gradient-to-b from-slate-500 to-slate-600 flex flex-col">
      <div className="text-center mt-5">
        <p className="font-semibold">Admin: {user.username}</p>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className=" bg-red-500 p-1 rounded-md shadow-xl hover:bg-red-800 hover:text-white duration-300 ease-in-out mt-2"
        >
          Log out
        </button>
      </div>
      <ul className="p-5 mt-[5rem] text-2xl flex flex-col space-y-4">
        <li className="underline-animation text-slate-800 font-semibold bg-transparent bg-clip-text">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="underline-animation text-slate-800 font-semibold bg-transparent bg-clip-text">
          <Link to="/products">Products</Link>
        </li>
        <li className="underline-animation text-slate-800 font-semibold bg-transparent bg-clip-text">
          <Link to="/lowstocks">Low stock</Link>
        </li>
        <li className="underline-animation text-slate-800 font-semibold bg-transparent bg-clip-text">
          <Link to="/orders">Orders</Link>
        </li>
        <li className="underline-animation text-slate-800 font-semibold bg-transparent bg-clip-text">
          <Link to="/statistics">Satistics</Link>
        </li>
        <li className="underline-animation text-slate-800 font-semibold bg-transparent bg-clip-text">
          <Link to="/activity">Activity</Link>
        </li>
      </ul>
    </section>
  );
}

export default Navigation;
