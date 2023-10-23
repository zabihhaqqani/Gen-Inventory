import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSale } from "../../Redux/Actions/Sales";

const SalesForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [saleDetails, setSaleDetails] = useState({
    item: "",
    quantity: 1,
    price: 10,
  });

  const { itemsData } = useSelector((state) => state.items);

  const items = itemsData?.map((item) => item.name);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setSaleDetails((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addSale(saleDetails));
    setSaleDetails({ item: "", quantity: 1, price: 10 });
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <form onSubmit={submitHandler}>
          <div className="close-container">
            <span className="close" onClick={onClose}>
              &times;
            </span>
          </div>
          <label htmlFor="item">Item:</label>
          <select
            onChange={inputHandler}
            value={saleDetails.item}
            name="item"
            id="item"
            required
          >
            <option value="" disabled>
              Select an Item
            </option>
            {items?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="quantity">Quantity:</label>
          <input
            onChange={inputHandler}
            type="number"
            name="quantity"
            id="quantity"
            min="1"
            value={saleDetails.quantity}
            placeholder="Enter a Quantity"
            required
          />

          <label htmlFor="price">Price:</label>
          <input
            onChange={inputHandler}
            type="number"
            name="price"
            id="price"
            min="10"
            value={saleDetails.price}
            placeholder="Enter a Price"
            required
          />

          <button type="submit">Add a Sale!</button>
        </form>
      </div>
    </div>
  );
};

export default SalesForm;
