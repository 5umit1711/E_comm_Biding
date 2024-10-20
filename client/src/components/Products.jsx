import { Button, Table, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadSlicer";
import { deleteProduct, getProducts } from "../apicalls/products";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Bids from "./Bids";


const Products = () => {
  const [showBid, setShowBid] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const getdata = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getProducts({seller: user._id});
      console.log(response.products);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const deleteproduct = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await deleteProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getdata();
      } else {
        message.error(response.message);
      }
    } catch (error) {
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
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY  hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-4 items-center">
            <FaEdit
              className="cursor-pointer"
              size={18}
              onClick={() => {
                setSelectedProduct(record);
                setShowForm(true);
              }}
            />
            <MdDelete
              className="cursor-pointer"
              size={18}
              onClick={() => deleteproduct(record._id)}
            />
            <span className="underline cursor-pointer" onClick={() => {
              setShowBid(true)
              setSelectedProduct(record)
            }}>
              Show Bids
            </span>
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
      <div className="flex justify-end m-2">
        <Button
          type="default"
          className="bg-slate-300"
          onClick={() => {
            setShowForm(true);
            setSelectedProduct(null);
          }}
        >
          Add Products
        </Button>
      </div>

      <Table columns={columns} dataSource={products} className="mr-1" />

      {showForm && (
        <ProductForm
          showForm={showForm}
          setShowForm={setShowForm}
          selectedProduct={selectedProduct}
          getData={getdata}
        />
      )}

      {showBid && (
        <Bids
          showBid={showBid}
          setShowBid={setShowBid}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
