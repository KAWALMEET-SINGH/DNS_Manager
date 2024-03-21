import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/slices/user.slice.js";
import {
  fetchDomainsStart,
  fetchDomainsFailure,
  fetchDomainsSuccess,
} from "../redux/slices/domain.slice.js";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(fetchDomainsStart());


    if (!searchTerm) {
      return;
    }

    try {
      const res = await fetch(`/api/domain/filter?domainName=${searchTerm}`,{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(fetchDomainsFailure(data.message));
        return;
      }
      dispatch(fetchDomainsSuccess(data));

    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch("api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <header
      className={`bg-blue-300 shadow-md flex justify-evenly items-center    p-4`}
    >
      <form
        className={`bg-blue-100 p-2 rounded-lg flex justify-center items-center`}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className={`bg-transparent text-left focus:outline-none w-24 sm:w-64 md:w-41`}
        />
        <button onClick={handleSearch}>
          <FaSearch className={`color-blue-500`} />
        </button>
      </form>
      {currentUser && (
        <button
          onClick={handleLogout}
          className={`bg-red-700 rounded-lg text-white font-semibold  focus:outline-none w-14 sm:w-44 md:w-31 p-2  `}
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
