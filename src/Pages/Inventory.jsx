import React, { useEffect, useState } from "react";
import ItemForm from "../Components/ItemForm/ItemForm";
import { deleteItem, fetchItems } from "../Redux/Actions/Item";
import { useDispatch, useSelector } from "react-redux";
import "./Inventory.css"

const categories = [
  "All",
  "Electronics",
  "Books",
  "Fitness",
  "Fashion",
  "Kitchenware",
];

const Inventory = () => {
  const [category, setCategory] = useState("All");

  const filterCategory = (e) => {
    setCategory(e.target.value);
  };

  const { itemsData } = useSelector((state) => state.items);

  const filteredData = [...itemsData]?.filter((item) =>
    category === "All" ? item : item.category === category
  );

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div>
      <button onClick={() => setIsOpen({ action: "Add" })}>Add Item</button>
      <div>
        {" "}
        <label htmlFor="filter">Filter Based on Category: </label>
        <select
          onChange={filterCategory}
          value={category}
          name="filter"
          id="filter"
          required
        >
          <option value="" disabled>
            Select an Item
          </option>
          {categories?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {isOpen && <ItemForm isOpen={isOpen} onClose={onClose} />}
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Delete/Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0 ? (
            filteredData?.map((item) => (
              <tr key={item?._id}>
                <td>{item?.name}</td>
                <td>{item?.category}</td>
                <td>{item?.quantity}</td>
                <td>{item?.price}</td>
                <td>
                  {" "}
                  <button onClick={() => dispatch(deleteItem(item?._id))}>
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      setIsOpen({ action: "Update", itemToBeUpdated: item })
                    }
                  >
                    Update
                  </button>
                </td>
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

export default Inventory;
