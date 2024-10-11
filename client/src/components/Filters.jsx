import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { getProducts } from "../apicalls/products";

const Filters = ({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  getData,
}) => {
  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="w-80 border-2 border-solid mt-2 ml-1">
      <div className="flex justify-between mt-1 p-2">
        <h1 className="text-red-500 text-2xl">Filters</h1>
        <MdCancel
          style={{ color: "red" }}
          className="mt-1 cursor-pointer"
          size={20}
          onClick={() => setShowFilters(!showFilters)}
        />
      </div>
      <div className="w-full h-[1px] bg-slate-800 mb-2"></div>

      <div className="flex flex-col gap-1 mt-2 p-2">
        <h1 className="text-xl">Categories</h1>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="mt-3">Electronics</span>
            <input
              type="checkbox"
              value="electronic"
              checked={filters.category === "electronic"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({ ...filters, category: "electronic" });
                } else {
                  setFilters({ ...filters, category: "" });
                }
              }}
            />
          </div>
          <div className="flex justify-between">
            <span className="mt-3">Home</span>
            <input
              type="checkbox"
              value="home"
              checked={filters.category === "home"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({ ...filters, category: "home" });
                } else {
                  setFilters({ ...filters, category: "" });
                }
              }}
            />
          </div>
          <div className="flex justify-between">
            <span className="mt-3">Sports</span>
            <input
              type="checkbox"
              value="sports"
              checked={filters.category === "sports"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({ ...filters, category: "sports" });
                } else {
                  setFilters({ ...filters, category: "" });
                }
              }}
            />
          </div>
          <div className="flex justify-between">
            <span className="mt-3">Fashion</span>
            <input
              type="checkbox"
              value="fashion"
              checked={filters.category === "fashion"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({ ...filters, category: "fashion" });
                } else {
                  setFilters({ ...filters, category: "" });
                }
              }}
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-800 mb-2"></div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">Age</h1>
          <div className="flex justify-between">
            <span className="mt-3">1-2</span>
            <input
              type="checkbox"
              value="1-2"
              checked={filters.age === "0-2"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({ ...filters, age: "0-2" });
                } else {
                  setFilters({ ...filters, age: "" });
                }
              }}
            />
          </div>
          <div className="flex justify-between">
            <span className="mt-3">3-5</span>
            <input
              type="checkbox"
              value="3-5"
              checked={filters.age === "3-5"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({ ...filters, age: "3-5" });
                } else {
                  setFilters({ ...filters, age: "" });
                }
              }}
            />
          </div>
          <div className="flex justify-between">
            <span className="mt-3">6-9</span>
            <input
              type="checkbox"
              value="6-9"
              checked={filters.age === "6-9"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({ ...filters, age: "6-9" });
                } else {
                  setFilters({ ...filters, age: "" });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
