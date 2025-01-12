import { IOrder } from "../interfaces/orders";

interface IClientOrderDetails {
  order: IOrder;
}
function ClientOrderDetails({ order }: IClientOrderDetails) {
  return (
    <div className="text-xs lg:text-lg w-full lg:w-[80%] m-auto">
      <p className="text-center mt-6 py-2 text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
        Client's details
      </p>
      <div className="flex flex-row justify-between mt-5">
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Client's name: </span>
            <span>{order?.orderDetails[0].fullName}</span>
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            <span>{order?.orderDetails[0].email}</span>
          </p>
          <p>
            <span className="font-semibold">Phone number: </span>
            <span>{order?.orderDetails[0].phone}</span>
          </p>
        </div>
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Physical address: </span>
            <span>{order?.orderDetails[0].physicalAddress}</span>
          </p>
          <p>
            <span className="font-semibold">Postal code: </span>
            <span>{order?.orderDetails[0].postalCode}</span>
          </p>
          <p>
            <span className="font-semibold">Way of payment: </span>
            {/*ONLY POSSIBLE OPTION CURRENTLY */}
            <span>In chash, on delivery</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientOrderDetails;
