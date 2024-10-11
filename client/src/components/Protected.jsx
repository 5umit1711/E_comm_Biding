import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/user";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      message.error("Please Login to continue");
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        <div className="flex justify-between items-center h-12 bg-green-700">
          <h1
            className="ml-2 text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            E-Commerce
          </h1>
          <div className="bg-slate-400 px-4 py-2 rounded-2xl flex gap-1 items-center">
            <FaUserAlt className="mr-1" />
            <span
              className="font-bold underline cursor-pointer uppercase"
              onClick={() => {
                if(user.role==='user'){
                  navigate("/profile");
                }else{
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>
            <IoLogOut
              className="ml-10"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            />
          </div>
        </div>
        {children}
      </div>
    )
  );
};

export default Protected;
