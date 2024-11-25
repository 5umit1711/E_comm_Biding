import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadSlicer";
import { message } from "antd";
import { getProducts } from "../apicalls/products";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import { ImEqualizer } from "react-icons/im";
import { FaSearch } from "react-icons/fa";


const Home = () => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    seller: user._id,
    excludeSeller: true,
    status: "approved",
    category: '',
    age: '',
    search: '',
  });

  const handleSearch = async()=>{
    setFilters({...filters, search: search})
    getData();
  }

  
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getProducts(filters);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters, dispatch]);

  return (
    <div className="flex gap-2">
      {showFilters && (
        <Filters
          setShowFilters={setShowFilters}
          showFilters={showFilters}
          setFilters={setFilters}
          filters={filters}
          getData={getData}
        />
      )}
      <div className="flex flex-col gap-3 w-full mr-2">
        <div className="flex gap-3 items-center">
          {!showFilters && (
            <ImEqualizer
              className="ml-2 cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            />
          )}
          <input
            type="text"
            value={search}
            placeholder="Search the product"
            className="mt-2 ml-2 border border-gray-500 border-solid rounded w-full p-2 h-14"
            onChange={(e)=>setSearch(e.target.value)}
          />
          <FaSearch size={20} className="cursor-pointer" onClick={handleSearch}/>
        </div>
        <div
          className={`grid mt-2 ml-2 ${
            showFilters ? "grid-cols-3 gap-2" : "grid-cols-4 gap-4"
          }`}
        >
          {products.map((product) => {
            return (
              <div
                className="border border-gray-500 rounded border-solid flex flex-col gap-0 cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img src={product.images[0]} className="w-full h-44 p-2" />

                <div className="px-2 bg-slate-100 flex flex-col gap-1">
                  <h1 className="text-lg font-semibold">{product.name}</h1>
                  <p className="text-sm">{product.description}</p>
                  <div className="w-full h-[1px] bg-slate-800"></div>
                  <span className="text-xl font-semibold text-green-500">
                    ₹ {product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
