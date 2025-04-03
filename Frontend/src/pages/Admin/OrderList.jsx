import { useGetAllOrdersQuery } from "../../app/api/orderApiSlice";
import SkeletonID from "../../components/SkeletonID";
import Message from "../../components/Message";
import { Link } from "react-router-dom";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  if (isLoading) {
    return (
      <>
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
      </>
    );
  }
  if (error) {
    return <Message variant="danger">Something went wrong!</Message>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col"
          >
            <h3 className="text-lg font-bold mb-3 truncate">
              Order: {order._id}
            </h3>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {/* Product Details */}
            <div className="border-t border-gray-300 pt-3 mt-3">
              <h4 className="text-md font-semibold mb-2">Products:</h4>
              <div className="flex flex-col space-y-3">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.qty}
                      </p>
                      <p className="text-sm text-gray-600">
                        Product ID: {item.product}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-700 mt-4">
              <strong>Items Price:</strong> ${order.itemsPrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Shipping Price:</strong> ${order.shippingPrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Tax Price:</strong> ${order.taxPrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
            </p>
            <p className="text-sm">
              <strong>Payment:</strong>{" "}
              <span className="text-gray-700">{order.paymentMethod}</span>
            </p>
            <p className="text-sm">
              <strong>Paid:</strong>{" "}
              {order.isPaid ? (
                <span className="text-green-600 font-medium">Yes</span>
              ) : (
                <span className="text-red-600 font-medium">No</span>
              )}
            </p>
            <p className="text-sm">
              <strong>Delivered:</strong>{" "}
              {order.isDelivered ? (
                <span className="text-green-600 font-medium">Yes</span>
              ) : (
                <span className="text-red-600 font-medium">No</span>
              )}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Shipping Address:</strong>{" "}
              {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
            </p>

            <Link
              to={`/order/${order._id}`}
              className="mt-4 inline-block bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
