import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadSlicer";
import { Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllBids, GetProductById } from "../apicalls/products";
import moment from "moment";
import BidModel from "./BidModel";

const ProductInfo = () => {
  const user = useSelector(state => state.user.user);
  const [showBid, setShowBid] = useState(false);
  const [bids, setBids] = useState([]);
  const [product, setProduct] = useState(null);
  const [imageIdx, setImageIdx] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await GetProductById(id);
      const res = await GetAllBids({product: id});
      console.log(res)
      dispatch(setLoader(false));
      if (response.success) {
        setProduct(response.data);
        setBids(res.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData(id);
  }, []);

  return (
    product && (
      <div>
        <div className=" m-1 mr-2 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-5">
            <img
              src={product.images[imageIdx]}
              alt=""
              className="w-full h-96 object-cover rounded-md border-solid border-slate-600"
            />
            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      imageIdx === index
                        ? "w-24 h-24 object-cover cursor-pointer  rounded-md border-4 p-1 border-slate-500 border-dashed"
                        : "w-24 h-24 object-cover cursor-pointer rounded-md"
                    }
                    src={image}
                    onClick={() => setImageIdx(index)}
                  />
                );
              })}
            </div>
            <div className="w-full h-[1px] bg-slate-800 mb-1"></div>
            <div>
              <h1 className="text-xl text-slate-600">Added On</h1>
              <span>{moment(product.createdAt).format("MMM D, YYYY")}</span>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-2 mr-1">
            <div>
              <h1 className="text-xl text-orange-900 font-semibold">
                {product.name}
              </h1>
              <span className="text-lg">{product.description}</span>
            </div>
            <div className="w-full h-[1px] bg-slate-800 mb-1"></div>
            <div className="flext flex-col">
              <h1 className="text-xl text-orange-900 font-semibold">
                Product Details
              </h1>
              <div className="flex justify-between text-lg mt-2">
                <span>Price</span>
                <span>₹ {product.price}</span>
              </div>
              <div className="flex justify-between text-lg mt-2">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between text-lg mt-2">
                <span>Bill Available</span>
                <span>{product.billAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between text-lg mt-2">
                <span>Box Available</span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between text-lg mt-2">
                <span>Accessories Available</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between text-lg mt-2">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
            </div>
            <div className="w-full h-[1px] bg-slate-800 mb-1"></div>

            <div className="flex flex-col">
              <h1 className="text-xl text-orange-900 font-semibold">
                Owner Details
              </h1>
              <div className="flex justify-between text-lg mt-2">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between text-lg mt-2">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
            </div>
            <div className="w-full h-[1px] bg-slate-800 mb-1"></div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <h1 className="text-xl font-semibold text-orange-900">Bids</h1>
                <Button
                  className="bg-slate-400"
                  onClick={() => {
                    setShowBid(!showBid);
                  }}
                  disabled = {user._id === product.seller._id}
                >
                  New Bid
                </Button>
              </div>

              {product.showBidsOnProductPage && bids.length > 0 && bids.map((bid)=>{
                return <div className="border border-solid p-2 rounded border-gray-800">
                    <div className="flex justify-between text-gray-900 m-1">
                      <span>Name</span>
                      <span>{bid.buyer.name}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 m-1">
                      <span>Bid Amount</span>
                      <span>₹ {bid.bidAmount}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 m-1">
                      <span>Bid Placed On</span>
                      <span>{moment(bid.createdAt).format("MMM DD YYYY")}</span>
                    </div>
                </div>
              })} 
            </div>
          </div>
        </div>
        {showBid && (
          <BidModel
            showBid={showBid}
            setShowBid={setShowBid}
            product={product}
            reloadData={getData}
          />
        )}
      </div>
    )
  );
};

export default ProductInfo;
