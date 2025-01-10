import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders";
import Statistics from "./pages/Statistics";
import Activity from "./pages/Activity";
import LowStock from "./pages/LowStock";
import LowStockProduct from "./pages/LowStockProduct";
import DeliveredOrders from "./pages/DeliveredOrders";
import RejectedOrders from "./pages/RejectedOrders";
import ShippingOrders from "./pages/ShippingOrders";
import UnconfirmedOrders from "./pages/UnconfirmedOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lowstocks" element={<LowStock />} />
          <Route path="/lowstocks/:id" element={<LowStockProduct />} />
          <Route path="/unconfirmed" element={<UnconfirmedOrders />} />
          <Route path="/shipping" element={<ShippingOrders />} />
          <Route path="/delivered" element={<DeliveredOrders />} />
          <Route path="/rejected" element={<RejectedOrders />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/activity" element={<Activity />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
