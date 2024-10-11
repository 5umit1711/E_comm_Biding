import { Button, Table, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadSlicer";
import { getProducts, updateStatus } from "../apicalls/products";
import { GetAllUsers, UpdateUserStatus } from "../apicalls/user";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getdata = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllUsers();
      dispatch(setLoader(false));
      if (response.success) {
        setUsers(response.users);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try{
      dispatch(setLoader(true));
      const response = await UpdateUserStatus(id, {status});
      dispatch(setLoader(false));
      if(response.success){
        message.success(response.message);
        getdata();
      }else{
        throw new Error(response.message);
      }
    }catch(error){
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record)=>{
        return record.role.toUpperCase();
      }
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY  hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record)=>{
        return record.status.toUpperCase();
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-4">
            {status === "active" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                BLOCK
              </span>
            )}
            {status === "blocked" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "active")}
              >
                UNBLOCK
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={users} className="mt-2" />
    </div>
  );
};

export default UsersAdmin;
