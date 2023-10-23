import { Route, Routes } from "react-router";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import InventoryManagement from "./Pages/Inventory";
import Sales from "./Pages/Sales";
import Reports from "./Pages/Reports";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/inventory-management" element={<InventoryManagement/>}/>
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/reports" element={<Reports/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
