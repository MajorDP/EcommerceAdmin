import { useEffect, useState } from "react";
import { getOrderById, getProductOwner } from "../api/services";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom";
import { IProductOwner } from "../interfaces/users";
import { calculateOrderTotalPrice, formatDate } from "../lib/helpers";
import { IOrder } from "../interfaces/orders";
import OrderImgDisplayFull from "../components/OrderImgDisplayFull";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";
function Order() {
  const { id } = useParams();

  const [order, setOrder] = useState<IOrder | null>(null);
  const [productOwner, setProductOwner] = useState<IProductOwner | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  console.log(order?.mapLocation[0]);
  useEffect(() => {
    async function getOrder() {
      const order: IOrder = await getOrderById(id);
      if (order.orderedBy !== null) {
        const owner = await getProductOwner(order.orderedBy);
        setProductOwner(owner as IProductOwner);
      }
      setOrder(order as IOrder);
      setIsLoading(false);
    }
    getOrder();
  }, [id]);

  const bounds = [
    [41.235, 22.357], // Southwest corner
    [44.216, 28.295], // Northeast corner
  ];
  const defaultCenter = [51.505, -0.09];

  const mapCenter = order?.mapLocation?.[0]
    ? [
        parseFloat(order.mapLocation[0].lat),
        parseFloat(order.mapLocation[0].lng),
      ]
    : [51.505, -0.09]; // Default center if mapLocation is unavailable

  if (isLoading) return <Spinner />;
  return (
    <div className="bg-slate-900 w-full h-screen text-white flex items-center justify-center">
      <div className="bg-slate-700 w-[80%] h-[80%] rounded-lg p-4 overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {/* Order Details */}
            <p className="text-center font-semibold text-4xl p-1 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Order: #{order?.id}
            </p>
            <div className="w-full flex flex-col lg:flex-row mt-5 text-lg">
              {/* Image Section */}
              <div className="w-[50%] min-h-[10rem] max-h-[20rem] rounded-lg">
                <OrderImgDisplayFull order={order} />
              </div>
              {/* Order Info Section */}
              <div className="flex flex-col w-[60%] px-6 justify-between">
                <div>
                  <div className="flex flex-row justify-between">
                    <p className="mt-4">
                      <span className="font-semibold">ID:</span> {order?.id}
                    </p>
                    <p className="mt-4">
                      <span className="font-semibold">
                        Posted on/Last edited on:
                      </span>{" "}
                      {formatDate(order?.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between mt-4">
                    {productOwner !== null ? (
                      <>
                        <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                          <span className="font-semibold">Posted by: </span>
                          {productOwner.username}
                        </p>
                        <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                          <span className="font-semibold">Email: </span>
                          {productOwner.email}
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap font-semibold">
                          Posted by: Ecomms
                        </span>
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap font-semibold">
                          Email: Ecomms@gmail.com
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row justify-between w-full mt-4">
                    <p>
                      <span className="font-semibold">Products count:</span>{" "}
                      {order?.items.length}
                    </p>
                    <p>
                      <span className="font-semibold">Total:</span>{" "}
                      {calculateOrderTotalPrice(order?.items).toFixed(2)} $
                    </p>
                  </div>
                  <div className="flex flex-row justify-between w-full mt-4">
                    <p>
                      <span className="font-semibold">Order status:</span>{" "}
                      {order?.status}
                    </p>
                    <p className="hover:scale-105 duration-300">
                      <Link
                        to={`/orders/edit/${id}`}
                        className="bg-green-500 px-4 py-1 shadow-lg rounded-lg text-sm"
                      >
                        Change order status
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <p className="text-center mt-6 py-2 text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
          Location on map:
        </p>
        <div className="mt-5 w-full h-full m-auto rounded-lg overflow-hidden border border-black">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            maxBounds={bounds}
            minZoom={8}
            maxBoundsViscosity={1.0}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={mapCenter} draggable={true}>
              <Popup>You are here</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Order;
