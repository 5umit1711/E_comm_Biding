import { Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadSlicer";
import { GetAllBids } from "../apicalls/products";
import moment from "moment";

const Bids = ({ showBid, setShowBid, selectedProduct }) => {
  const [bidData, setBidData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllBids({ product: selectedProduct._id });
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
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.buyer.name;
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
            <p>Phone: {record.mobileNo}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      title="Bids"
      className="text-center"
      open={showBid}
      onCancel={() => setShowBid(false)}
      centered
      width={1000}
      footer = {null}
    >
      <div className="flex gap-2 flex-col">
        <div className="w-full h-[1px] bg-slate-800 mb-2"></div>
        <h1 className="text-xl text-center">
          Product name: {selectedProduct.name}
        </h1>

        <Table columns={columns} dataSource={bidData} />
      </div>
    </Modal>
  );
};

export default Bids;
