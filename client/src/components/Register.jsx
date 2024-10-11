import React, {useEffect} from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../apicalls/user";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadSlicer";

const rules = [
  {
    required: true,
    message: "Required",
  },
];

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (values) => {
    try{
      dispatch(setLoader(true));
      const response = await RegisterUser(values);
      dispatch(setLoader(false));
      if(response.success){
        message.success(response.message);
        navigate("/login");
      }
      else{
        throw new Error(response.message);
      }
    }
    catch(error){
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen bg-slate-600 flex justify-center items-center">
      <div className="bg-red-300 p-5 w-[450px] rounded-lg">
        <h1 className="text-black mb-3 text-2xl">REGISTER</h1>
        <div className="w-full h-[1px] bg-slate-800 mb-2"></div>
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <span className="text-black">
            Already have an account
            <Link to="/login" className="m-2 text-slate-900">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
