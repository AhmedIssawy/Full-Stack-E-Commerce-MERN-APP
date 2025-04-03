import Message from "../../components/Message";
import SkeletonID from "../../components/SkeletonID";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../app/api/orderApiSlice";

const UserOrders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

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
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Image
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                Paid
              </th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                Delivered
              </th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders?.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <img
                    src={order.orderItems[0]?.image || "/placeholder.jpg"}
                    alt={`Order by ${order.user?.username || "Unknown"}`}
                    className="w-24 h-24 object-cover mx-auto rounded"
                  />
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{order._id}</td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700 text-right">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="py-4 px-4 text-sm text-center">
                  {order.isPaid ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-600 font-medium">No</span>
                  )}
                </td>
                <td className="py-4 px-4 text-sm text-center">
                  {order.isDelivered ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-600 font-medium">No</span>
                  )}
                </td>
                <td className="py-4 px-4 text-sm text-center">
                  <Link
                    to={`/order/${order._id}`}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
