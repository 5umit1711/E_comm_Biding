import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import UserBids from "./UserBIds";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      <Tabs defaultActiveKey="1" className="ml-1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Your Bids" key="2">
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="flex flex-col gap-2 w-1/3 ml-5 text-green-700">
            <div className="flex justify-between text-3xl">
              <span>Name : </span>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between text-3xl">
              <span>Email : </span>
              <span>{user.email}</span>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
