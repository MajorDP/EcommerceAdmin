import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders";
import Statistics from "./pages/Statistics";
import Activity from "./pages/Activity";
import LowStock from "./pages/LowStock";
import LowStockProduct from "./pages/LowStockProduct";
import OrdersList from "./pages/OrdersList";
import Order from "./pages/Order";
import EditOrderStatus from "./pages/EditOrderStatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/lowstocks">
            <Route index element={<LowStock />} />
            <Route path=":id" element={<LowStockProduct />} />
          </Route>

          <Route path="/orders">
            <Route index element={<Orders />} />
            <Route path=":id" element={<Order />} />
            <Route path="edit/:id" element={<EditOrderStatus />} />
          </Route>
          <Route
            path="/unconfirmed"
            element={<OrdersList status="Unconfirmed" />}
          />
          <Route path="shipping" element={<OrdersList status="Shipping" />} />
          <Route
            path="/delivered"
            element={<OrdersList status="Delivered" />}
          />
          <Route path="/rejected" element={<OrdersList status="Rejected" />} />

          <Route path="/statistics" element={<Statistics />} />
          <Route path="/activity" element={<Activity />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
