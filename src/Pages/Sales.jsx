import React, { useEffect, useState } from "react";
import SalesForm from "../Components/SalesForm/SalesForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/Actions/Item";
import { fetchSales } from "../Redux/Actions/Sales";

const Sales = () => {
  const dispatch = useDispatch();

  const { salesData } = useSelector((state) => state?.sales);

  const totalRevenue = salesData?.reduce(
    (total, curr) => total + curr?.price * curr?.quantity,
    0
  );

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const [sortOrder, setSortOrder] = useState("latest");

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedData = [...salesData]?.sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOrder === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div>
   
      <h2>Total Revenue: {totalRevenue}</h2>
      {isOpen && <SalesForm isOpen={isOpen} onClose={onClose} />}

      <div className="sort-container">
        <label>
          <input
            type="radio"
            value="latest"
            checked={sortOrder === "latest"}
            onChange={handleSortChange}
          />
          Sort by Latest Sales
        </label>
      </div>
      <div className="sort-container">
        <label>
          <input
            type="radio"
            value="oldest"
            checked={sortOrder === "oldest"}
            onChange={handleSortChange}
          />
          Sort by Oldest Sales
        </label>
      </div>
      <button onClick={() => setIsOpen(!isOpen)}>Add a Sale</button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.length > 0 ? (
              sortedData?.map((item) => (
                <tr key={item?._id}>
                  <td>{item?.item}</td>
                  <td>{item?.price}</td>
                  <td>x{item?.quantity}</td>
                  <td>{item?.quantity * item?.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
