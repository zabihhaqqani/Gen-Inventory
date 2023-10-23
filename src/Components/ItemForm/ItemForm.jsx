import React, { useState } from "react";
import "./ItemForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from "../../Redux/Actions/Item";

const ItemForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { action, itemToBeUpdated } = isOpen;

  const [itemDetails, setItemDetails] = useState({
    name: itemToBeUpdated?.name || "",
    quantity: itemToBeUpdated?.quantity || "",
    price: itemToBeUpdated?.price || "",
    category: itemToBeUpdated?.category || "",
  });
  const categories = ["Electronics", "Books", "Fitness", "Fashion", "Kitchenware"]
  
  const inputHandler = (e) => {
    setItemDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (action === "Add") {
      dispatch(addItem(itemDetails));
    } else if (action === "Update") {
      dispatch(updateItem(itemToBeUpdated?._id, itemDetails));
    }
    onClose();
    setItemDetails({ name: "", quantity: "", price: "" , category:""});
  };

  return (
    <div className={`modal ${action ? "open" : ""}`}>
      <div className="modal-content">
        <form onSubmit={submitHandler}>
          <div className="close-container">
            <span className="close" onClick={onClose}>
              &times;
            </span>
          
          </div>

          <label htmlFor="itemName">Name: </label>
          <input
            type="text"
            placeholder="Enter Item Name"
            id="name"
            name="name"
            onChange={inputHandler}
            required
            value={itemDetails?.name}
          />

          <label htmlFor="category">Category:</label>
          <select
            onChange={inputHandler}
            value={itemDetails?.category}
            name="category"
            id="category"
            required
          >
            <option value="" disabled>
              Select an Item
            </option>
            {categories?.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            placeholder="Enter Quantity "
            id="quantity"
            name="quantity"
            onChange={inputHandler}
            required
            value={itemDetails?.quantity}
          />

          <label htmlFor="price">Price: </label>
          <input
            type="number"
            placeholder="Enter Price"
            id="price"
            name="price"
            onChange={inputHandler}
            required
            value={itemDetails?.price}
          />

          <button className="btn" type="submit">
            {action} Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
