import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../apicalls/user";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadSlicer";


const rules = [
    {
      required: true,
      message: "Required",
    },
  ];

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (values)=>{
      try{
        dispatch(setLoader(true));
        console.log(values)
        const response = await LoginUser(values);
        dispatch(setLoader(false));
        if(response.success){
          message.success(response.message);
          localStorage.setItem("token", response.data);
          window.location.href = "/";
        }
        else{
          throw new Error(response.message);
        }
      }
      catch(error){
        dispatch(setLoader(false));
        message.error(error.message);
    }
  }


  return (
    <div className="h-screen bg-slate-600 flex justify-center items-center">
      <div className="bg-red-300 p-5 w-[450px] rounded-lg">
        <h1 className="text-black mb-3 text-2xl">LOGIN</h1>
        <div className="w-full h-[1px] bg-slate-800 mb-2"></div>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <span className="text-black">
            Create a new Account
            <Link to="/register" className="m-2 text-slate-900">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
