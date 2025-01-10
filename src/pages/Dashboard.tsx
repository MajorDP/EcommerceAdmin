import LowStockAlerts from "../components/dashboard/LowStockAlerts";
import OrdersRevenue from "../components/dashboard/OrdersRevenue";
import OrdersSummary from "../components/dashboard/OrdersSummary";

function Dashboard() {
  return (
    <div className="bg-slate-900 w-full text-white overflow-y-hidden">
      <div className=" w-2/3 h-screen m-auto flex flex-col lg:flex-row items-center justify-center">
        <div className="w-1/3 p-6 rounded-xl">
          <OrdersSummary />
        </div>
        <div className="w-1/3 p-6 rounded-xl">
          <OrdersRevenue />
        </div>
        <div className="w-1/3 p-6 rounded-xl">
          <LowStockAlerts />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
