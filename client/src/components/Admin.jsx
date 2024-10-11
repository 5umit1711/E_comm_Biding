import React, { useEffect } from "react";
import { Tabs } from "antd";
import AdminProducts from "./AdminProducts";
import UsersAdmin from "./UsersAdmin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = ()=>{
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user);
    useEffect(()=>{
        if(user.role!=="admin"){
            navigate('/');
        }
    }, []);

    return <div>
        <Tabs className="ml-1 mr-1">
            <Tabs.TabPane tab="Products" key="1">
                <AdminProducts/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Users" key="2">
                <UsersAdmin/>
            </Tabs.TabPane>
        </Tabs>
    </div>
}

export default Admin;
