import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import Message from "../../components/Message";
import SkeletonID from "../../components/SkeletonID";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../app/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const navigate = useNavigate();
  // console.log(order);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // PayPal script state from the provider
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Query for PayPal client ID
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    // When the PayPal client ID is available and no error, configure the PayPal script options.
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      // Only load the PayPal script if the order exists and is not paid.
      if (order && !order.isPaid) {
        // If the PayPal object is not present on window (script not loaded) and the script is not loading, then load it.
        if (!window.paypal && !loadingPayPal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, paypal, order, paypalDispatch]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        if (!orderId) {
          throw new Error("Order ID is not defined");
        }
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid successfully", {
          theme: "dark",
        });
      } catch (error) {
        const errorMessage =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          "An error occurred";
        console.error("Payment Approval Error: ", errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onError = (err) => {
    console.error("PayPal Error: ", err);
    toast.error(err?.message || "An error occurred during payment");
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <SkeletonID />
  ) : error ? (
    <Message variant="danger">
      {error?.data?.message || error?.data?.error || "An error occurred"}
    </Message>
  ) : order ? (
    <div className="container flex flex-col ml-[10rem] md:flex-row">
      <div className="md:w-2/3 pr-4">
        <div className="border border-gray-300 mt-5 pb-4 mb-5 p-4 rounded-lg">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, i) => (
                    <tr key={i}>
                      <td className="p-2">
                        <img
                          onClick={() => navigate(`/product/${item._id}`)}
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover cursor-pointer"
                        />
                      </td>
                      <td className="p-2 underline">
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </td>
                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">${item.price}</td>
                      <td className="p-2 text-center">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="md:w-1/3">
        <div className="mt-5 border border-gray-300 rounded-lg p-6 shadow-lg bg-white">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Shipping
          </h2>
          <div className="mb-4">
            <p className="text-lg mb-2">
              <strong className="text-pink-500">Order: </strong>
              <span className="text-gray-700">{order._id}</span>
            </p>
            <p className="text-lg mb-2">
              <strong className="text-pink-500">Name: </strong>
              <span className="text-gray-700">{order.user.username}</span>
            </p>
            <p className="text-lg mb-2">
              <strong className="text-pink-500">Email: </strong>
              <span className="text-gray-700">{order.user.email}</span>
            </p>
            <p className="text-lg mb-2">
              <strong className="text-pink-500">Address: </strong>
              <span className="text-gray-700">
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </span>
            </p>
            <p className="text-lg mb-2">
              <strong className="text-pink-500">Payment Method: </strong>
              <span className="text-gray-700">{order.paymentMethod}</span>
            </p>
          </div>
          {order.isPaid ? (
            <Message variant="success" className="text-center py-2">
              Paid successfully on {moment(order.paidAt).format("M/D/YYYY")}
            </Message>
          ) : (
            <Message className="text-center py-2">Not Paid Yet</Message>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-4 mt-[3rem] text-gray-800">
          Order Summary
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <div className="flex justify-between mb-4 border-b pb-2">
            <span className="text-lg font-medium text-gray-700">
              Items Price
            </span>
            <span className="text-lg font-semibold text-gray-900">
              ${order.itemsPrice}
            </span>
          </div>
          <div className="flex justify-between mb-4 border-b pb-2">
            <span className="text-lg font-medium text-gray-700">Shipping</span>
            <span className="text-lg font-semibold text-gray-900">
              ${order.shippingPrice}
            </span>
          </div>
          <div className="flex justify-between mb-4 border-b pb-2">
            <span className="text-lg font-medium text-gray-700">Tax</span>
            <span className="text-lg font-semibold text-gray-900">
              ${order.taxPrice}
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-lg font-medium text-gray-700">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ${order.totalPrice}
            </span>
          </div>
        </div>
        {/* Render PayPal button only if order is not paid */}
        {!order.isPaid && (
          <div className="mt-6">
            {loadingPay || isPending ? (
              <SkeletonID />
            ) : (
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            )}
          </div>
        )}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered ? (
          <div>
            <button
              onClick={deliverHandler}
              type="button"
              className="bg-pink-500 text-white cursor-pointer w-full py-2"
            >
              Mark As Delivered
            </button>
          </div>
        ) : order.isDelivered ? (
          <div className="bg-green-600 text-white flex justify-center w-full py-2">
            Delivered!
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <Message>Loading order details...</Message>
  );
};

export default Order;
