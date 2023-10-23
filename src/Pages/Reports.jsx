import React, { useEffect } from "react";
import { fetchItems } from "../Redux/Actions/Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../Redux/Actions/Sales";
import "./Reports.css"; // Import the CSS file

const Reports = () => {
  const categories = [
    "Electronics",
    "Books",
    "Fitness",
    "Fashion",
    "Kitchenware",
  ];

  const dispatch = useDispatch();

  const { itemsData } = useSelector((state) => state.items);
  const { salesData } = useSelector((state) => state.sales);

  const totalRevenue = salesData?.reduce(
    (total, curr) => total + curr?.price * curr?.quantity,
    0
  );

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className="reports-container">
      <div className="report">
        <h1 className="report-title">Inventory Report</h1>
        <h3>Items present: {itemsData?.length}</h3>
        <h4>Categories present:</h4>
        <ul>
          {categories.map((category, index) => (
            <li style={{ display: "inline" }} key={index}>
              {category}, </li>
          ))}
        </ul>
        <h4>Items present in the Inventory:</h4>
        <ul>
          {itemsData?.map((item, index) => (
            <li key={index}>
              {item?.name} 
            </li>
          ))}
        </ul>
      </div>

      <div className="report">
        <h1 className="report-title">Sales Report</h1>
        <h3>Total Sales so far: {salesData?.length}</h3>
        <h4>Total Revenue so far: {totalRevenue}</h4>
        <h4>Sold Items:</h4>
        <ul>
          {salesData?.map((item, index) => (
            <li key={index}>
              {item?.item} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
