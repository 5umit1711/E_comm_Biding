import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadSlicer";
import { GetAllBids } from "../apicalls/products";
import moment from "moment";

const UserBids = () => {
  const user = useSelector(state => state.user.user)
  const [bidData, setBidData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllBids({ buyer: user._id });
      dispatch(setLoader(false));
      if (response.success) {
        setBidData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (text, record) => {
        return record.product.name;
      },
    },
    {
        title: "Seller",
        dataIndex: "seller",
        render: (text, record) => {
          return record.seller.name;
        },
      },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Date",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("MMMM DD YYYY");
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Email: {record.seller.email}</p>
          </div>
        );
      },
    },
  ];

  return (
      <div className="flex gap-2 flex-col">
        <Table columns={columns} dataSource={bidData} className="mr-1 mt-8" />
      </div>
  );
};

export default UserBids;
