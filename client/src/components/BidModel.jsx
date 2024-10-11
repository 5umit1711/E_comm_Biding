import { Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlaceNewBid } from "../apicalls/products";
import { setLoader } from "../redux/loadSlicer";

const BidModel = ({ showBid, setShowBid, product, reloadData }) => {
  const formRef = useRef();
  const rules = [{ required: true, message: "Required" }];
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    values.product = product._id;
    values.buyer = user._id;
    values.seller = product.seller._id;
    try {
      dispatch(setLoader(true));
      const response = await PlaceNewBid(values);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        reloadData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    showBid && (
      <Modal
        open={showBid}
        onCancel={() => {
          setShowBid(!showBid);
        }}
        centered
        width={600}
        onOk={() => {
          formRef.current.submit();
          setShowBid(!showBid);
        }}
      >
        <div className="flex flex-col gap-3 mb-5">
          <h1 className="text-xl text-orange-900 text-center font-semibold">
            New Bid
          </h1>

          <Form layout="vertical" ref={formRef} onFinish={onFinish}>
            <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
              <Input />
            </Form.Item>
            <Form.Item label="Message" name="message" rules={rules}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Mobile No" name="mobileNo" rules={rules}>
              <Input type="number" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  );
};

export default BidModel;
